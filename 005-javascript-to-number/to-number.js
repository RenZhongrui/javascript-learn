// 字符串转成数字
let a = "0";
console.log(typeof Number(0)); // 普通写法
console.log(typeof +a);

let b = "0";
// 字符串转成布尔
console.log(!!b); // 字符串永远为true
console.log(!!+b); // 先转成数字，再转为bool类型，字符串0就转为了false