/**
 * create: Ren Zhongrui
 * date: 2019-12-12
 * description: 观察者模式
 * 观察者和被观察者之间是有关系的，需要将观察者绑定到被观察者上，
 * 当被观察者状态改变了，会通知观察者更新被观察者的状态
 *
 */

class Watcher {

    constructor(name) {
        this.name = name;
    }

    update(newState) {
        console.log("播报员：" + this.name);
        console.log("今天天气：" + newState);
    }
}

class Subject {
    constructor() {
        this.state = "晴天";
        this._arr = [];
    }

    // 绑定观察者，将观察者放到数组中存储
    attach(oberver) {
        this._arr.push(oberver);
    }

    // 更新被观察者的状态
    setState(newState) {
        this.state = newState;
        this._arr.forEach(o => o.update(newState));
    }
}
let watcher1 = new Watcher("一号天气观察员");
let watcher2 = new Watcher("二号天气观察员");
let subject = new Subject();
subject.attach(watcher1);
subject.attach(watcher2);
subject.setState("下雨");