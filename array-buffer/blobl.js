/**
 * 「Blob」是一个文件对象，blob.arrayBuffer() 可以返回此文件的二进制数据和 Nodejs fs 类似
 *         其核心是 arrayBuffer
 * 「File」 继承 Blob, 自身多了 filename 等关于文件的属性
 */

/**================================== Blob 初探 **/
(() => {
  // blob 类似 Nodejs 中的 fs 模块
  const blob = new Blob(['ABC高武杰'], {
    // 如果是 string[] 则按照 UTF-8 编码
    type: 'ggg', // 仅仅是文件的后缀名，
  });

  console.log(blob);

  blob.arrayBuffer().then((val) => console.log(val));
})();

// ————————————
(() => {
  const fileInput = document.querySelector('input');

  fileInput.onchange = () => {
    const file = fileInput.files[0];
    window.inputFile = file;

    // 解读 Blob 的能力， 以及转换其他类型的能力
    const reader = new FileReader();

    reader.onload = function () {
      const arrayBuffer = reader.result;
      console.log('文件读取结果', arrayBuffer);
    };

    reader.readAsText(file);

    // reader.readAsText(file, 'gb2312');

    // 把文件数据，一次性读到内存中，和 Nodejs 中的 fs.readFile() 类似
    // reader.readAsArrayBuffer(file);
  };
})();
