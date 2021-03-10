// const fs = require('fs');
const arduino = require("johnny-five");

let led = [true, true, false, true];

// file is included here:
// eval(fs.readFileSync('java.js')+'');

let HIGH = 0x01;
let LOW = 0x00;
let board = new arduino.Board({
    port: "COM3",
});
let pin = [];

board.on("ready", () => {
    for (let i = 2; i <= 12; i++) {
        pin[i] = new arduino.Pin(i);
    }

    board.loop(200, () => {
        main();
    });
});

async function main() {
    for (let i = 0; i < led.length; i++) {
        let state = led[i] ? HIGH : LOW;
        pin[i + 2].write(state);
    }

    for (let i = 0; i < led.length; i++) {
        led[i] = Math.random() > 0.5;
    }
}