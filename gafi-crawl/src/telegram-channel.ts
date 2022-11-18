const fsPromises = require('fs/promises');
const fs = require('fs');
import {channel} from "diagnostics_channel";

require('dotenv').config()
import {Api, client, TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions";
import {TelegramType, CrawlSource, ChannelPost, Reaction} from "./telegram-type";

const input = require("input"); // npm i input
import User = Api.User;
import ChannelFull = Api.ChannelFull;
import Channel = Api.Channel;
import {ellipsis, utcEpochToDateString} from "./util";
import TypeMessage = Api.TypeMessage;
import Message = Api.Message;
import TypeMessages = Api.messages.TypeMessages;
import ChannelMessages = Api.messages.ChannelMessages;
import ReactionCount = Api.ReactionCount;
import ReactionEmoji = Api.ReactionEmoji;

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0");
const apiHash = process.env.TELEGRAM_API_HASH || "";
const session = process.env.TELEGRAM_SESSION || "";
const stringSession = new StringSession(session);


const runCrawlTelegram = async () => {
  const filePath = "crawl.txt"
  if (fs.existsSync(filePath)) {
    fs.rm(filePath)
  }
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.connect()
  const me = await client.getMe()
  if (me instanceof User) {
    console.log(`You logged in as : ${me.username}`)
    await fsPromises.appendFile(filePath, `You logged in as : ${me.username}\n`, 'utf-8')

  }
  const channels = CrawlSource.filter((item) => item.type === 'channel')
  for (const source of channels) {
    console.log('-------------------------------')
    await fsPromises.appendFile(filePath, `-------------------------------\n`, 'utf-8')
    const channelInfo = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: source.link,
      })
    );

    console.log(`${source.type} ${source.name}`);
    await fsPromises.appendFile(filePath, `${source.type} ${source.name}\n`, 'utf-8')

    const fullChat = channelInfo.fullChat
    const chats = channelInfo.chats
    if (fullChat instanceof ChannelFull) {
      console.log(`ParticipantsCount: ${fullChat.participantsCount}`);
      await fsPromises.appendFile(filePath, `ParticipantsCount: ${fullChat.participantsCount}\n`, 'utf-8')
    }
    const channel = chats[0]
    if (channel instanceof Channel) {
      console.log(`Created from: ${utcEpochToDateString(channel.date)}`);
      await fsPromises.appendFile(filePath, `Created from: ${utcEpochToDateString(channel.date)}\n`, 'utf-8')
    }
    // Get inactive channels/group
    // https://gram.js.org/tl/channels/GetInactiveChannels
    // 15 days not active

    // Get recent 100 posts in channel
    const history: TypeMessages = await client.invoke(
      new Api.messages.GetHistory({
        peer: source.link,
        offsetDate: Date.now() / 1000,
        limit: 100,
      })
    );
    let channelRawData: ChannelPost[] = []
    for (const message of (history as ChannelMessages).messages) {
      if (message instanceof Message) {
        let channelRaw: ChannelPost = {
          id: message.id,
          message: ellipsis(message.message),
          date: message.date,
          forwardCount: message.forwards || 0,
          viewCount: message.views || 0,
          replyCount: message?.replies?.replies || 0,

        }
        let reactionCount = 0
        let reactionDetails: Reaction[] = []
        const reactionResults: ReactionCount[] = message?.reactions?.results || []
        if (reactionResults && reactionResults.length > 0) {
          for (const reaction of reactionResults) {
            reactionCount += reaction.count
            const detail: Reaction = {
              emoticon: (reaction.reaction as ReactionEmoji).emoticon,
              count: reaction.count
            }
            reactionDetails.push(detail)
          }
        }
        channelRaw.reactionDetails = reactionDetails
        channelRaw.reactionCount = reactionCount
        channelRawData.push(channelRaw)
      }
    }
    // Print result of 100 latest post

    for (const post of channelRawData) {
      await fsPromises.appendFile(filePath, `date: ${utcEpochToDateString(post.date)}\n`, 'utf-8')
      await fsPromises.appendFile(filePath, `message: ${post.message}\n`, 'utf-8');
      await fsPromises.appendFile(filePath, `viewCount: ${post.viewCount}, replyCount: ${post.replyCount}, forwardCount: ${post.forwardCount}, reactionCount: ${post.reactionCount}\n`, 'utf-8');

      for (const reaction of post.reactionDetails || []) {
        await fsPromises.appendFile(filePath, `reaction: ${reaction.emoticon}, count: ${reaction.count}\n`, 'utf-8');
      }
      await fsPromises.appendFile(filePath, "\n", 'utf-8');
    }
    await fsPromises.appendFile(filePath, "\n", 'utf-8');
  }
}

const getHistory = async (channel: string, offsetId: number, offsetDate: number) => {

}

runCrawlTelegram()

