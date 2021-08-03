var arr = []

function father() {
  var a = 10
  function fun() {
    console.log(a)
  }
  arr.push( fun )
}


father()

arr[0]()
// arr 第1个元素 就是那个 fun函数.  