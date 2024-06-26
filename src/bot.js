import seek from "./seeker.js";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

let craInterval;

const checkRegistrationAvailability = async (ctx) => {
    seek().then((message) => {
        console.log(message);
        ctx.reply(message);
    });
};


bot.command('seek', async (ctx) => {
    const a = ctx;
    ctx.reply('Seeking...');
    checkRegistrationAvailability(ctx);
    craInterval = setInterval(async () => {
        checkRegistrationAvailability(ctx);
    }, 1000 * 10);
});

bot.command('stopseeking', async (ctx) => {
    clearInterval(craInterval);
    ctx.reply('Seeking stopped');
});

bot.launch();