let capture;
let pg; // 用於存儲 Graphics 物件

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  pg = createGraphics(windowWidth * 0.6, windowHeight * 0.6); // 初始化與視訊比例相同的繪圖層
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

  // 在 Graphics 繪圖層上處理像素資訊
  pg.clear();
  if (capture.width > 0) {
    capture.loadPixels();
    pg.textAlign(CENTER, CENTER);
    pg.textSize(8);
    let step = 20; // 以 20x20 為一個單位

    for (let yGrid = 0; yGrid < capture.height; yGrid += step) {
      for (let xGrid = 0; xGrid < capture.width; xGrid += step) {
        let index = (xGrid + yGrid * capture.width) * 4;
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        let avg = floor((r + g + b) / 3); // 計算平均值 (pixel[0] + pixel[1] + pixel[2]) / 3

        // 映射座標：因為視訊已鏡像，x 座標需反向映射 (capture.width - xGrid) 才能對準位置
        let drawX = map(capture.width - xGrid, 0, capture.width, 0, pg.width);
        let drawY = map(yGrid, 0, capture.height, 0, pg.height);

        pg.fill(0); // 使用黑色文字顯示數值
        pg.text(avg, drawX, drawY);
      }
    }
  }

  // 將繪圖層顯示在視訊畫面的上方
  image(pg, x, y, videoWidth, videoHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg.resizeCanvas(windowWidth * 0.6, windowHeight * 0.6); // 視窗縮放時同時調整繪圖層大小
}
