/**
 * create: Ren Zhongrui
 * date: 2019-11-09
 * description: 发布订阅模式
 */
const fs = require("fs");
const path = require("path");
let event = {
    _arr: [], // 定义一个数组来存储函数
    on(fn) { // 监听每一个订阅者，并触发on函数
        this._arr.push(fn);
    },
    emit(result) { // 订阅，遍历数组中的函数并执行每一个函数
        this._arr.forEach(fn => fn(result));
    }
}
let res = {};
// 所有emit订阅的函数都会触发on方法
event.on(function (result) {
    console.log(result)
    if (Object.keys(res).length === 2) {
        console.log("请求完成")
    }
})

fs.readFile(path.join(__dirname, 'name.txt'), "utf8", function (error, data) {
    res.name = data;
    event.emit(data);
})

fs.readFile(path.join(__dirname, 'age.txt'), "utf8", function (error, data) {
    res.age = data;
    event.emit(data);
})


