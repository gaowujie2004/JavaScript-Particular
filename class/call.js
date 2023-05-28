// ES6 extends 用的并不是在子类构造函数内部 father.call(this, ...args)；
// 对于用户定义的类是可以的，但是如 Array、REGEXP 这类，使用该方法不行。

/**================================== 原因如下： **/
// 用户定义的
function Father() {
  this.fname = 'father';
}
function Son(...args) {
  this.sname = 'son';
  Father.call(this, ...args);
}
Son.prototype.__proto__ = Father.prototype;

// fname  sname 最后都在一个对象内部。

// 但原生的类，这种方式不行
function Son2() {
  this.name = 'son2';
  Array.call(this, 1, 2, 3, 4); // TODO, 并不会改变Array内部的this，正是因为这个原因，所以统一类继承不使用 call、allay寄生继承
}
