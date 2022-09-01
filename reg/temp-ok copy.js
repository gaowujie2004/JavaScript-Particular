let str =
  "多个链接，带混淆 [[[[链接1]](https://www.baidu.com)  ]]  [[][[链接2](https://www.google.com) 哈哈哈哈哈哈哈";

let arr = [
  "多个链接，带混淆[[",
  "[[链接1]](https://www.baidu.com)",
  "]][[][",
  "[链接2](https://www.google.com)",
  "哈哈哈哈哈哈哈",
];

// let reg1 = / \[ [\s\S]+?  \]       \([\w:\/.-]+?\)   /;
let reg1 = /\[[\s\S]+?\]\([\w:\/.-]+?\)/g;
resList = str.match(reg1);

let strArr = [];
resList.forEach((findStr) => {
  const startIndex = str.indexOf(findStr);
});

// 重点看这个
console.log(resList);
