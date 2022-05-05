require('dotenv').config()

const KHOA = 956604381
const HUNG = 2033157833
const META = 2143893233

const TEST_GROUP = -1001510597701
const EPIC_VN = -1001432620977
const TEST_CHANNEL = -1001690822331


const checkMember = async (bot: any, chatId: number, userId: number): Promise<boolean> => {
    try {
        const member = await bot.getChatMember(chatId, userId)
        return member?.status === 'member'
    } catch (error: any) {
        console.error(error?.message)
        return false
    }
}

const checkJoinGroupChanel = async (
    chatId: number,
    userId: number | number[]
): Promise<boolean | boolean[]> =>
{
    const TelegramBot = require('node-telegram-bot-api')
    const token = process.env.TELEGRAM_BOT_TOKEN || ''
    const bot = new TelegramBot(token, {polling: true})
    if (typeof userId === 'number') {
        return await checkMember(bot, chatId, userId)
    } else {
        let result: boolean[] = []
        for (let i = 0; i < userId.length; i++) {
            result.push(await checkMember(bot, chatId, userId[i]))
        }
        return result
    }
}



const func = async () => {
    console.log(`group: ${JSON.stringify(await checkJoinGroupChanel(TEST_GROUP, HUNG))}`);


    console.log(`channel: ${JSON.stringify(await checkJoinGroupChanel(TEST_CHANNEL, HUNG))}`);


    console.log(await checkJoinGroupChanel(TEST_GROUP, [KHOA, HUNG, META]))
    /**
     * group: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}
     channel: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"left"}
     *
     *
     * group: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}
     channel: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}

     */
    const TelegramBot = require('node-telegram-bot-api')
    const token = process.env.TELEGRAM_BOT_TOKEN || ''
    const bot = new TelegramBot(token, {polling: true})
    bot.on('message', (msg: any) => {
        const chatId = msg?.chat?.id;
        console.log(`${msg?.from.first_name} ${msg?.from.last_name} group/channel:${msg?.chat?.title} chatId:${chatId} text:${msg?.text}`)
    });
}


func()


