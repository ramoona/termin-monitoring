import './scripts/env.js'
import { visitPage, launchBrowser } from "./scripts/puppeteer.js";
import { Bot } from "./scripts/bot.js";

const MINUTE = 60 * 1000;
let timeout = null
const [START_HOUR = -Infinity, END_HOUR = Infinity] = JSON.parse(process.env.HOURS)

async function runMonitoring(browser, sendNotification) {
    const hours = new Date().getHours()

    console.log('Monitoring...')

    if(hours > START_HOUR && hours < END_HOUR) {
        try {
            await visitPage(browser, process.env.MONITORING_URL, sendNotification)
        } catch (e) {
            console.error(e)
            sendNotification('Oops! Error happened while monitoring')
        }
        timeout = setTimeout(runMonitoring, (2 + Math.random() * 5) * MINUTE)
    } else {
        console.log('Outside of working hours, trying again in 15 mins')
        timeout = setTimeout(runMonitoring, 15 * MINUTE)
    }
}

Bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const browser = await launchBrowser();

    await Bot.sendMessage(chatId, 'Monitoring started 👀');

    Bot.onText(/\/stop/, async () => {
        clearTimeout(timeout)
        await Bot.sendMessage(chatId, 'Monitoring stopped');
    })


    await runMonitoring(browser, text => Bot.sendMessage(chatId, text))
});
