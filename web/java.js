let led = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200);
  getLedStatus();

  for (var i = 0; i < led.length; i++) {
    col = led[i] ? [200, 20, 20] : [0, 0, 0]
    fill(col)
    rect(i * 20, 0, 20, 20)
  }
}