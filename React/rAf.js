let mainSleep = function (duration = 1000) {
  let date = Date.now();
  while (Date.now() - date <= duration) {
    //
  }
};

const works = [
  () => {
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
  },
];

requestIdleCallback(workLoop, {
  timeout: 800,
});

/**
 * @param { IdleDeadline } obj
 */
function workLoop(obj) {
  console.time('workLoop');
  console.log('requestIdleCallback cb---', `本帧剩余时间:${obj.timeRemaining()} - 是否超时:${obj.didTimeout}`);
  while (works.length) {
    performUnitOfWork();
  }
  console.timeEnd('workLoop');
}

function performUnitOfWork() {
  works.shift()();
}
