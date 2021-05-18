class Utils {
  // 实例属性新写法
  typeList = [ 
    'Null', 'Undefined', 'Number', 'String', 'Boolean', 'Symbol', 'BigInt', //7种基本类型值
    'Object', 'Function', 'Array', 'Date', 'RegExp','Set', 'Map', 'Promise',
    'AsyncFunction', 'GeneratorFunction' 
  ]

  // 构造函数
  constructor() {
    this.typeList.forEach(item => {
      this['is' + item] = function(v){
        return Object.prototype.toString.call(v) === '[object ' + item +']'
      }
    })
    
    Object.seal(this)
  }

  // 继承方法 - 原型链
  getType(v) {
    // return: Set| Array | ....
    return Object.prototype.toString.call(v).slice(8, -1)
  }

  // isType({}, 'Object')
  isType(target, typeStr) {
    // 严格遵守 驼峰命名法
    return Object.prototype.toString.call(target) === `[object ${typeStr}]`
  }

  deepClone(obj) {
    // 基本类型值 以及函数对象
    if (obj===null || typeof obj!=='object') {
      return obj
    }

    if ( this.isDate(obj) ) {
      return new Date(obj.getTime())
    }

    if ( this.isRegExp(obj) ) {
      return new RegExp(obj)
    }

    // 特殊结构
    if ( this.isSet(obj) ) {
      let resValue = []
      for (let value of obj) {
        resValue.push( this.deepClone(value) )
      }
      return new Set(resValue)
    }


    // 数组结构 - 特殊
    if ( this.isArray(obj) ) {
      let resValue = []
      for (let v of obj) {
        resValue.push( this.deepClone(v) )
      }
      return resValue
    }
    
    // 普通对象 - 特殊
    if ( this.isObject(obj) ) {
      let resValue = {}

      // 获取自身属性 + Symbol
      let keys = Reflect.ownKeys(obj)
      for (let key of keys) {
        resValue[key] = this.deepClone(obj[key])
      }

      return resValue
    }
  }

  // 注意: Promise.reject(0)   失败值是0  //判断是 if (err===null) 
  async errorCapture(x, ...args) {
    /**
     * return { promise }: 值是一个数组
    */

    if (this.isAsyncFunction(x) || this.isFunction(x)) {
      let res = await x(...args).then(val => [null, val], err => [err, null])
      return res
    }

    if (this.isPromise(x)) {
      let res = await x.then(val => [null, val], err => [err, null])
      return res
    }

    throw TypeError('x is not a Promise or Async or Function')
  }

  // 采用 promise 的方法
  capture(x, ...args) {
    if (this.isAsyncFunction(x) || this.isFunction(x)) {
      return new Promise(resolve => {
        x(...args).then(
          val => resolve([null, val]), 
          err => resolve([err, null])
        )
      })
    }

    if (this.isPromise(x)) {
      return new Promise(resolve => {
        x.then(
          val => resolve([null, val]), 
          err => resolve([err, null])
        )
      })
    }

    throw TypeError('x is not a Promise or Async or Function')
  }

  asyncSleep(delay=1000) {
    return new Promise(resolve => {
      setTimeout(resolve, delay)
    })
  }
}

let utils = new Utils()

/**
 * 扁平化对象
*/
let obj = {
  a: 1,
  b: 2,
  c: {
    e: 3,
    d: 4
  }
}

Object.prototype._flat = function(){
  var oldObj = this
  var resObj = {}

  function fun(obj) {
    if ( !utils.isObject(obj) ) { // is not Object
      return
    }

    // is Object
    for (var key in obj) {
      if (utils.isObject(obj[key])) {
        // value is Object
        fun(obj[key])
      } else {
        resObj[key] = obj[key]
      }
    }
  }
  fun(oldObj)

  return resObj
}
console.log(obj._flat());


module.exports = utils