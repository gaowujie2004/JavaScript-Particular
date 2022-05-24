const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const img = document.querySelector('img');

canvas.width = 100;
canvas.height = 100;

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  // 结合 TS 查看此数据类型
  const res = ctx.getImageData(0, 0, 6, 6);
  window.imageData = res;
};
