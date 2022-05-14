console.log('window.postMessage');

window.onmessage = (ev) => {
  console.log('message1 网页收到消息', ev);
};

var son_9090;

document.querySelector('button').onclick = () => {
  window.postMessage('my is 8080', 'http://127.0.0.1:8080/');
};
