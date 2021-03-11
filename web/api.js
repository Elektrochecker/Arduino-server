async function getLedStatus() {
    await fetch("http://localhost:8081/led")
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