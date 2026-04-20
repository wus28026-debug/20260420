let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  background('#e7c6ff');

  let videoWidth = width * 0.6;
  let videoHeight = height * 0.6;
  let x = (width - videoWidth) / 2;
  let y = (height - videoHeight) / 2;

  image(capture, x, y, videoWidth, videoHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
