const arduino = require("johnny-five");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 8081;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'web')));

app.listen(
    PORT,
    () => console.log(`live at http://localhost:${PORT}`)
)

let html;

let led = [false, false, false, false];
let HIGH = 0x01;
let LOW = 0x00;
let board = new arduino.Board({
    port: "COM5",
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
}

app.get("/led", (req, res) => {
    res.status(200).send({
        ledArray: led,
    })
});

app.get("/", (req, res) => {
    res.render("web/index.html");
});

app.post("/led/change", (req, res) => {
    let {changeLed: changeLed} = req.body;
    changeLed = eval(changeLed)
    console.log(changeLed);
    
    if (changeLed > 3 || changeLed < 0) {
        res.status(400).send("invalid LED");
    }
    
    if (typeof(changeLed) == "number") {
        led[changeLed] = !led[changeLed];
    } else if (typeof(changeLed) == "object") {
        for ( let i = 0; i < changeLed.length; i++) {
            led[changeLed[i]] = !led[changeLed[i]];
        }
    } else {
        res.status(401).send("invalid LED datatype")
    }

    res.send({
        message:`changed Led ${changeLed}`,
        newArray: led,
        inputDataType: typeof(changeLed),
    });
})

// fs.readFile("index.html", function (err, data) {
//     if (err) throw err;
//     html = data.toString();
// });