import axios from "axios";
require('dotenv').config()

const TWITTER = 'https://twitter.com/the_epic_war'
const TWITTER_SAMPLE_TWEET = 'https://twitter.com/the_epic_war/status/1521903120946589696'
const TWITTER_SAMPLE_TWEET_2 ='https://twitter.com/GameFi_Official/status/1509897946770583552'


const TWITTER_SAMPLE_TWEET_ID = '1521903120946589696'
const TWITTER_SAMPLE_TWEET2_ID = '1509897946770583552'
const TWITTER_ACCOUNT_EPIC = '1468792474210484225'
const TWITTER_ACCOUNT_GAFI = '1415522287126671363'

const MAX_RESULTS = 100

class CheckTwitter {

    async checkLikeTweet(pagination_token?: string){
        try {
            const params: any = {
                max_results: MAX_RESULTS
            }
            if (pagination_token) params['pagination_token'] = pagination_token
            const result = await axios.get(`https://api.twitter.com/2/tweets/${TWITTER_SAMPLE_TWEET_ID}/liking_users`,
                {
                    params:  params,
                    headers:{
                        'Authorization': `Bearer ${process.env.TWITTER_BEAT_TOKEN}`,
                        'Accept-Encoding':'gzip, deflate, br'
                    }
                },
            )
            console.log(`------checkLikeTweet------`)
            console.log(`${JSON.stringify(result.data.data[0])}`)
            console.log(`next_token=${result.data.meta.next_token}`)
        } catch (e) {
            console.log(e)
        }

    }

    async checkFollowTwitter(pagination_token?: string){
        try {
            const params: any = {
                max_results: MAX_RESULTS
            }
            if (pagination_token) params['pagination_token'] = pagination_token
            const result = await axios.get(`https://api.twitter.com/2/users/${TWITTER_ACCOUNT_EPIC}/followers`,
                {
                    params:  params,
                    headers:{
                        'Authorization': `Bearer ${process.env.TWITTER_BEAT_TOKEN}`,
                        'Accept-Encoding':'gzip, deflate, br'
                    }
                },
            )
            console.log(`------checkFollowTwitter------`)
            console.log(`${JSON.stringify(result.data.data[0])}`)
            console.log(`next_token=${result.data.meta.next_token}`)
        } catch (e) {
            console.log(e)
        }
    }

    async checkRetweetATweet(pagination_token?: string){
        try {
            const params: any = {
                max_results: MAX_RESULTS
            }
            if (pagination_token) params['pagination_token'] = pagination_token
            const result = await axios.get(`https://api.twitter.com/2/tweets/${TWITTER_SAMPLE_TWEET2_ID}/retweeted_by`,
                {
                    params:  params,
                    headers:{
                        'Authorization': `Bearer ${process.env.TWITTER_BEAT_TOKEN}`,
                        'Accept-Encoding':'gzip, deflate, br'
                    }
                },
            )
            console.log(`------checkRetweetATweet------`)
            console.log(`${JSON.stringify(result.data.data[0])}`)
            console.log(`next_token=${result.data.meta.next_token}`)
        } catch (e) {
            console.log(e)
        }
    }

}
const runBotTwitter = async () => {
    let check = new CheckTwitter();
    await check.checkLikeTweet()
    await check.checkRetweetATweet()
    await check.checkFollowTwitter()
}

runBotTwitter()