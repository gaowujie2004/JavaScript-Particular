var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function ClassDecorate() {
    console.log("classDecorate: factory call");
    return function (Target) {
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
    return function (target, propertyKey, descriptor) {
        console.log("first decorate", target, propertyKey, descriptor);
    };
}
function second() {
    console.log("second(): factory evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("second decorate");
    };
}
//------------------------------------------- 参数装饰器
function params() {
    console.log("params(): factory evaluated");
    return function paramDes(target, methodName, parameterIndex) {
        console.log("param 装饰器: ", target, methodName, parameterIndex);
    };
}
// ？属性装饰器
function property() {
    console.log("property(): factory evaluated");
    return function paramDes(target, key) {
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
    return function addDecorator(target, methodName, descriptor) {
        console.log("addDecorator", target, methodName, descriptor);
        const originValue = descriptor.value;
        descriptor.value = function wrapperAddDecorator(...args) {
            return originValue.apply(this, args) + num;
        };
    };
}
function mul(num) {
    return function mulDecorator(target, methodName, descriptor) {
        console.log("mulDecorator", target, methodName, descriptor);
        const originFn = descriptor.value;
        descriptor.value = function wrapperMulDecorator(...args) {
            return originFn.apply(this, args) * num;
        };
    };
}
class Test {
    getNum() {
        return 10;
    }
}
__decorate([
    add(2),
    mul(3)
], Test.prototype, "getNum", null);
let t = new Test();
console.log(t.getNum());
