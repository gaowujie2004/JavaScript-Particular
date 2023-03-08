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
  const result = new Array(...args);
  result.__proto__ = MyArray.prototype; // Object.setPrototypeOf(result, MyArray.prototype);
  MyArray.prototype.__proto__ = Array.prototype; // Object.setPrototypeOf(MyArray.prototype, Array.prototype);

  result.type = 'Array hhhh';
  return result;
}
MyArray.prototype.getLength = function () {
  console.log('getLength:', this.length);
};

class MyArray2 extends Array {
  constructor(...args) {
    const res = super(...args);
    this.type = 'gaoWuJie';
    console.log('看看', res === this);
  }

  getLength() {
    console.log('getLength: ', this.length);
  }
}

console.log('MyArray: ', new MyArray(1, 2, 3, 4));
console.log('MyArray2: ', new MyArray2(1, 2, 3, 4));
