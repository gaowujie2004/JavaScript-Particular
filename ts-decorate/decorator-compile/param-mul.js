// class C {
//   add(@logger x: number, @logger y: number) {
//     return x + y;
//   }
// }

function logger(target, methodName, paramIndex) {}
class C {
  add(x, y) {
    return x + y;
  }
}
__decorate([__param(0, logger), __param(1, logger)], C.prototype, "add", null);
let c1 = new C();
c1.add(1, 2);
