let mainSleep = function (duration = 1000) {
  let date = Date.now();
  while (Date.now() - date <= duration) {
    //
  }
};

const works = [
  () => {
    console.time('Total');
    console.log('-- 111 Start');
    mainSleep(20);
    console.log('-- 111 END');
  },
  () => {
    console.log('-- 22222 Start');
    mainSleep(20);
    console.log('-- 22222 END');
  },
  () => {
    console.log('-- 33333333 Start');
    mainSleep(20);
    console.log('-- 33333333 END');
    console.timeEnd('Total');
  },
];

requestIdleCallback(workLoop, {
  timeout: 800,
});

/**
 * @param { IdleDeadline } deadline
 */
function workLoop(deadline) {
  console.time('workLoop');
  console.log('requestIdleCallback cb---', `本帧剩余时间:${deadline.timeRemaining()} - 是否超时:${deadline.didTimeout}`);

  // // 有空闲就执行。 没有空闲就交给浏览器控制，在下一个空闲时机
  // if ((obj.timeRemaining() > 0 || obj.didTimeout) && works.length) {
  //   performUnitOfWork();
  // }

  // timeRemaining()  是动态的。每一次执行一个任务，再次获取都是动态的。
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && works.length) {
    performUnitOfWork();
  }

  if (works.length) {
    requestIdleCallback(workLoop, { timeout: 800 });
  }

  console.timeEnd('workLoop');
}

function performUnitOfWork() {
  works.shift()();
}
