# Termin monitoring bot 

1. Create your bot with [@BotFather](https://t.me/BotFather)
2. Add commands `/start` and `/stop` to your bot
3. Update `.env` variables:
   - `TELEGRAM_BOT_TOKEN` - provided by `@BotFather` when the bot is created
   - `MONITORING_URL` - the URL of the service you need termin for. Tested on [this](https://service.berlin.de/dienstleistung/120691/en/) one.
   - `HOURS` - the time of the day when script should be monitoring: `[start, end]`. Default is `[6, 19]`. Change to `[]` for 24hr monitoring. 

4. Install deps
```bash
> yarn 
```

5. Start the script
```bash
> yarn start 
```

6. Send `/start` to the chat with your bot to start monitoring.
7. Send `/stop` to the chat with your bot to stop monitoring.

The script will run with a random interval in range of 2 to 7 minutes. As soon as the available date will appear in the calendar, the bot will notify you.
