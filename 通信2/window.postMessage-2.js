console.log('window.postMessage 22222');

window.onmessage = (ev) => {
  console.log('message2222 网页收到消息', ev);
};
