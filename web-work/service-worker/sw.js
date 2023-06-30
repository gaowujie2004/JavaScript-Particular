console.info(`%c🇨🇳service worker thread`, 'font-size:25px;color:deeppink;');

this.addEventListener('install', function (event) {
  /* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
  console.info(`%c🇨🇳install`, 'font-size:25px;color:deeppink;');
});

/* 注册fetch事件，拦截全站的请求 */
this.addEventListener('fetch', function (event) {
  console.info(`%c🇨🇳------fetch------ 覆盖`, 'font-size:25px;color:deeppink;', event);

  const { url } = event.request;
  if (url.includes('openWindow')) {
    console.info(`%c🇨🇳html 被床盖`, 'font-size:25px;color:deeppink;');

    const responseText = 'Hello, World!';
    const statusCode = 200;
    const headers = {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
    };
    const response = new Response(responseText, {
      status: statusCode,
      headers: headers,
    });
    event.respondWith(Promise.resolve(response));
  }

  if (url.includes('download')) {
    console.info(`%c🇨🇳下载拦截`, 'font-size:25px;color:deeppink;');
    const responseText = 'Hello, World!';
    const response = new Response(responseText, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename=can_updaet_name.test',
        'Content-Type': 'application/octet-stream',
      },
    });

    //
  }
});
