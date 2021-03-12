let led = [];
let COM;
let scl = 20;

function setup() {
  createCanvas(4 * scl, scl);
  frameRate(2);
  // COM = prompt("Please enter the Port of the Arduino", "COM5")
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
  if (mouseY > scl) {
    return false;
  } else {
    x = Math.floor(mouseX / scl)
    changeLedStatus(x)
    return x;
  }
}