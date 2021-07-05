// console.log( new Blob([1,2,3,4,5,6]) )
const fs = require('fs')
let buf = fs.readFileSync('./test.avi')





// CDN . 客户端访问中心服务器, 经过DNS解析, 此时会判断客户端的地理位置, 返回离客户端
// 最近的服务器IP地址. 而非中心服务器IP地址