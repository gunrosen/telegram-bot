// This will send message directly to user
require('dotenv').config()
import {Api, TelegramClient} from "telegram";
import { StringSession } from "telegram/sessions";
import User = Api.User;
import InputPeerUser = Api.InputPeerUser;
const input = require("input"); // npm i input

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0");
const apiHash =  process.env.TELEGRAM_API_HASH  || "";
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
  if (me instanceof User){
    console.log(`username: ${me.username}`)
  }
  const result = await client.invoke(
    new Api.updates.GetChannelDifference({
      channel: "https://t.me/GameFiVN",
      filter: new Api.ChannelMessagesFilter({
        ranges: [
          new Api.MessageRange({
            minId: 10,
            maxId: 100,
          }),
        ],
      }),
      pts: 46049,
      limit: 100,
      force: true,
    })
  );
  // const result = await client.invoke(new Api.updates.GetState());
  console.log(JSON.stringify(result)) // prints the result

})();