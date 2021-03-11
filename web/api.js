async function getLedStatus() {
  await fetch("http://localhost:8081/led", {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      for (let i = 0; i < result.ledArray.length; i++) {
        led[i] = result.ledArray[i];
      }
    })
  return led;
}

async function setLedStatus(newArray) {
  await fetch("http://localhost:8081/led/set", {
    method: "POST",
    body: `{"newState": "${newArray}"}`,
  })
  .then(response => {
    console.log(response)
  })
}