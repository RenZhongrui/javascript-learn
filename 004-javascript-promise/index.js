/**
 * create: Ren Zhongrui
 * date: 2019-12-16
 * description:
 */
let Promise = require('./promise');
let promise = new Promise((resolve,reject) =>{
    resolve("success");
});
promise.then(data => {
    console.log(data);
});
promise.then(data => {
    console.log(data);
});
promise.then(data => {
    console.log(data);
});