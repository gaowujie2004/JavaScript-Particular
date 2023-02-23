function _setInterval(callback, timeout, ...args) {
  let lastCallbackTime = Date.now();

  function impl() {
    const now = Date.now();
    // 多出来的
    const beyondDelay = now - lastCallbackTime - timeout;
    const okDelay = timeout - beyondDelay;
    console.log('调整之后的delay', okDelay);

    lastCallbackTime = now;

    callback.apply(args);
    timerId = setTimeout(impl, timeout);
  }

  let timerId = setTimeout(impl, timeout);

  // 取消 setInterval
  return () => clearTimeout(timerId);
}

let lastTime = Date.now();
_setInterval(() => {
  const now = Date.now();
  console.log(now - lastTime);

  lastTime = now;
}, 3000);
