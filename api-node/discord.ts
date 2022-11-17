import axios from "axios";

const discord = async (serverId: string) => {
    let result: any
    let highestUserId: string | undefined
    const keyHighestUserId: string = `discord:${serverId}:join:@after`
    try {
        const url = `https://discord.com/api/guilds/${serverId}/members?limit=1000${
            highestUserId ? `&after=${highestUserId}` : ''
        }`
        console.log(highestUserId)
        result = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${process.env.DISCORD_TOKEN}`,
            },
        })
        const resultLength = result.data?.length | 0
        if (resultLength > 0) {
            for (let i = 0; i < resultLength; i++) {
                const memberId: string = result.data[i].user?.id

            }
            highestUserId = result.data[resultLength - 1]?.user?.id
        }
    } catch (e) {
        console.error(e)
    }
}
discord('')