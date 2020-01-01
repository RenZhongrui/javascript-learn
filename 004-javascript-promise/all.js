/**
 * create: Ren Zhongrui
 * date: 2019-12-28
 * description: Promise.all 等待所有的请求都完成，再返回结果
 */
const Promise = require('./promise');
const fs = require('fs');
const path = require('path');
let file1 = path.join(__dirname, './name.txt');
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

Promise.all([1, read2(file1), 3]).then(data => {
    console.log(data)
})
