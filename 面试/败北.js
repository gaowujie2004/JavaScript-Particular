// 不存在目标创建.   存在时 push进去


let res = [
  {
    name: 'bob',
    like: [1, 2]
  },
  {
    name: 'dog',
    like: [1, 3]
  },
  {
    name: 'pig',
    like: [2]
  },
]

let obj = {}
res.forEach(item => {
  item.like.forEach(likeI => {
    if (obj[likeI]) {
      obj[likeI].push(item.name)
    } else {
      obj[likeI] = [item.name]
    }
  })
})

let xx = res.reduce((temp, obj) => {
  obj.like.forEach(likeV => {
    temp[likeV] ? temp[likeV].push(obj.name) : temp[likeV]=[obj.name]
  })
  return temp
}, {})



let data = {
  1: ['bob', 'dog'],
  2: ['bob', 'pig'],
  3: ['dog', 'gwj', 'bob']
}

// res ==> [
//       {
//          name: 'bob',
//          like: [1,2]
//       }
// ]

let xxxx = []

// 优化
let xxxxx = Object.keys(data).reduce((resArr, likeI) => {
  data[likeI].forEach(likeV => {
    // 存在返回, 对象. 否则 null
    
    let okIndex = resArr.findIndex(obj => obj.name === likeV)
    if (okIndex === -1) {
      resArr.push({name: likeV, like: [likeI]})
      
    } else {
      resArr[okIndex].like.push( likeI )
    }
  })

  return resArr
}, [])
console.log(xxxxx)

process.exit()


for (let likeI in data) {
  data[likeI].forEach((itemN, i) => {
    let okI = xxxx.findIndex(obj => obj.name===itemN)
    if (okI === -1) {
      xxxx.push( {name: itemN, like: [likeI]} ) 
    } else {
      // 存在
      xxxx[okI].like.push(likeI)
    }
  })
}
console.log( xxxx )