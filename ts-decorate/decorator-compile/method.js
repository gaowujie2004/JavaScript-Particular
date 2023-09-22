// class C {
//   @logger
//   add(x: number, y: number) {
//     return x + y;
//   }
// }

function logger(target, propertyKey, descriptor) {
  const original = descriptor.value;
  descriptor.value = function change(...args) {
    console.log("params: ", ...args);

    const result = original.call(this, ...args);

    console.log("result: ", result);
    return result;
  };
}

var C = (function () {
  function C() {}
  C.prototype.add = function (x, y) {
    return x + y;
  };

  // 4个参数
  __decorate([logger], C.prototype, "add", null);
  return C;
})();

var c1 = new C();
c1.add(1, 2);
