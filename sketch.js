let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#8338ec'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與視訊畫面一樣大小的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics();
}

function draw() {
  background('#8338ec'); // 確保背景顏色持續更新
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 顯示視訊畫面
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);

  // 顯示 Graphics 在視訊畫面上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 重新調整影像大小

  // 重新調整 Graphics 的大小
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics();
}

function drawOverlayGraphics() {
  overlayGraphics.background(0); // 設定背景為黑色
  overlayGraphics.noStroke();

  // 每隔 20 單位繪製方框與圓形
  for (let y = 0; y < overlayGraphics.height; y += 20) {
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      // 從 capture 中取得對應位置的顏色
      let col = capture.get(x, y);
      let g = green(col); // 取得 G 值
      overlayGraphics.fill(0, g, 100); // 設定方框顏色 (R=0, G=保留, B=100)
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，稍微縮小以避免重疊

      overlayGraphics.fill(0); // 設定圓形顏色為黑色
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 繪製圓形，置於方框中心
    }
  }
}
