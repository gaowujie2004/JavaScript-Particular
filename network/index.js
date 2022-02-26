/* eslint-disable */

// axios 的响应拦截器，当 一个 axios 封装过的请求对象，是 成功状态的promise
// 那么才会调用 响应拦截器，如果不是，直接调用 失败的catch 回调
axios.defaults.timeout = 10000;
// axios.defaults.validateStatus = (statue) => true;

axios.interceptors.request.use(
  (config) => {
    // request - axios 封装过的请求对象
    console.info(`%c🇨🇳请求拦截器OK`, 'font-size:25px;color:deeppink;', config);
    return config;
  },
  (error) => {
    console.info(`%c🇨🇳请求拦截器 - error`, 'font-size:25px;color:deeppink;', error);
    return error;
  }
);

axios.interceptors.response.use(
  (response) => {
    console.info('%c🇨🇳响应拦截器OK', 'font-size:25px;color:deeppink;', response);
    return Promise.resolve(response);
  },
  (error) => {
    console.info('%c🇨🇳响应拦截器--- error', 'font-size:25px;color:deeppink;', error);
    return Promise.reject(error);
  }
);

window.goAxios = function () {
  let cancelToken = axios.CancelToken;
  let cancel;

  axios
    .get('/xxxxxx', {
      cancelToken: new cancelToken((c) => {
        cancel = c;
      }),
    })
    .then((res) => {
      X();
      console.log(res, 'get.then');
    })
    .catch((err) => console.error('get.catch--', err));

  cancel();
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

  xhr.open('get', '/高武杰?id' + Math.random());

  xhr.onload = function (ev) {
    console.log('onload' + new Date().toLocaleTimeString(), ReadyStateText[xhr.readyState]);
  };
  xhr.onloadstart = function (ev) {
    console.log('onloadStart' + new Date().toLocaleTimeString(), ReadyStateText[xhr.readyState]);
  };

  xhr.onreadystatechange = (ev) => {
    console.log('readyStateChange: ', ReadyStateText[xhr.readyState], new Date().toLocaleTimeString());
  };

  xhr.onerror = (err) => {
    console.error('ERROR ---:', err, navigator.onLine);
  };
  xhr.ontimeout = (ev) => {
    console.log('超时', ev);
  };

  xhr.onabort;

  xhr.send();
};

let imgObj = new Image();

/**
 * axios:
 * 1、响应拦截器失败时，只针对timeout、NetWork Error 或者 状态码 > 400 error
 */

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios
  .get('http://127.0.0.1/', {
    cancelToken: source.token,
  })
  .then((v) => (val = v))
  .catch((err) => {
    res = err;
  });
