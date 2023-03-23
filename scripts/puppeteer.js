import puppeteer from 'puppeteer';

export async function launchBrowser() {
    return puppeteer.launch({ headless: false })
}

export async function visitPage(browser, url, onSuccess = () => {}) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1240, height: 1080 });
    await page.setDefaultTimeout(3000)
    await page.goto(url);

    const linkSelector = '.termin-buchen';
    const availableDateSelector = '.buchbar';

    await page.waitForSelector(linkSelector) ;
    await page.click(linkSelector);

    try {
        await page.waitForSelector(availableDateSelector);
        onSuccess(`🎉 Appointments available!`, page.url())
        await page.close()
    } catch (e) {
        console.error('No appointments available 😢', e)
        await page.close()
    }
}
