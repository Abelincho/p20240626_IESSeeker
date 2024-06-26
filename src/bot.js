import seek from "./seeker.js";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

let currentStatus = 'Not seeking';
const checkRegistrationAvailability = async () => {
    seek().then((message) => {
        currentStatus = message;
    });
};

setInterval(() => {
    checkRegistrationAvailability();
    console.log(currentStatus);
}, 1000 * 5);


bot.command('seek', async (ctx) => {
    ctx.reply('Seeking...');
    ctx.reply(currentStatus);
    const craInterval = setInterval(async () => {
        ctx.reply(currentStatus);
    }, 1000 * 10);

    bot.command('stopseeking', async (ctx) => {
        clearInterval(craInterval);
        ctx.reply('Seeking stopped');
    });
});



bot.launch();