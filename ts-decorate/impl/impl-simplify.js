function __decorate(decorators, target, key, desc) {
  let paramNumber = arguments.length;
  let ret;
  if (paramNumber < 3) {
    // 类装饰器
    ret = target;
  } else {
    if (desc === null) {
      // 方法装饰器、参数装饰器函数、存取器装饰器
      desc = Object.getOwnPropertyDescriptor(target, key);
    } else {
      // 成员装饰器
    }
    ret = desc;
  }

  let originRet = ret;
  let decoratorFn;
  for (let i = decorators.length - 1; i >= 0; i--) {
    decoratorFn = decorators[i];
    if (!decoratorFn) {
      continue;
    }

    if (paramNumber < 3) {
      // 类装饰器
      ret = decoratorFn(ret);
    } else {
      if (paramNumber > 3) {
        // 方法、参数、存取器装饰器函数
        ret = decoratorFn(target, key, ret);
      } else {
        // 属性装饰器
        ret = decoratorFn(target, key);
      }
    }

    ret ||= originRet;
  }

  // 方法、参数、存取器装饰器
  if (paramNumber > 3 && ret) {
    Object.defineProperty(target, key, ret);
  }
  return ret;
}

function __param(paramIndex, decoratorFn) {
  return function (target, key) {
    // 返回值无效
    decoratorFn(target, key, paramIndex);
  };
}
