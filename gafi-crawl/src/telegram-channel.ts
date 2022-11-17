import {channel} from "diagnostics_channel";

require('dotenv').config()
import {Api, TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions";
import {TelegramInput, CrawlSource} from "./telegram-input";

const input = require("input"); // npm i input
import User = Api.User;
import ChannelFull = Api.ChannelFull;
import Channel = Api.Channel;
import {utcEpochToDateString} from "./util";

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0");
const apiHash = process.env.TELEGRAM_API_HASH || "";
const session = process.env.TELEGRAM_SESSION || "";
const stringSession = new StringSession(session);


const runCrawlTelegram = async () => {

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.connect()
  const me = await client.getMe()
  if (me instanceof User) {
    console.log(`You logged in as : ${me.username}`)
  }
  const channels = CrawlSource.filter((item) => item.type === 'channel')
  for (const source of channels) {
    console.log('-------------------------------')
    const channelInfo = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: source.link,
      })
    );

    console.log(`${source.type} ${source.name}`);
    const fullChat = channelInfo.fullChat
    const chats = channelInfo.chats
    if (fullChat instanceof ChannelFull) {
      console.log(`ParticipantsCount: ${fullChat.participantsCount}`);
    }
    const channel = chats[0]
    if (channel instanceof Channel){
      console.log(`CreatedDate: ${utcEpochToDateString(channel.date)}`);
    }


  }
}

runCrawlTelegram()

