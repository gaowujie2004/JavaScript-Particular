function ClassDecorate() {
  console.log('classDecorate(): factory evaluated');
  return function (target: Function) {
    console.log('classDecorate(): called');
  };
}
//------------------------------------------- 方法装饰器
function first() {
  console.log('first(): factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('first decorate', target, propertyKey, descriptor);
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('second decorate');
  };
}

//------------------------------------------- 参数装饰器
function params() {
  console.log('params(): factory evaluated');
  return function paramDes(target: Object, methodName: any, parameterIndex: any) {
    console.log('param 装饰器: ', target, methodName, parameterIndex);
  };
}

// ？属性装饰器
function property() {
  console.log('property(): factory evaluated');
  return function paramDes(target: Object, key: any) {
    console.log('property decorate: ', target, key);
  };
}

@ClassDecorate()
class ExampleClass {
  @property()
  uname = 'gwj';

  @first()
  @second()
  getTest(@params() id: string) {}

  static getStatic(@params() id: string) {}
}

function ValidRange(min: number, max: number) {
  return (target: Object, key: string) => {
    console.info(`%c🇨🇳`, 'font-size:25px;color:deeppink;', target);

    Object.defineProperty(target, key, {
      get() {
        console.log('get this: ', this);
        return this['__@*@__' + key];
      },
      set(v: number) {
        if (v < min || v > max) {
          throw new Error('InvalidRange');
        }

        Reflect.set(this, '__@*@__' + key, v);
        console.log('set this: ', this);
      },
    });
  };
}

type S = ClassDecorator;

// 输出 Installing ValidRange on year
class Student {
  @ValidRange(1920, 2020)
  year!: number;

  getYear() {}
}
const stud = new Student();

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('--configurable decorate', target, property, descriptor);
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  @configurable(false)
  set y(v) {
    this._y = v;
  }
}
const p1 = new Point(1, 2);
