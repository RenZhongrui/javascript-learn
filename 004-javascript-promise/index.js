/**
 * create: Ren Zhongrui
 * date: 2019-12-16
 * description:
 */
let Promise = require('./promise');
let promise1 = new Promise((resolve,reject) =>{
    resolve("success");
});
/*let promise2 = promise1.then(data => {
    throw new Error("dd");
});
promise2.then(data => {
    console.log(data);
}, error =>{
    console.log("error:"+error)
});*/

let promise2 = promise1.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject)=>{
                resolve(9999)
            }));
        }, 1000);
    });
});
promise2.then(data => {
    console.log(data);
}, error =>{
    console.log("error:"+error)
});