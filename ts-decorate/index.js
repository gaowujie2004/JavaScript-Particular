var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function ClassDecorate() {
    console.log('classDecorate(): factory evaluated');
    return function (target) {
        console.log('classDecorate(): called');
    };
}
//------------------------------------------- 方法装饰器
function first() {
    console.log('first(): factory evaluated');
    return function (target, propertyKey, descriptor) {
        console.log('first decorate', target, propertyKey, descriptor);
    };
}
function second() {
    console.log('second(): factory evaluated');
    return function (target, propertyKey, descriptor) {
        console.log('second decorate');
    };
}
//------------------------------------------- 参数装饰器
function params() {
    console.log('params(): factory evaluated');
    return function paramDes(target, methodName, parameterIndex) {
        console.log('param 装饰器: ', target, methodName, parameterIndex);
    };
}
// ？属性装饰器
function property() {
    console.log('property(): factory evaluated');
    return function paramDes(target, key) {
        console.log('property decorate: ', target, key);
    };
}
var ExampleClass = /** @class */ (function () {
    function ExampleClass() {
        this.uname = 'gwj';
    }
    ExampleClass.prototype.getTest = function (id) { };
    ExampleClass.getStatic = function (id) { };
    __decorate([
        property()
    ], ExampleClass.prototype, "uname", void 0);
    __decorate([
        first(),
        second(),
        __param(0, params())
    ], ExampleClass.prototype, "getTest", null);
    __decorate([
        __param(0, params())
    ], ExampleClass, "getStatic", null);
    ExampleClass = __decorate([
        ClassDecorate()
    ], ExampleClass);
    return ExampleClass;
}());
function ValidRange(min, max) {
    return function (target, key) {
        console.info("%c\uD83C\uDDE8\uD83C\uDDF3", 'font-size:25px;color:deeppink;', target);
        Object.defineProperty(target, key, {
            get: function () {
                console.log('get this: ', this);
                return this['__@*@__' + key];
            },
            set: function (v) {
                if (v < min || v > max) {
                    throw new Error('InvalidRange');
                }
                Reflect.set(this, '__@*@__' + key, v);
                console.log('set this: ', this);
            },
        });
    };
}
// 输出 Installing ValidRange on year
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.getYear = function () { };
    __decorate([
        ValidRange(1920, 2020)
    ], Student.prototype, "year", void 0);
    return Student;
}());
var stud = new Student();
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        console.log('--configurable decorate', target, property, descriptor);
        descriptor.configurable = value;
    };
}
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            this._y = v;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        configurable(false)
    ], Point.prototype, "x", null);
    __decorate([
        configurable(false)
    ], Point.prototype, "y", null);
    return Point;
}());
var p1 = new Point(1, 2);
