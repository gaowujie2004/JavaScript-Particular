// function MyRegExp(pattern, flags) {
//   var obj = new RegExp(pattern, flags);
//   obj.__proto__ = MyRegExp.prototype; //重置父类实例的原型，让其为子类构造函数的prototype

//   obj.type = 'MyRegExp';

//   return obj;
// }

// Object.setPrototypeOf(MyRegExp.prototype, RegExp.prototype);
// 上面是错误的

/**================================== 为什么class extends时，构造函数为什么要先调用super，才能使用this的原因如下 **/
function MyArray(...args) {
  const father = new Array(...args);
  const result = Object.create(father);

  result.type = 'Array hhhh';

  return result;
}

// Object.setPrototypeOf(MyArray.prototype, Array.prototype); // 无用代码

//
class MyArray extends Array {
  constructor(...args) {
    const res = super(...args);
    this.type = 'gaoWuJie';
    console.log('看看', res === this);
  }
}
