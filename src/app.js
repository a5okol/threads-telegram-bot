/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");

const bot = require("./services/telegramBotService");
const threadsAPI = require("./services/threadsService");

const app = express();
const telegramGroupId = process.env.TELEGRAM_GROUP_ID;

app.use(express.json());
app.get("/_health", (_, res) => {
  res.sendStatus(200);
});

bot.on("new_chat_members", (msg) =>
  bot.deleteMessage(msg.chat.id, msg.message_id)
);
bot.on("left_chat_member", (msg) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);
});

bot.on("message", async (msg) => {
  if (
    String(msg.chat.id) === String(telegramGroupId) ||
    String(msg.chat.id).startsWith("-")
  ) {
    console.log("Message from group");
    return;
  }
});

bot.on("callback_query", async (callbackQuery) => {});

app.listen(process.env.PORT, () => {
  console.log("Express server is live");
  bot.startPolling();
});

bot.on("polling_error", (error) => {
  console.log("Received ETELEGRAM error with message:", error.message);
});
