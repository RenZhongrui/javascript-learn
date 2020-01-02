/**
 * create: Ren Zhongrui
 * date: 2020-01-01
 * description: finally的使用或实现原理
 */
const Promise = require('./promise');

let p = new Promise((resolve, reject) => {
    resolve(1000);
})
/*p.then(data => {
    console.log("success2:" + data)
}).finally(() => {
    console.log("finally")
})*/
let p2 = p.then(data => {
    console.log("success1:" + data)
       return new Promise((resolve, reject)=> {
           setTimeout(()=> {
               resolve(data)
           },2000)
       });
}).finally(() => {
    console.log("finally")
})
