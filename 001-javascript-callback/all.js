/**
 * create: Ren Zhongrui
 * date: 2019-11-09
 * description:
 */
const fs = require('fs');
const path = require('path');
let file1 = path.join(__dirname, './name.txt');
let file2 = path.join(__dirname, './age.txt');
console.log("返回文件绝对路径：" + file1)
let result1 = {};
fs.readFile(file1, 'utf8', function (error, name) {
    console.log(name)
    result1.name = name;
    fs.readFile(file2, 'utf8', function (error, age) {
        console.log(age)
        result1.age = age;
        console.log("串行执行结果：" + JSON.stringify(result1));
    })
})

function after(times, callback) {
    let result = {};
    return function (key, value) {
        result[key] = value;
        if (--times === 0) {
            callback(result);
        }
    }
}

// 公共处理异步方式
let out = after(2, function (result) {
    console.log("回调方式：" + JSON.stringify(result));
})

fs.readFile(file1, 'utf8', function (error, name) {
    out("name", name);
})

fs.readFile(file2, 'utf8', function (error, age) {
    out("age", age);
})

