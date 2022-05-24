# telegram-bot
Simple telegram bot

## add bot to channel

+ Only the creator of the channel can add a bot.
+ Other administrators can't add bots to channels.
+ Channel can be public or private (doesn't matter)
+ bots can be added only as admins, not members.*

Go to channel, click to channel name then add bot as admins 

Get updates
``
https://api.telegram.org/bot<token>/getUpdates
``

# Twitter bot
Twitter API endpoint has a rate limit of 900 requests/15-minutes

View rate limit at [Twitter API](https://developer.twitter.com/en/docs/twitter-api/rate-limits)

max_results is from 1 to 100

How to generate a Bearer Token

|   API key 	|     e.g.xvz1evFS4wEEPTGEFPHBog	|
|---	|---	| 
|   API secret key	|   e.g.xvz1evFS4wEEPTGEFPHBog	|


``
curl -u "$API_KEY:$API_SECRET_KEY" \
--data 'grant_type=client_credentials' \
'https://api.twitter.com/oauth2/token'
``


# Discord bot
Add Bot to server

`
https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=<>
`

Get guild members see [link](https://discord.com/developers/docs/resources/guild#get-guild-member)

Check rate limit at [link](https://discord.com/developers/docs/resources/guild#get-guild-member)



