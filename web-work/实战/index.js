/**================================== 安装 ServiceWorker **/
window.addEventListener('load', function () {
  /* 创建并指定对应的执行内容 */
  /* scope 参数是可选的，可以用来指定你想让 service worker 控制的内容的子目录。 在这个例子里，我们指定了 '/'，表示 根网域下的所有内容。这也是默认值。 */
  navigator.serviceWorker
    .register('http://127.0.0.1:8080/sw.js', { scope: './' })
    .then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch(function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
});

const fetchBtn = document.querySelector('#fetch');
fetchBtn.onclick = () => {
  fetch('/').then((res) => {
    console.log('--fetch 回来了', res);
  });
};

const VIRTUAL_lURL = '/sa_virtual_download_url_path';
const DOWNLOAD_URLS = [
  'http://127.0.0.1:8080/index.html',
  'http://127.0.0.1:8080/index.html',
  'http://127.0.0.1:8080/index.html',
  'http://127.0.0.1:8080/index.html',
  'http://127.0.0.1:8080/index.html',
  'http://127.0.0.1:8080/index.html',
];
const { port1: swPort, port2: mainPort } = new MessageChannel();
let isSend = false;

async function download() {
  console.log('download click');

  const swReg = await navigator.serviceWorker.getRegistration();
  const sw = swReg.active;

  // JS主线程与sw线程通信的通道
  if (!isSend) {
    sw.postMessage(swPort, [swPort]);
    isSend = true;
  }

  // 向 sw-thread 发送参数信息
  sw.postMessage({
    type: 'FILE_INFO',
    payload: {
      downList: DOWNLOAD_URLS,
      fileName: 'mul_downalod.zip',
    },
  });

  // 响应sw-thread
  mainPort.onmessage = (ev) => {
    console.log('主线程收到sw的消息： ', ev);
    const data = ev.data;
    if (data?.type === 'CAN_DOWNLOAD') {
      // 触发页面级下载
      const iframe = document.createElement('iframe');
      iframe.hidden = true;
      iframe.src = VIRTUAL_lURL;
      iframe.name = 'iframe';
      document.body.appendChild(iframe);
    }
  };
}

const downloadEl = document.querySelector('#download');
downloadEl.onclick = download;
