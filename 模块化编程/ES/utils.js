console.log('utils.js 被引用 ')
export var a = 20

import { b } from '/b.js'

setInterval(_ => {
  a++
}, 1000)