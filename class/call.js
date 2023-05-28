// ES6 extends 用的并不是在子类构造函数内部 father.call(this, ...args)；
// 对于用户定义的类是可以的，但是如 Array、REGEXP 这类，使用该方法不行。

// 原因如下：

// 用户定义的
function Father() {
  this.fname = 'father';
}
function Son(...args) {
  Father.call(this, ...args);
}
Son.prototype.__proto__ = Father.prototype;
