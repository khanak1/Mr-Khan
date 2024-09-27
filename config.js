const fs = require('fs');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env')) {
  dotenv.config({
    path: './config.env'
  });
}

const API = "https://api-aswin-sparky.koyeb.app";
const ALIVE = process.env.ALIVE || "I am Alive";
const HANDLERS = process.env.HANDLER || "^";
const SESSION_ID = process.env.SESSION_ID || "Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkhaRWxVN1pBTTJxYVY5ak1JeHduRnFPTlpoNUNVTERnQlp3SHdPRFBXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0RhZmxMVzhWWWJRbHArV3F1UEsxaTNlT0V0VlpzamZyQ29oUnRidHFSdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTkJaYkNraFNldzN0T0VnUDBSeXh2UWc5WGV1KzJFWjYvQWNVdTFLZEg0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEaGlPUjFoUWRzMndTb1FnUUlUc01GNEk1ZlJOY3ZqUUdOdzdHMnc0QlVJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9MMEVidEtOWXJnSGJYR2xRUkl3ZXhBbVNkdFlqYXRGeDl6S0VvOUkwV1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InEyU0RHTlhQRVJrRkxFaitTaW9tNHBvOXFMd2FiOWdMaWJYYmFaeFkwMkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUtrVVBPWjZRaXR2WVhYOVU2T0V4dW1uWTh2YnJJVFc4R2hMNFpGdWRXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjhSam5qOG1sS2FZR0wrNFd2QWlOcVAxTWpPQzlBOFF4dXVLWmFXS2V4UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZxZ3gvSS9relhPRWQvNmd6L1lCL2FqNmliUEM3NWo5eTRkRDZSRGhFZmVsazhTci9zbG4ybmx2cWk2ZXQ4c20rRW40clpWT0FuQlVRak50VmNhSUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA5LCJhZHZTZWNyZXRLZXkiOiJWckVPMWRoeXRpakFwNUY3cU1oUGUydWpUaHNRTnBGRlBCUHg1cFdZOHJzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzU1NjE1OTIzNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFQzhGMkQ5MzZCRjg0QjkxNUY3MkYwNUYzQzE0QTczNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3NDU1MTMzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM1NTYxNTkyMzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkQ1NTFFODU1NzM2MkVFOEZFQTQ4QTM0NkU3MkMxOUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzQ1NTEzM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoicFhLQkFCQnNTMlN0dWZxbVhMcVNhQSIsInBob25lSWQiOiJmMTA3YTAwOC00OGI5LTQwNWYtYTg5My1kNTIxZDczNDY3N2MiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNlUyd1hiM2JiMDZoaGh5RG4xRGdPWXgvbmR3PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im54bHNNZ08zK0tTaTkvakNMbmxvOTl6RFVMND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDOUpXMkJZWSIsIm1lIjp7ImlkIjoiOTIzNTU2MTU5MjM0OjM4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFmemFhbCBLaGFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPS053ZDBCRUl1LzI3Y0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5WUQwczA2UnBJbG03TDNIdXY1VGFEbktEanBOWjllT2ZYOXV3cEQxZUZzPSIsImFjY291bnRTaWduYXR1cmUiOiJBVTE0cFhOcnlpREFndGkzcmtCY0dscXRwcVpnZFFQSzFCSmJSS2xTSzdNVytCQjZXVk92ZjdNMlMwOXh3bWRsSUdIMnBVU2RFVWQxY1ExdllkblpEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiS0x1QW9SK3l6anNEbkc0YmtuNUFUaDB4eTRFWlFkbmtWYmdaOFdhNlIvTVNOZk9EU0lWaStEVGJOSGJRY2VTRFVSYWdlN1FjMWI3NktZemdMRUQrQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM1NTYxNTkyMzQ6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY21BOUxOT2thU0padXk5eDdyK1UyZzV5ZzQ2VFdmWGpuMS9ic0tROVhoYiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzQ1NTEyOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFb3AifQ==";
const SUDO = process.env.SUDO || '923556159234';
const AUTO_STATUS_VIEW = process.env.AUTO_STATUS_VIEW || "true";
const ALWAYS_ONLINE = process.env.ALWAYS_ONLINE || "false";
const DISABLE_PM = process.env.DISABLE_PM  || "false";
const PM_BLOCK = process.env.PM_BLOCK || "false";
const PMB = process.env.PMB || "Sorry, I can't help you in private chat.";
const READ_MESSAGES = process.env.READ_MESSAGES || "false";
const BOT_INFO = process.env.BOT_INFO || "SARKAR AK;AFZAAL KHAN;https://github.com/khanak1/zimbot-v4/blob/zim-bot/c57517af20709107a09ea46938e21000.png";
const URL = process.env.URL || "https://www.facebook.com/afzaalkhan.k";
const AUDIO_DATA = process.env.AUDIO_DATA || "SARKAR-AK;AFZAAL KHAN;https://github.com/khanak1/zimbot-v4/blob/zim-bot/c57517af20709107a09ea46938e21000.png";
const STICKER_DATA = process.env.STICKER_DATA || "SARKAR-AK;AFZAAL KHAN";
const WORK_TYPE = process.env.WORK_TYPE || 'public';
const DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
const HEROKU_APP_NAME = process.env.HEROKU_APP_NAME || "";
const HEROKU_API_KEY = process.env.HEROKU_API_KEY || "";
const KOYEB_API_KEY = process.env.KOYEB_API_KEY || "";












module.exports = {
  API,
  ALIVE,
  HANDLERS,
  SUDO,
  WORK_TYPE,
  SESSION_ID,
  STICKER_DATA,
  BOT_INFO,
  AUDIO_DATA,
  AUTO_STATUS_VIEW,
  ALWAYS_ONLINE,
  PM_BLOCK,
  PMB,
  READ_MESSAGES,
  DISABLE_PM,
  URL,
  VERSION:"3.2.0",
  HEROKU_API_KEY,
  HEROKU_APP_NAME,
  KOYEB_API_KEY,
  DATABASE_URL: DATABASE_URL,
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
