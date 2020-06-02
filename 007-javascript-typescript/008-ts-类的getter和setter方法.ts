class Person {
    constructor(private _name: string) {
    }

    // 定义get方法
    get name() {
        return this._name + "get";
    }

    // 定义set方法
    set name(name: string) {
        this._name = name;
    }
}

let per = new Person("tim");
let names = per.name; // 调用getName方法 不能加括号
console.log(names)
per.name = "hello";
let names2 = per.name;
console.log(names2) // 打印的是helloget，没有改变_name的值
