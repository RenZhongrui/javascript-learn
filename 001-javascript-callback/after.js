/**
 * create: Ren Zhongrui
 * date: 2019-11-09
 * description: 多层回调函数嵌套
 */
function after(times, callback) { // 闭包，执行上下文没有被销毁
    // AO = {times} times的词法作用域是after函数，所以每次调用fn其实调用的是return中的函数，所以times只赋值一次
    return function (fn) {
        if (--times === 0) {
            callback();
        }
    }
}

/**
 * fn 每次被调用的时候，调的是这个函数：
 return function (fn) {
    if (--times === 0) {
        callback();
    }
}
 在调用这个函数的时候，times变量的词法作用域是不变的，所以不会被重新赋值，所以只能执行3次后只执行一次
 * @type {Function}
 */
let fn = after(3, function () {
    console.log("fn调用3次后才执行");
})
fn();
fn();
fn();
fn();
fn();
fn();
fn();




