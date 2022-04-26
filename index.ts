import {Telegraf, Telegram} from "telegraf";
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN || '')
bot.use(async (ctx, next) => {
    console.time(`Processing update ${ctx.update.update_id}`)
    await next()
    console.timeEnd(`Processing update ${ctx.update.update_id}`)
})
bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
    console.log("Initialized", botInfo.username);
});


bot.start((ctx) => ctx.reply('Welcome'))
bot.launch()

