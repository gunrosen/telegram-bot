import {Telegraf, Telegram} from "telegraf";
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN || '')
const commandDoc = [
    {
        command: '/help',
        description: 'Lista de comandos disponibles (esta lista)',
        shortDescription: 'Lista de comandos'
    },
    {
        command: '/echo',
        description: 'Recibe un texto y lo repite',
        shortDescription: 'Repite un mensaje'
    }
];

const helpText = commandDoc
    .map(c => `${c.command} ${c.description}`)
    .join('\n');

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
    console.log("Initialized", botInfo.username);
});


bot.start((ctx) => ctx.reply('Welcome'))
bot.command('/help', (ctx) => ctx.reply(helpText));
bot.command('group', async (ctx) => {
    const chat = await ctx.getChat()
    console.log(`numMembers: ${JSON.stringify(chat)}`)
    await ctx.reply(JSON.stringify(chat))
})
bot.command('group', async (ctx) => {
    const chat = await ctx.getChat()
    console.log(`numMembers: ${JSON.stringify(chat)}`)
    await ctx.reply(JSON.stringify(chat))
})
bot.command('num', async (ctx) => {
    const numMembers = await ctx.getChatMembersCount()
    console.log(`numMembers: ${numMembers}`)
    await ctx.reply(numMembers.toString())
})
bot.command('admin', async (ctx) => {
    const arrAdmin = await ctx.getChatAdministrators()
    const str = arrAdmin.map((m) => m.user.id).join(',')
    await ctx.reply(str)
})
bot.command('exist', async (ctx) => {
    const text = ctx.update?.message?.text || ''
    const [,memberId,] = text.split(' ')
    try{
        const member = await ctx.getChatMember(parseInt(memberId))
        await ctx.reply('Yes')
    }catch (e) {
        await ctx.reply('No')
    }
})
// bot.startPolling(5000, 100,)
bot.launch()

