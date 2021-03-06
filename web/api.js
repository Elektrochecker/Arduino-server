let localPORT = 80;
let ip = ""
ip =  ip || "localhost"

async function getLedStatus() {
  return await fetch(`http://${ip}:${localPORT}/led`, {
      method: "GET",
      mode: "cors",
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      for (let i = 0; i < result.ledArray.length; i++) {
        led[i] = result.ledArray[i];
      }
    })
    .catch(err => {
      message.innerHTML = err
    })
}

async function setLedStatus(newArray) {
  return await fetch(`http://${ip}:${localPORT}/led/set`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        newState: newArray,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      // console.log(response)
    })
    .catch(err => {
      message.innerHTML = err
    })
}

async function changeLedStatus(change) {
  return await fetch(`http://${ip}:${localPORT}/led/change`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        changeLed: change,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      // console.log(response)
    })
    .catch(err => {
      message.innerHTML = err
    })
}

async function initialize(port) {
  return await fetch(`http://${ip}:${localPORT}/init`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        port: port,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      // console.log(response)
    })
    .catch(err => {
      message.innerHTML = err
    })
}

async function getInitializedStatus() {
  await fetch(`http://${ip}:${localPORT}/init`, {
      method: "GET",
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      initialized = (result.initialized);
      return result.initialized;
    })
    .catch(err => {
      message.innerHTML = err
    })
}