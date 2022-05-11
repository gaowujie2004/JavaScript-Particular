/* eslint-disable */

// axios 的响应拦截器，当 一个 axios 封装过的请求对象，是 成功状态的promise
// 那么才会调用 响应拦截器，如果不是，直接调用 失败的catch 回调
axios.defaults.timeout = 10000;
// axios.defaults.validateStatus = (statue) => true;

// axios.interceptors.request.use(
//   (config) => {
//     // request - axios 封装过的请求对象
//     console.info(`%c🇨🇳请求拦截器OK`, 'font-size:25px;color:deeppink;', config);
//     return config;
//   },
//   (error) => {
//     console.info(`%c🇨🇳请求拦截器 - error`, 'font-size:25px;color:deeppink;', error);
//     return error;
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     console.info('%c🇨🇳响应拦截器OK', 'font-size:25px;color:deeppink;', response);
//     return Promise.resolve(response);
//   },
//   (error) => {
//     console.info('%c🇨🇳响应拦截器--- error', 'font-size:25px;color:deeppink;', error);
//     return Promise.reject(error);
//   }
// );

window.goAxios = function () {
  let cancelToken = axios.CancelToken;
  let cancel;

  axios
    .get('/', {
      cancelToken: new cancelToken((c) => {
        cancel = c;
      }),
    })
    .then((response) => {
      console.log(response.data, 'get.then');
    })
    .catch((err) => console.error('get.catch--', String(err)));

  // cancel();
};

window.goAjax = function () {
  const StatusLog = {};

  const UNSENT = 0;
  const OPENED = 1;
  const HEADERS_RECEIVED = 2;
  const LOADING = 3;
  const DONE = 4;
  const ReadyStateText = {
    [UNSENT]: '初始化',
    [OPENED]: 'open方法调用',
    [HEADERS_RECEIVED]: '接收到 响应头',
    [LOADING]: '响应正在加载[第一次表示第一个数据包，以后会继续有当前值]',
    [DONE]: '响应结束',
  };

  let xhr = new XMLHttpRequest();
  xhr.timeout = 10000;
  window.xhr = xhr;

  // 0: 初始化，即new XHR之后
  // 1: open 方法调用
  // 2: 接收到响应头  —— 1 和 2的时间差可以得到 TTFB
  // 3: 响应体正在加载，会持续触发 xhr.readyState === 4
  // 4: 响应结束，无论本次 HTTP 请求是否有响应，都会有 4 状态，其他状态可能没有， 2和4的时间差可以得到下载时间
  // todo:中断、超时、error、响应正常被接收到，这些都会触发 onreadystatechange 事件，而且 xhr.readyState === 4
  // todo: xhr.status HTTP 状态码，如果出现 error、abort 等情况 xhr.status ===0;
  xhr.onreadystatechange = (ev) => {
    console.log(`readyStateChange: ${xhr.readyState}`, ReadyStateText[xhr.readyState], new Date().toLocaleTimeString(), Date.now());
  };

  // 在 onerror、ontimeout、onabort 后面（如果有的话）
  xhr.onloadend = function (ev) {
    console.log(`onloadend: ${xhr.readyState}`, ReadyStateText[xhr.readyState], new Date().toLocaleTimeString(), Date.now());
  };

  xhr.open('get', '/');
  console.log('--open 方法调用', Date.now());

  xhr.onload = function (ev) {
    // 响应结束，兼容性问题
    // 当一个 HTTP 请求正确加载出内容后返回时调用, 响应能被正常拿到
    console.log(`onload: ${xhr.readyState}`, ReadyStateText[xhr.readyState], new Date().toLocaleTimeString(), Date.now());
  };

  // 请求开始，兼容性问题，Open 阶段
  xhr.onloadstart = function (ev) {
    console.log(`onloadStart: ${xhr.readyState}`, ReadyStateText[xhr.readyState], new Date().toLocaleTimeString(), Date.now());
  };

  xhr.onerror = (err) => {
    // 什么时候算是 error ？网络断网，CORS，远程服务器无法链接等
    // 如果是远程IP没有开启端口的话，那就 ERROR
    // 请注意只有在网络层级出现错误时才会调用此函数。如果错误只出现在应用层（比如发送一个HTTP的错误码），这个方法将不会被调用。
    // https://developer.mozilla.org/zh-CN/docs/conflicting/Web/API/XMLHttpRequest/error_event
    console.error('ERROR ---:', err, navigator.onLine, new Date().toLocaleTimeString(), Date.now());
  };

  xhr.ontimeout = (ev) => {
    // 从何时算起？
    // 从请求发出去那一刻
    console.log('超时', new Date().toLocaleTimeString(), Date.now());
  };

  xhr.onabort = (ev) => {
    console.log('中断', new Date().toLocaleTimeString(), Date.now());
  };

  xhr.onprogress = (ev) => {
    console.log('接收进度', new Date().toLocaleTimeString(), Date.now(), ev);
  };

  xhr.send();
};

let imgObj = new Image();

/**
 * axios:
 * 1、响应拦截器失败时，只针对timeout、NetWork Error 或者 状态码 > 400 error
 */

// var CancelToken = axios.CancelToken;
// var source = CancelToken.source();

// axios
//   .get('http://127.0.0.1/', {
//     cancelToken: source.token,
//   })
//   .then((v) => (val = v))
//   .catch((err) => {
//     res = err;
//   });
