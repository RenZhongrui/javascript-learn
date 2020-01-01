const PENDING = "PENDING";
const RESOLVE = "RESOLVE";
const REJECTED = "REJECTED";

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined; // 成功的值
        this.reason = undefined; // 失败的原因
        this.onResolveCallbacks = []; // 成功回调数组，用于多个then的时候
        this.onRejectedCallbacks = []; // 失败回调数组
        // 成功函数
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                // 更改当前状态
                this.status = RESOLVE;
                this.onResolveCallbacks.forEach(fn => fn());
            }
        }
        // 失败函数
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                // 更改当前状态
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);// 默认执行器会立刻执行
        } catch (e) {
            reject(e); //  执行的时候报错则相等于调用reject
        }

    }

    resolvePromise(x, promise2, resolve, reject) {
        // 如果x和promise2是同一个，则返回一个类型错误
        let called; // 防止多次调用成功或失败
        if (x === promise2) {
            return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
        }
        // X是一个对象或者函数
        if (typeof x === 'object' && x !== null || typeof x === 'function') {
            try {
                let then = x.then; // 取then有可能会出错，then有可能是别的promise的或者不存在
                if (typeof then === 'function') { // 认为then是一个函数，即x为promise
                    then.call(x, y => { // 不用x.then()，能保证不用再次取值 then.call(x)即 x.then.call(x)
                        // resolve(y); // 如果x是一个promise，则将结果resolve，错误reject，传递给下一个then
                        // 如果y还是一个promise，则需要递归，直到解析出来是一个普通值
                        if (called) {
                            return;
                        }
                        called = true;
                        this.resolvePromise(y, promise2, resolve, reject);
                    }, r => {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject(r);
                    });
                } else {
                    resolve(x); // 说明x是一个普通对象，直接成功即可
                }
            } catch (e) {
                if (called) {
                    return;
                }
                called = true;
                reject(e);
            }
        } else {
            // x是一个普通值
            resolve(x);
        }

    }

    then(onFulfilled, onRejected) {
        // onFulfilled onRejected是可选参数，如p.then().then(()>{})
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
        onRejected = typeof onRejected === 'function' ? onRejected : error => {
            throw error
        };
        // 2.1 为了then返回到下一个then传值,并链式调用，例如：
        /*  new Promise((resolve, reject) => {

           }).then(data => {
               return data;
           }).then(data=> {

           })*/
        // 2.2
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVE) {
                // 2.4 这里会报错，先执行的是new Promise，然后才有了promise2对象，所以promise2直接传会是undefined，需要异步处理
                setTimeout(() => {
                    // 2.4外部的try catch只能捕获同步异常，异步内需要加一个try catch‘
                    try {
                        // 2.3
                        let x = onFulfilled(this.value);
                        this.resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                // 2.4
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                // 如果是异步就订阅好，等调用onResolve的时候，再全部执行数组中的方法
                this.onResolveCallbacks.push(() => {
                    // todo something
                    // 2.4
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            this.resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    // 2.4
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            this.resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            }
        });
        return promise2;
    }
}

function isPromise(value) {
    if (typeof value === 'object' && value!==null || typeof value === 'function') {
        if (typeof value.then === 'function') {
            return true;
        }
    }
    return false;
}
// 封装 Promise.all方法
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let result = []; // 存放返回值
        let counter = 0; // 计数器，用于判断异步完成
        function processData(key, value) {
            result[key] = value;
            // 每成功一次计数器就会加1，直到所有都成功的时候会与values长度一致，则认定为都成功了，所以能避免异步问题
            if (++counter === values.length) {
                resolve(result);
            }
        }
        // 遍历 数组中的每一项，判断传入的是否是promise
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            // 如果是promise则调用获取data值，然后再处理data
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data);
                }, reject);
            } else {
                // 如果不是promise，传入的是普通值，则直接返回
                processData(i, current);
            }
        }
    });
}

// 延迟对象，
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;