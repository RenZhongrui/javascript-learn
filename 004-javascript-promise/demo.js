/**
 * create: Ren Zhongrui
 * date: 2019-12-18
 * description: promise的使用
 */
const fs = require('fs');
const path = require('path');
let file1 = path.join(__dirname, './name.txt');
let file2 = path.join(__dirname, './age.txt');

function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', function (error, data) {
            if (!error) {
                resolve(data);
            } else {
                reject(error);
            }
        })
    })
}

/**
 * promise的使用特点
 * 1、如果一个promise的then方法中（成功和失败）返回结果是一个promise，那么会自动执行这个返回的promise
 * 2、自动执行完之后，会采用他的状态返回到外层的下一个then方法中
 * 3、如果error中返回的不是一个promise(error中默认返回的是undefined),则会将结果返回到外层的下一个的then的成功回调中
 * 4、结束error的下一次传递需要返回一个空的promise, return new Promise(()=>{});
 * 5、如果then中有error回调，则会优先执行error回调，如果没有就会走到cache中
 */
// 多层嵌套
read(file1).then(data => {
    return read(data);
}, error => {
    console.log(error)
}).then(data => {
    console.log(data)
}, error => {
    console.log(error)
    // error中默认返回的是undefined
}).then(data=>{
    console.log(data) // 返回上一次的error信息
})

// 终止error的下一次传递
read(file1).then(data => {
    return read(data);
}, error => {
    console.log(error)
}).then(data => {
    console.log(data)
}, error => {
    console.log(error)
    return new Promise(()=>{}); // 返回空的promise则终止传递
}).then(data=>{
    console.log(data) // 不会返回上一次的error信息
}).catch(error => {

});

// error和catch
read(file1).then(data => {
    return read(data+"1");
}, error => {
    console.log(error)
}).then(data => {

}, error=> {
    // 优先走error，走了error就不走catch
    console.log(error)
}).catch(error => {
    console.log("catch:"+error)
});

