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
        try{
            executor(resolve,reject);// 默认执行器会立刻执行
        }catch (e) {
            reject(e); //  执行的时候报错则相等于调用reject
        }

    }

    then(onFulfilled, onRejected) {
        if (this.status === RESOLVE) {
            onFulfilled(this.value);
        }
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
        if (this.status === PENDING) {
            // 如果是异步就订阅好，等调用onResolve的时候，再全部执行数组中的方法
            this.onResolveCallbacks.push(()=> {
                // todo something
               onFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(()=> {
                onRejected(this.reason);
            })
        }
    }
}
module.exports = Promise;