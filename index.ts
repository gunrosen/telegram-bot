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
bot.command('numMembers', async (ctx) => {
    const numMembers = await ctx.getChatMembersCount()
    console.log(`numMembers: ${numMembers}`)
    await ctx.reply(numMembers.toString())
})
bot.command('admin', async (ctx) => {
    const arrAdmin = await ctx.getChatAdministrators()
    const str = arrAdmin.map((m) => m.user.id).join(',')
    await ctx.reply(str)
})
bot.command('isExist', async (ctx) => {
    const text = ctx.update?.message?.text || ''
    const [,memberId,] = text.split(' ')
    try{
        const member = await ctx.getChatMember(parseInt(memberId))
        await ctx.reply('Yes')
    }catch (e) {
        await ctx.reply('No')
    }
})
bot.launch()

