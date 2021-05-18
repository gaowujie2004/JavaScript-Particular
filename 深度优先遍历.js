let obj = {
  a: {
    b: {
      c: 'c '
    },
    h: 'hhh'
  },
  d: 1,
  e: 2
}
let outObj = {}

// 深度优先遍历. 扁平Object 集合数据结构(键值对
let arr = [ 1,2, [3, [4,5] ], [-111] ]
let out = []
// function goArr(arr) {
//   if (Array.isArray(arr)) {
//     for (var el of arr) {
//       goArr(el)
//     }
//     return
//   }
//   out.push(arr)
// }
// goArr(arr)

function goObj(val, outkey) {
  if (Object.prototype.toString.call(val) === '[object Object]') {
    for (var key of Object.keys(val)) {
      goObj(val[key], key)
    }
    return
  }

  console.log('不是对象', val)
  outObj[outkey] = val       
}
goObj(obj)