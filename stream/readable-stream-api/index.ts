const myReadStream = new ReadableStream({
  start(controller) {
    let count = 0;
    const timeID = setInterval(() => {
      if (++count > 10) {
        controller.close();
        clearInterval(timeID);
        return;
      }

      console.log('--定时器执行');
      const chunk = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      controller.enqueue(chunk);
    }, 1000);
  },
});

const reader = myReadStream.getReader();

// 可写流
const myWriteStream = new WritableStream({
  write(chunk) {
    // 底层写入
    // 比如 Node.js fs.writeFile(filePath, chunk)
  },
});

const writer = myWriteStream.getWriter();
let count = 0;
const timeID = setInterval(() => {
  if (++count > 10) {
    clearInterval(timeID);
    return;
  }

  console.log('--写定时器');
  writer.write(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
}, 1000);
