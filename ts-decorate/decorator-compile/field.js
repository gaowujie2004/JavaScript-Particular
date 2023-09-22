function MinLength(minLength) {
  return function (target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
      get() {
        // 若是还是 this[properKey]=value，则会导致无限递归
        return this[`_${propertyKey}`];
      },
      set(value) {
        if (!value || value.length < minLength) {
          throw new Error(`length must be greater than ${minLength}`);
        }
        // 若是还是 this[properKey]=value，则会导致无限递归
        this[`_${propertyKey}`] = value;
      },
    });
  };
}

class User {
  constructor() {
    this.password = "gaowujie2004";
  }
}

// prettier-ignore
__decorate(
  [MinLength(3)], 
  User.prototype, 
  "password", 
  void 0
);
let u1 = new User();
u1.password;
