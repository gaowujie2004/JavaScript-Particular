/*-----------------------------------------------*
 *                                               *
 *              我觉得，这不是最终的代码             *
 *              fiber.type 是函数                 *
 *              应该会调用这个函数                  *
 *                                               *
 *-----------------------------------------------*/

const rootFiber = require('./element');

let nextUnitOfWork = null; // 下一个 任务单元。 先把下一个任务单元取出来，这样恢复的时候好恢复。

function workLoop(deadline) {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 没有当前帧没有剩余时间了。
  if (nextUnitOfWork) {
    // 交给浏览器调度
    requestIdleCallback(workLoop, { timeout: 1000 });
  } else {
    // 没有了
    console.log('-- render 阶段结束');
  }
}

// 执行一个 最小任务单元 - 并返回下一个需要执行的任务
function performUnitOfWork(fiber) {
  // 处理此 fiber
  beginWork(fiber);

  if (fiber.child) {
    return fiber.child;
  } // 如果没有说明此 fiber 已完成???

  while (fiber) {
    completeWork(fiber);
    if (fiber.sibling) {
      return fiber.sibling;
    }
    fiber = fiber.return;
  }
}

function beginWork(fiber) {
  console.log('-- 开始', fiber.key);
}

function completeWork(fiber) {
  console.log('-- 结束', fiber.key);
}

nextUnitOfWork = rootFiber;

workLoop();
