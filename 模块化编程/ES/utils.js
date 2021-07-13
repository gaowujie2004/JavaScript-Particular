console.log('utils 被执行')

function Utils() {
  this.count = 1
}

Utils.prototype.addCount = function() {
  this.count++
}
// 这样也是单例模式。 我的猜测

export var a = 4
export function changeA() {
  a++
}