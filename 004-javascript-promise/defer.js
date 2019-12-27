/**
 * create: Ren Zhongrui
 * date: 2019-12-28
 * description: 延迟对象，减少嵌套调用用
 */
const Promise = require('./promise');
const fs = require('fs');
const path = require('path');
let file1 = path.join(__dirname, './name.txt');

// 平时写法
function read1(url) {
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
// defer写法 延迟对象，减少嵌套调用用
function read2(url) {
    let dfd = Promise.defer();
    fs.readFile(url, 'utf8', function (error, data) {
        if (!error) {
            dfd.resolve(data);
        } else {
            dfd.reject(error);
        }
    })
    return dfd.promise;
}
read2(file1).then((data)=> {
    console.log(data)
})
