function __decorate(decorators, target, key, desc) {
  let paramNumber = arguments.length;
  let decoratorFn;
  let ret;
  if (paramNumber < 3) {
    // 类装饰器
    ret = target;
  } else {
    if (desc === null) {
      // 属性装饰器
      desc = Object.getOwnPropertyDescriptor(target, key);
    }
    ret = desc;
  }

  if (typeof Reflect.decorate === "function") {
    ret = Reflect.decorate(decorators, target, key, desc);
  } else {
    let originRet = ret;
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
  }

  // 方法、参数、存取器装饰器
  if (paramNumber > 3 && ret) {
    Object.defineProperty(target, key, ret);
  }
  return ret;
}

/**================================== 使用方 **/
function logger(target, propertyKey, descriptor) {
  const original = descriptor.value;
  descriptor.value = function change(...args) {
    console.log("params: ", ...args);

    const result = original.call(this, ...args);

    console.log("result: ", result);
    return result;
  };
}

/** @class */
var C = (function () {
  function C() {}
  C.prototype.add = function (x, y) {
    return x + y;
  };

  __decorate([logger], C.prototype, "add", null);
  return C;
})();

var c1 = new C();
c1.add(1, 2);
