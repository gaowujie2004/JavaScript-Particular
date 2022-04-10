// 节点对象
class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload;
    this.nextUpdate = nextUpdate;
  }
}

class UploadQueue {
  constructor() {
    this.baseState = null;

    // 指向节点对象
    this.firstUpdate = null;
    this.lastUpdate = null;
  }

  enQueue(update) {
    /**
     * 1、判断是空链表
     *      如果是则 首尾一致
     * 2、非空链表
     *      1. lastUpdate.nextUpdate = update —— 此时 lastUpdate（相对于新入队的 update 是旧的）
     *      2. lastUpdate = update;
     */

    if (this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = update;
    } else {
      this.lastUpdate.nextUpdate = update;
      this.lastUpdate = update;
    }
  }

  // 获取老状态，遍历链表
  forceUpdate() {
    let currentState = this.baseState || {}; // 初始状态

    let currentUpdate = this.firstUpdate; // 指针，指向初始的，用于遍历, 向后移动
    while (currentUpdate) {
      const nextState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(currentState) : currentUpdate.payload;

      currentState = { ...currentState, ...nextState };
      currentUpdate = currentUpdate.nextUpdate;
    }

    this.baseState = currentState;
    this.firstUpdate = this.lastUpdate = null;

    return currentState;
  }
}

const testQueue = new UploadQueue();

testQueue.enQueue(new Update({ name: 'GWJ' }));
testQueue.enQueue(new Update({ number: 0 }));
testQueue.enQueue(new Update((state) => ({ number: state.number + 1 })));
testQueue.enQueue(new Update((state) => ({ number: state.number + 1 })));

console.log('--', testQueue.forceUpdate());
