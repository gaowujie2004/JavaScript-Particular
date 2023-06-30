function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async () => {
  const response = await fetch('./');

  const bodyReadStream = response.body;
  console.log('流被锁？', bodyReadStream.locked);

  const reader1 = bodyReadStream.getReader();

  console.log('流被锁？', bodyReadStream.locked);

  reader1.releaseLock();

  console.log('流被锁？', bodyReadStream.locked);

  // const reader2 = bodyReadStream.getReader();
};

(async () => {
  let count = 0;

  console.log('自己哦； ');
  const myRS = new ReadableStream({
    // 该方法是同步的，实例化后就执行
    start(controller) {
      console.log('start call-----， 返回一个10秒失败的Promise');

      return sleep(10_000);
    },
    pull(controller) {
      if (count > 5) {
        return;
      }
      console.log('pull call-----');

      controller.enqueue('90');

      count++;
      // 调用 reader.read 如果内置队列没有数据了
    },
    cancel(reason) {
      // 相当于回调函数
      console.log('cancel cal-----', reason);
    },
  });

  console.log('MyRS  实例化后。。。。。。');

  const reader = myRS.getReader();
  window['testReader'] = reader;
  window['myRS'] = myRS;

  let maxCount = 0;

  // 如果没有足够的数据生成（即没有调用controller.enQueue ），那么 reader.read() 返回的Promise就是处于等待状态。
  while (true) {
    console.log('调用 read 之前');
    const { done, value } = await reader.read();
    console.log('read while: ', done, value);

    if (done) break;

    console.log('调用 read 之后');

    console.log('maxCount', maxCount);

    // maxCount++;
  }
})();
