console.info(`%c🇨🇳service worker thread 22`, 'font-size:25px;color:deeppink;');

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

  console.log('--虚拟下载');
  console.log(fileName, 'fileName------', ev);

  const { writable, readable } = new TransformStream({});
  const defaultWriter = writable.getWriter();

  // const testReader = readable.getReader();
  // function get() {
  //   testReader.read().then((res) => {
  //     if (res.done) {
  //       console.log('完成了');
  //       return;
  //     }

  //     console.log('读取数据', res.value);
  //     get();
  //   });
  // }
  // get();

  const requestHeaders = ev.request.headers;
  const headers = new Headers({
    'Content-Type': 'application/octet-stream; charset=utf-8',
    'Content-Disposition': `attachment; filename=${fileName}`,
  });

  ev.respondWith(new Response(readable, { headers }));

  for (const downURL of downList) {
    console.log(downURL);
    // await sleep(2000);
    const bodyStream = (
      await fetch(downURL, {
        headers: requestHeaders,
      })
    ).body;
    const bodyReader = bodyStream.getReader();

    while (true) {
      const { done, value } = await bodyReader.read();
      if (done) {
        break;
      }
      console.log('while read()', value.length);
      await defaultWriter.write(value);
    }

    bodyReader.releaseLock();
    bodyStream.cancel();
    console.log('单个 readStream cancel 完成');
  }

  console.log('看看');
  defaultWriter.releaseLock();
  writable.close();
};
