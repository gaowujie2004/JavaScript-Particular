# 装饰器解决什么问题？

# 装饰器

## 1. 类装饰器

## 2. 方法装饰器

## 3. 属性装饰器

## 4. 存取器装饰器

此装饰器函数的入参和方法装饰器一样，在 ES6 class 语法中存取器是「原型对象」的一个属性，并非是「实例对象」的一个属性。

```javascript
class Test {
  get name() {
    return this._name;
  }
  set name(v) {
    this._name = v;
  }
}

t1 = new Test();

Object.getOwnPropertyNames(t1); // -> []

Object.getOwnPropertyNames(Test.prototype); // -> ["constructor", "name"]
```

异同点：在 JS 对象字面量中，存取器是「实例对象」的一个属性。

## 5. 参数装饰器

## 执行顺序

## 总结

方法、存取器因为入参有 descriptor 属性描述对象，所以可以返回或者直接修改 descriptor 属性，即可修改函数的行为。
类、参数装饰器函数没有 descriptor 属性描述对象，不能修改行为
属性装饰器函数，比较特殊。可以修改原型对象的 descriptor 属性描述对象。
