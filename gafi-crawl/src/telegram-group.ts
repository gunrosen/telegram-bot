require('dotenv').config()
const fsPromises = require('fs/promises');
const fs = require('fs');
import {StringSession} from "telegram/sessions";
import {Api, TelegramClient} from "telegram";
import User = Api.User;

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0");
const apiHash = process.env.TELEGRAM_API_HASH || "";
const session = process.env.TELEGRAM_SESSION || "";
const stringSession = new StringSession(session);

const funCrawlTelegramGroup = async () => {
  const filePath = "crawl_group.txt"
  if (fs.existsSync(filePath)) {
    await fsPromises.rm(filePath)
  }

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.connect()
  const me = await client.getMe()
  if (me instanceof User) {
    console.log(`You logged in as : ${me.username}`)
  }

  // const result = await client.invoke(
  //   new Api.updates.GetChannelDifference({
  //     channel: "https://t.me/GameFi_Official",
  //     filter: new Api.ChannelMessagesFilter({
  //       ranges: [
  //         new Api.MessageRange({
  //           minId: 461216,
  //           maxId: 461319,
  //         }),
  //       ],
  //       excludeNewMessages: true,
  //     }),
  //     pts: 751573,
  //     limit: 100,
  //     force: true,
  //   })
  // );
  const result = await client.invoke(
    new Api.messages.GetHistory({
      peer: "https://t.me/GameFi_Official",
      offsetDate: 1669459032,
      limit: 100,
    })
  );

  await fsPromises.appendFile(filePath, JSON.stringify(result), 'utf-8');
  process.exit()
}

funCrawlTelegramGroup()