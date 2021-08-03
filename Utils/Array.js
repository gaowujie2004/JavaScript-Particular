/**
 * Array.prototype
*/





/**
 * 数组扁平化
*/
let arr = [1,2, [3,4, [5,6, [7,8, null, undefined,[9]]]], 90 ];
Array.prototype._flat = function() {  // 递归
  var oldArr = this
  var resArr = []

  function fun(arr) {
    if( !Array.isArray(arr) ) { //不是数组
      return resArr.push(arr)
    }

    // arr是数组
    arr.forEach(fun)
  }

  fun(oldArr)
  return resArr
}

Array.prototype._flat2 = function() {  // 对上一个的简写
  var oldArr = this
  var resArr = []
  var fun = arr=> Array.isArray(arr)? arr.forEach(fun) : resArr.push(arr)

  fun(oldArr)
  return resArr
}

// console.log(arr._flat2());








