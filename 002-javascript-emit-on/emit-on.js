/**
 * create: Ren Zhongrui
 * date: 2019-11-10
 * description: 发布订阅工具
 */
class EmitOn {
    constructor() {
        this._arr = [];
    }
    // 监听每一个订阅者，并触发on函数
    on(fn) {
        this._arr.push(fn);
    }
    // 订阅，遍历数组中的函数并执行每一个函数
    emit(result) {
        this._arr.forEach(fn => fn(result));
    }
}
export default EmitOn;