# Telegram Bot

In this case we are using javascript and Nodejs for develop the bot. Telegraf.js is a library that will helps to make it easy. 
First of all we need our api token of Telegram bot.

## Get Bot Token Api

- Go to telegram and search BotFather (You have to choose the verified bot).
- Enter on the chat and send /start.
- We will recieve an info message and we have to answer /newbot.
- He will ask for a name and a username of the bot.
- Then you will have a congrats message with the token api.
Should be something like 123456789:AbCdefGhIJKlmNoPQRsTUVwxyZ.



## Getting Started

### Installation

- Be sure that have node.js installed.

```
npm install -g npm
```

Install Telegraf.js

```
$ npm install telegraf
```


### Create your file

In your directory create a main.js file and import telegraf.

```js
const { Telegraf } = require('telegraf');
```

Set the bot constant with your token directly (not recommended)[^1].

```js
const bot = new Telegraf("TOKEN_API");
```
or with environment variables.
```js
const bot = new Telegraf(process.env.BOT_TOKEN);
```

[^1]: Is important dont share or upload your tokens or keys. Using .env is a easy method to put them safe.

### Environment Variables

- You can use environment variables creating a .env file and inside write ```BOT_TOKEN:"YOUR_TOKEN"```. 
- After install dotenv 
```npm install dotenv --save```
- Import dotenv to your main.js
```js
require('dotenv').config();
```

## Example bot configs

```js
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();
```

## Run your bot

- For the first test. Run in your terminal ```node main.js```
- Go to your Telegram app, search your bot chat and write ```/start```
- After a change remember kill your process and run ```node main.js``` again.
