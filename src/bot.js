import seek from "./seeker.js";
import { Telegraf } from "telegraf";
import EventEmitter from "events";

const bot = new Telegraf(process.env.BOT_TOKEN);
const ee = new EventEmitter();

let currentStatus = 'Not seeking';

bot.command('seek', async (ctx) => {
    let awaitingResponse = true;
    const craInterval = setInterval(async () => {
        seek().then((message) => {
            if (message.includes('Some content has changed')){
                currentStatus = message;
                console.log(currentStatus);
                ee.emit('update');
            }
        });
    }, 1000 * 5);

    ctx.reply('Seeking...\n\nYou will be notified of any changes! :D');

    ee.on('update', () => {
        if(awaitingResponse){
            ctx.reply('Some content has changed...\n\nCheck it out!' + '\n\n' + process.env.COMP_URL);  
            clearInterval(craInterval);
            awaitingResponse = false;
        }
    });
});



bot.launch();