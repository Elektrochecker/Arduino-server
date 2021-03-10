function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200);
  // text(`${httpGet("http://localhost:8080/led")}`,20,20)
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}