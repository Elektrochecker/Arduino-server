const arduino = require("johnny-five");
const path = require("path");
const express = require("express");
const cors = require("cors");
const ip = require("ip");
const app = express();
const hostingPORT = 80;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'web')));

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.listen(
    hostingPORT, "0.0.0.0",
    () => console.log(`live at http://localhost:${hostingPORT} \n or http://${ip.address()}:${hostingPORT}`)
)

let arduinoPort;
let led = [false, false, false, false];
let HIGH = 0x01;
let LOW = 0x00;
let board;
let pin = [];

//"COMX" or "AUTO" or ""
let initBoard = com => {
    if (typeof eval(com) == "number") {
        com = `COM${com}`
    }
    if (com == "AUTO" || com == "") {
        board = new arduino.Board();
        arduinoPort = "Automatic"
    } else {
        board = new arduino.Board({
            port: com,
        });
        arduinoPort = com;
    }
    runArduino();
}

let runArduino = () => {
    console.log("running...")
    board.on("ready", () => {
        for (let i = 2; i <= 12; i++) {
            pin[i] = new arduino.Pin(i);
        }

        board.loop(200, () => {
            main();
        });
    });
}

async function main() {
    for (let i = 0; i < led.length; i++) {
        let state = led[i] ? HIGH : LOW;
        pin[i + 2].write(state);
    }
}

app.get("/led", cors(), (req, res) => {
    res.status(200).send({
        ledArray: led,
    })
});

app.get("/", cors(), (req, res) => {
    // let { port:newCOM } = req.body
    res.render("web/index.html");
});

app.post("/init", cors(), (req, res) => {
    let {
        port: port
    } = req.body;
    initBoard(port);
    res.status(200).send(`initialized on port &{port}`)
})

app.get("/init", cors(), (req, res) => {
    if (!!board) {
        res.status(200).send({
            initialized: true,
            port:arduinoPort
        });
    } else {
        res.status(200).send({
            initialized: false,
        });
    }
})

app.post("/led/change", cors(), (req, res) => {
    let {
        changeLed: changeLed
    } = req.body;
    changeLed = eval(changeLed)

    if (changeLed > 3 || changeLed < 0) {
        res.status(400).send("invalid LED");
    }

    if (typeof (changeLed) == "number") {
        led[changeLed] = !led[changeLed];
    } else if (typeof (changeLed) == "object") {
        for (let i = 0; i < changeLed.length; i++) {
            led[changeLed[i]] = !led[changeLed[i]];
        }
    } else {
        res.status(400).send("invalid LED datatype")
    }

    res.send({
        message: `changed Led ${changeLed}`,
        newArray: led,
        inputDataType: typeof (changeLed),
    });
})

app.post("/led/set", cors(), (req, res) => {
    let {
        newState: newState
    } = req.body;
    newState = eval(newState)

    if (typeof newState != "object" || newState.length != 4) {
        res.status(401).send("invalid datatype")
    }

    led = newState;
    res.send({
        message: `set LED to ${newState}`,
        LedArray: newState,
    })
})