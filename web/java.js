let led = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200);
}

async function getLedStatus() {
  await fetch("http://localhost:8081/led")
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result.ledArray)

      for (let i = 0; i < result.ledArray.length; i++) {
        led[i] = result.ledArray[i];
      }
    })
    return led;
}