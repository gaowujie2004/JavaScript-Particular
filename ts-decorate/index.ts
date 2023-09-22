function ClassDecorate() {
  console.log("classDecorate: factory call");

  return function (Target: Function) {
    return class Wrapper {
      constructor() {
        //
      }
    };
  };
}
//------------------------------------------- 方法装饰器
function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first decorate", target, propertyKey, descriptor);
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second decorate");
  };
}

//------------------------------------------- 参数装饰器
function params() {
  console.log("params(): factory evaluated");
  return function paramDes(
    target: Object,
    methodName: any,
    parameterIndex: any
  ) {
    console.log("param 装饰器: ", target, methodName, parameterIndex);
  };
}

// ？属性装饰器
function property() {
  console.log("property(): factory evaluated");
  return function paramDes(target: Object, key: any) {
    console.log("property decorate: ", target, key);
  };
}

// @ClassDecorate()
// class ExampleClass {
// @property()
// uname = 'gwj';
// @first()
// @second()
// getTest(@params() id: string) {}
// static getStatic(@params() id: string) {}
// }

function add(num) {
  return function addDecorator(
    target: Object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log("addDecorator", target, methodName, descriptor);
    const originValue = descriptor.value;
    descriptor.value = function wrapperAddDecorator(...args) {
      return originValue.apply(this, args) + num;
    };
  };
}

function mul(num) {
  return function mulDecorator(
    target: Object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log("mulDecorator", target, methodName, descriptor);
    const originFn = descriptor.value;
    descriptor.value = function wrapperMulDecorator(...args) {
      return originFn.apply(this, args) * num;
    };
  };
}

class Test {
  @add(2)
  @mul(3)
  getNum() {
    return 10;
  }
}

let t = new Test();
console.log(t.getNum());
