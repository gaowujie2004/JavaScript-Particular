let str =
  "多个链接，带混淆 [[[[链接1]](https://www.baidu.com)  ]]  [[][[链接2](https://www.google.com) 哈哈哈哈哈哈哈";

let arr = [
  "多个链接，带混淆[[",
  "[[链接1]](https://www.baidu.com)",
  "]][[][",
  "[链接2](https://www.google.com)",
  "哈哈哈哈哈哈哈",
];

let reg1 = /\[[^(]+?\([\w:\/.-]+?\)/;
res = str.match(reg1);

console.log(res);
