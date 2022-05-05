require('dotenv').config()

const KHOA = 956604381
const HUNG = 2033157833
const META = 2143893233

const TEST_GROUP = -1001510597701
const EPIC_VN = -1001432620977
const TEST_CHANNEL = -1001690822331

class CheckService {
    public static bot: any

    constructor() {
        if (CheckService.bot) {
            console.log('Instance created')
        } else {
            console.log('Instance creating')
            const TelegramBot = require('node-telegram-bot-api')
            const token = process.env.TELEGRAM_BOT_TOKEN || ''
            CheckService.bot = new TelegramBot(token, {polling: true})
        }
    }
    public getBot() {
        return CheckService.bot;
    }

    public async checkMember(chatId: number, userId: number): Promise<boolean> {
        try {
            const member = await CheckService.bot!.getChatMember(chatId, userId)
            return member?.status === 'member' || member?.status === 'creator'
        } catch (error: any) {
            console.error(error?.message)
            return false
        }
    }
    public async checkJoinGroupChanel(
        chatId: number,
        userId: number | number[]
    ): Promise<boolean | boolean[]> {
        if (typeof userId === 'number') {
            return await this.checkMember(chatId, userId)
        } else {
            let result: boolean[] = []
            for (let i = 0; i < userId.length; i++) {
                result.push(await this.checkMember(chatId, userId[i]))
            }
            return result
        }
    }
}


const func = async () => {
    const checkService = new CheckService()
    console.log(`group: ${JSON.stringify(await checkService.checkJoinGroupChanel(TEST_GROUP, HUNG))}`);


    console.log(`channel: ${JSON.stringify(await checkService.checkJoinGroupChanel(TEST_CHANNEL, HUNG))}`);

    const checkService2 = new CheckService()
    console.log(await checkService2.checkJoinGroupChanel(TEST_GROUP, [KHOA, HUNG, META]))

    const checkService3 = new CheckService()
    console.log(await checkService2.checkJoinGroupChanel(TEST_CHANNEL, [KHOA, HUNG, META]))
    /**
     * group: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}
     channel: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"left"}
     *
     *
     * group: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}
     channel: {"user":{"id":956604381,"is_bot":false,"first_name":"Khoa","last_name":"Nguyen","username":"khoanguyenminh"},"status":"member"}

     */
    // checkService.bot!.on('message', (msg: any) => {
    //     const chatId = msg?.chat?.id;
    //     console.log(`${msg?.from.first_name} ${msg?.from.last_name} group/channel:${msg?.chat?.title} chatId:${chatId} text:${msg?.text}`)
    // });
}


func()


