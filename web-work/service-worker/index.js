console.info(`%c🇨🇳index main`, 'font-size:25px;color:deeppink;');

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

const openWindowBtn = document.querySelector('#open-window');
openWindowBtn.onclick = () => {
  // window.son = window.open('http://127.0.0.1:8080?method=openWindow');
  window.son = window.open('http://127.0.0.1:8080');
};

const iframeDownload = document.querySelector('#iframe-download');
iframeDownload.onclick = () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'http://127.0.0.1:8080?method=download';
  document.body.appendChild(iframe);
};
