let led = [];
let scl = 100;
let initialized = getInitializedStatus();
let message = document.getElementById("messageText");

async function setup() {
  await getInitializedStatus();
  if (!initialized) {
    message.innerHTML = "awaiting initialization"
    await initialize(
      prompt("port of Arduino: leave blank for AUTO")
    )
    message.innerHTML = "running..."
  } else {
    message.innerHTML = "running..."
  }

  createCanvas(4 * scl, scl);
  frameRate(2);
  getLedStatus();
}

function draw() {
  background(200);
  getLedStatus();
  frameRate(2);

  for (var i = 0; i < led.length; i++) {
    col = led[i] ? [200, 60, 30] : [40, 40, 40]
    fill(col)
    strokeWeight(2)
    rect(i * scl, 0, scl, scl)
  }
}

function mousePressed() {
  if (mouseX > scl * 4) {
    return false;
  } else {
    x = Math.floor(mouseX / scl)
    changeLedStatus(x)
  }
}

// function touchStarted() {
//   let y = touches[0].y;
//   let x = touches[0].x;
//   if (x > scl * 4) {
//     return false;
//   } else {
//     x = Math.floor(x / scl)
//     changeLedStatus(x)
//   }
// }