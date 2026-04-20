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

  // 處理左右顛倒（鏡像）
  push();
  translate(x + videoWidth, y); // 移動到影像右上角
  scale(-1, 1);                // 水平翻轉
  image(capture, 0, 0, videoWidth, videoHeight);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
