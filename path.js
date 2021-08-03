const path = require('path')

// console.log(path.resolve('./test', './1.jpg'));
// console.log(path.join('./test', '/1.jpg'));



// 返回绝对路径, ./相对于  cmd路径
console.log(path.relative(__dirname, '/1.jsp'));

let obj = {
  name: 'gaowujie',
  age: 18
}
let res = JSON.stringify(obj)
  .replace(/{|}/g, '')
  .replace(/,/g, '&')
  .replace(/:/g, '=')
  .replace(/"/g, '')

console.log(res);

