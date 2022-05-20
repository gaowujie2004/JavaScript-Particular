console.log('window.postMessage');

window.onmessage = (ev) => {
  console.log('message1 网页收到消息', ev);
};

var son_9090;

document.querySelector('button').onclick = () => {
  son_9090 = window.open('http://127.0.0.1:9090/window.postMessage-2.html');
};
