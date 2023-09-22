import * as fflate from 'https://cdn.skypack.dev/fflate@0.8.0?min';

const VIRTUAL_URL = '/sa_virtual_download_url_path';
let swPort = null;
let downList = [];
let fileName = '';

// 接收 JS Main-Thread 的消息
self.onmessage = (ev) => {
  const data = ev.data;

  if (ev.ports[0]) {
    swPort = ev.ports[0];
  }

  // 响应 JS Main-thread
  if (data?.type === 'FILE_INFO') {
    downList = data.payload?.downList;
    fileName = data.payload?.fileName;
    console.log('--downList, file那么', downList, fileName);
  }

  // 通知 JS Main-thread 开始请求虚拟下载地址
  if (swPort && downList?.length) {
    swPort.postMessage({
      type: 'CAN_DOWNLOAD',
      payload: null,
    });
  }
};

self.onfetch = async (ev) => {
  // 只拦截白名单中的，即虚拟下载地址
  const url = ev.request.url;
  if (!url.endsWith(VIRTUAL_URL)) {
    return;
  }

  const { writable, readable } = new TransformStream({});
  const defaultWriter = writable.getWriter();

  const requestHeaders = ev.request.headers;
  const responseHeaders = new Headers({
    'Content-Type': 'application/octet-stream; charset=utf-8',
    'Content-Disposition': `attachment; filename=${fileName}`,
  });
  ev.respondWith(new Response(readable, { responseHeaders }));

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
      defaultWriter.releaseLock();
      defaultWriter.close();
    }
  });
  const htmlFile = new fflate.ZipDeflate('htllo.html', { level: 9 });
  zip.add(htmlFile);

  for (const downURL of downList) {
    // 可读流
    const response = await fetch(downURL, { headers: requestHeaders });
    const bodyStream = response.body;
    const bodyReader = bodyStream.getReader();

    while (true) {
      const { done, value } = await bodyReader.read();
      if (done) {
        htmlFile.push([], true);
        zip.end();
        break;
      }
      console.log('while read()', value.length);
      htmlFile.push(res.value);
    }

    bodyReader.releaseLock();
    bodyStream.cancel();
    console.log('单个 readStream cancel 完成');
  }

  defaultWriter.releaseLock();
  writable.close();
};
