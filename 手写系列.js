// 数组扁平化
// 栈结构.
Array.prototype._flat1 = function() {
  if (!Array.isArray(this)) { return } // 不是数组
  var res = []

  var fun = function(arr) {
    if (!Array.isArray(arr)) { return res.push(arr) }

    for (let el of arr) {
      fun(el)
    }
  }
  fun(this)
  return res
}

Array.prototype._flat2 = function() {
  let arr = this
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr)
  }
  return arr
}
Array.prototype._flat3 = function() {
  let arr = this
  // 性能不高
  return this.reduce((a, b) => a.concat(Array.isArray(b)?b._flat3():b), [])
}


let arr = [1,2,3, [[[5,6,[[[9]]]]]] ]
// console.log(arr._flat3());



/**
 * 实现 Object.create()
*/
Object._create = (obj, desc)=>{
  var x = {}
  Object.setPrototypeOf(x, obj)
  if (desc !== undefined) {
    Object.defineProperties(x, desc)
  }
}