class Zip {
  constructor(control) {
    const zip = new fflate.Zip((err, chunk, final) => {
      if (err) {
        console.log('zip zip zip ERROR', err);
      }

      console.log('zip zip zip data', chunk);

      if (final) {
        console.log('zip zip zip end');
      }
    });

    const helloFile = new fflate.ZipDeflate('htllo.html', { level: 9 });
    zip.add(helloFile);

    this.zip = zip;
    this.helloFile = helloFile;
  }

  push(chunk, callback) {
    this.helloFile.push(chunk);
  }

  end() {
    this.helloFile.push([], true);
    this.zip.end();
  }
}

function myTransform() {
  let ReadeStreamController = null;

  const transform = new TransformStream({
    start(controller) {
      ReadeStreamController = controller;
    },
    transform(chunk, controller) {
      helloFile.push(chunk);
    },
    flush() {
      console.info(`%c🇨🇳flush------flush`, 'font-size:25px;color:deeppink;');

      helloFile.push([], true);
      zip.end();
    },
  });

  const zip = new fflate.Zip((err, chunk, final) => {
    if (err) {
      console.log('zip zip zip ERROR', err);
    }

    console.log('zip zip zip data', chunk);
    ReadeStreamController.enqueue(chunk);

    if (final) {
      console.log('zip zip zip end');
    }
  });

  const helloFile = new fflate.ZipDeflate('htllo.html', { level: 9 });
  zip.add(helloFile);

  return transform;
}

function myTransform3(sourceReadStream) {
  const { writable, readable } = new TransformStream({});
  const defaultWriter = writable.getWriter();

  const zip = new fflate.Zip((err, data, final) => {
    if (!err) {
      console.log('zip zip zip data', data);
      defaultWriter.write(data);

      if (final) {
        console.log('zip zip zip end');
        defaultWriter.releaseLock();
        writable.close();
      }
    } else {
      defaultWriter.close();
    }
  });

  const helloTxt = new fflate.ZipDeflate('htllo.html', { level: 9 });
  zip.add(helloTxt);

  const bodyReader = sourceReadStream.getReader();
  function getReadData() {
    bodyReader.read().then((res) => {
      if (res.done) {
        console.log('getReadData OK');
        helloTxt.push([], true);
        zip.end();
        return;
      }

      console.log('getReadData res', res.value);
      helloTxt.push(res.value);
      // 异步递归
      getReadData();
    });
  }
  getReadData(); // 不加 await

  readable.pipeThrough;
  return readable;
}

function myTransform4() {
  const readable = new ReadableStream({
    //
  });

  const writable = new WritableStream({
    //
  });
}

// Test
async function handleTransform() {
  const response = await fetch('/');
  const bodyStream = response.body;

  console.log('--对比if');

  const transform = new TransformStream();
  const read = bodyStream.pipeThrough(transform);

  console.log('相等吗？', read === transform.readable);
  console.log('锁定了吧', transform.writable.locked);

  // while (true) {
  //   const { done, value } = await bodyReader.read();
  //   if (done) {
  //     break;
  //   }
  //   console.log('while read()', value);
  // }
}

const transform = document.querySelector('#transform');
transform.onclick = handleTransform;

/**
 * 1. 多个 readStream（作为 生产者）。
 * 2. 将多个流转换到一个 readStream （也作为生产者）中。
 *
 *  readStream.pipeThrough(transform)  ->  readStream2
    bodyStream.pipeThrough(transform).pipeTo(writable, { preventClose: true });
 *   
 */
