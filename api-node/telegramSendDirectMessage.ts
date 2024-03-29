// This will send message directly to user
require('dotenv').config()
import {Api, TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions";
import User = Api.User;
import ChannelMessages = Api.messages.ChannelMessages;
import InputPeerUser = Api.InputPeerUser;
import Message = Api.Message;

const fs = require("fs")
const input = require("input"); // npm i input

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0");
const apiHash = process.env.TELEGRAM_API_HASH || "";
const session = process.env.TELEGRAM_SESSION || "";
const stringSession = new StringSession(session);

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.connect()
  // await client.start({
  //     phoneNumber: async () => await input.text("Please enter your number: "),
  //     password: async () => await input.text("Please enter your password: "),
  //     phoneCode: async () =>
  //         await input.text("Please enter the code you received: "),
  //     onError: (err) => console.log(err),
  // });
  // console.log("You should now be connected.");
  // console.log(client.session.save()); // Save this string to avoid logging in again
  // await client.sendMessage(2143893233, { message: `Hello bros -- ${Date.now()}` });

  const me = await client.getMe()
  if (me instanceof User) {
    console.log(`username: ${me.username}`)
  }
  // Get Exactly reaction from message Id
  // const result = await client.invoke(
  //   new Api.messages.GetMessagesReactions({
  //     peer: "https://t.me/GameFiVN",
  //     id: [102717],
  //   })
  // );

  // Get History
  const result = await client.invoke(
    new Api.messages.GetHistory({
      peer: "https://t.me/GameFi_OfficialANN",
      // offsetId: 1300,
      // addOffset: 0,
      offsetDate: 1668755412,
      limit: 100,
      // maxId: 1300,
      // minId: 1100,
    })
  );

  if (result instanceof ChannelMessages) {
    const messages: Api.TypeMessage[] = result.messages
    messages.sort((a, b) => (a as Message).date - (b as Message).date)
  }

  // const result = await client.invoke(new Api.channels.GetInactiveChannels());

  // const result = await client.invoke(
  //   new Api.updates.GetChannelDifference({
  //     channel: "https://t.me/GameFiVN",
  //     filter: new Api.ChannelMessagesFilter({
  //       ranges: [
  //         new Api.MessageRange({
  //           minId: 10,
  //           maxId: 100,
  //         }),
  //       ],
  //     }),
  //     pts: 137142,
  //     limit: 100,
  //     force: true,
  //   })
  // );
  // const result = await client.invoke(new Api.updates.GetState());
  const filePath = "result.txt"
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    fs.writeFile(filePath, JSON.stringify(result), function (err: any) {
      if (err) return console.log(err);
      console.log('Write to file - Done');
    });
  } else {
    fs.writeFile(filePath, JSON.stringify(result), function (err: any) {
      if (err) return console.log(err);
      console.log('Write to file - Done');
    });
  }

  // console.log(JSON.stringify(result)) // prints the result

})();