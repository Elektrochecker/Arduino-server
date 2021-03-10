const express = require("express");
const app = express();
const PORT = 8081;
app.use(express.json());

app.listen(
    PORT,
    () => console.log(`live at http://localhost:${PORT}`)
)

const arduino = require("johnny-five");
const fs = require("fs");
let html;

let led = [true, true, false, true];
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

    board.loop(4000, () => {
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

app.get("/led", (req, res) => {
    res.status(200).send({
        ledArray: led,
    })
});

app.get("/", (req, res) => {
    res.status(200).send(
    )
});

// fs.readFile("index.html", function (err, data) {
//     if (err) throw err;
//     html = data.toString();
// });