console.info(`%c🇨🇳service worker thread 22`, 'font-size:25px;color:deeppink;');

/**
 * @typedef {import('fflate').Deflate} Deflate
 */
import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min';

const VIRTUAL_URL = '/sa_virtual_download_url_path';
let swPort = null;
let downList = [];
let fileName = '';

self.onmessage = (ev) => {
  console.log('sw  onmessage: ', ev);
  const data = ev.data;

  if (ev.ports[0]) {
    swPort = ev.ports[0];
  }
  if (data?.type === 'FILE_INFO') {
    downList = data.payload?.downList;
    fileName = data.payload?.fileName;
    console.log('--downList, file那么', downList, fileName);
  }

  // 通知主线程开始请求虚拟下载地址
  if (swPort && downList?.length) {
    swPort.postMessage({
      type: 'CAN_DOWNLOAD',
      payload: null,
    });
  }
};

function sleep(duration) {
  return new Promise((r) => setTimeout(r, duration));
}

self.onfetch = async (ev) => {
  /**
   * @type string
   */
  const url = ev.request.url;
  if (!url.endsWith(VIRTUAL_URL)) {
    return;
  }

  console.log('onFetch EV: ', ev);

  const { writable, readable } = new TransformStream({});

  const requestHeaders = ev.request.headers;
  const headers = new Headers({
    'Content-Type': 'application/octet-stream; charset=utf-8',
    'Content-Disposition': `attachment; filename=${fileName}`,
  });

  ev.respondWith(new Response(readable, { headers }));

  for (const downURL of downList) {
    const bodyStream = (
      await fetch(downURL, {
        headers: requestHeaders,
      })
    ).body;

    await bodyStream.pipeThrough(myTransform()).pipeTo(writable);
    console.log('单个 readStream cancel 完成');
  }
};

function myTransform(sourceReadStream) {
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

      helloTxt.push(res.value);
      getReadData();
    });
  }
  getReadData(); // 不加 await

  return readable;
}
