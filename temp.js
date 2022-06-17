function test1() {
  setTimeout(() => {
    // 不会输出
    console.log('---setTimeout callback execute');
  }, 20);

  function whilePromise() {
    Promise.resolve().then(() => {
      // console.log('then callback execute');
      1 + 1;
      whilePromise();
    });
  }
  whilePromise();
  // Promise 回调函数递归，会导致任务饿死。
  // 其他宏任务会导致任务饿死。
}

// 微任务递归，会导致任务饿死，
// 宏任务递归，不会饿死，
// 证明了 微任务执行时机 是在一次事件循环执行完所有的。
// 而其他任务，是在一次事件循环中从任务调度队列中取出一个任务执行。
function test2() {
  const MC = new MessageChannel();
  const port1 = MC.port1;
  const port2 = MC.port2;

  function whileMC() {
    port1.onmessage = () => {
      console.log('port1 onmessage');

      whileMC.isCall = true;
      whileMC();
    };

    port2.postMessage(null);
  }

  whileMC();
  console.log(9999);

  setTimeout(() => {
    console.log('---setTimeout callback execute');
  }, 40);
}
