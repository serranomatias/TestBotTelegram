const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');


const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start((ctx) => {
    const userFirstName = ctx.update.message.from.first_name;
    ctx.reply(`Welcome ${userFirstName}`);
});
bot.help((ctx) => {
    ctx.reply("If you need help with bot config can you access to https://telegraf.js.org/index.html or send me a message on https://www.linkedin.com/in/serrano-matias/");
});

bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('bot', (ctx) => ctx.reply('to who you call bot? human...'));
bot.on(message('text'), (ctx) => {
    const msg = ctx.update.message.text;
    console.log(ctx.from);
    if (msg.includes('podcast')) {
        if (ctx.from.language_code == 'es') {
            ctx.reply('El nuevo podcast esta disponible en nuestros canales de Youtube, Spotify, Apple iTunes...');
        } else {
            ctx.reply('The new podcast is available on our channels like Youtube, Spotify, Apple iTunes...');
        }
    }

})

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}
bot.command('random', (ctx) => {
    ctx.reply(`Your random number is ${random(100)}`);
});

bot.command('advancerandom', (ctx) => {
    const message = ctx.update.message.text;
    const randomNumber = Number(message.split(' ')[1]);
    if (isNaN(randomNumber) || randomNumber <= 0) {
        ctx.reply('Please enter a valid number.');
    } else {
        ctx.reply(random(randomNumber) + '');
    }
})

// When you send a photo to the bot, the bot will automatically save the photo
// in the repository folder. After with the /sendphoto command, the bot will automatically
// send the photo to you. 
const downloadImage = (url, image_path, ctx) =>
    axios({ url, responseType: 'stream' }).then(
        (response) =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on("finish", () => {
                        ctx.reply('Save successfully');
                        resolve();
                    })
                    .on('error', (e) => {
                        ctx.reply("Don't save successfully");
                        reject(e);
                    });
            })
    );

bot.on('photo', (ctx) => {
    const fileId = ctx.update.message.photo[1].file_id

    ctx.telegram.getFileLink(fileId).then((response) => {
        downloadImage(response.href, './photo.jpg', ctx)
    })
    ctx.reply('You send me a photo');
})

bot.command('sendphoto', (ctx) => {
    ctx.replyWithPhoto({ source: 'photo.jpg' });
})


bot.launch();