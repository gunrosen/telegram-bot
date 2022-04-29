require('dotenv').config()

const func = async () => {
    const TelegramBot = require('node-telegram-bot-api');
    const token = process.env.BOT_TOKEN || '';
    const bot = new TelegramBot(token, {polling: true});
    const chat = await bot.getChatMember(-1001510597701, 956604381 )
    const channel = await bot.getChatMember(-1001690822331, 956604381)
    console.log(`group: ${JSON.stringify(chat)}`);
    console.log(`channel: ${JSON.stringify(channel)}`);
    /**
     * group: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}
     channel: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"left"}
     *
     *
     * group: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}
     channel: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}

     */
}

func()


