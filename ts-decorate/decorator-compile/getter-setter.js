function MaxLength(maxLength) {
  return function (target, key, descriptor) {
    //
  };
}
class User {
  constructor() {
    this.password = "gaowujie2004";
  }
  get passwordCrypt() {
    return this.password;
  }
  set passwordCrypt(value) {
    this.password = value;
  }
}
__decorate([MaxLength(6)], User.prototype, "passwordCrypt", null);
let u1 = new User();
u1.password;
