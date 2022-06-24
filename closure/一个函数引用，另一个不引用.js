function father() {
  var f1 = 100;
  var f2 = { name: 'GaoWuJie' };

  globalThis.testObj = { f1, f2 };

  // son1、son2函数在创建时就确定了哪些变量能访问，哪些不能访问。
  // 因为 son1 访问了 f1、f2 ，所以 father 执行完后，father 下的 f1、f2不能被立即回收。
  // son1 访问了 f1 f2，导致 son2 的作用域链上间接保留了 father 下闭包对象
  return {
    son1() {},

    son2() {
      console.log('我就是输出啊');
    },
  };
}
const resFn = father();
