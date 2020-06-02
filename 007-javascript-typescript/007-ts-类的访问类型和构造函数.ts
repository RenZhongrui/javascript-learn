// 类的基本使用
/**
 * private 私有的只能在类内访问
 * protected 可以被本类和子类访问
 * public 可以被所有类访问
 */
class Person {
    protected sayHi() {

    }
    public say() {

    }
    getName() {
        return this.name;
    }
    // 简化写法
    constructor(public name: string) {
        // 相当于声明了一个age属性，并调用this.age = age;赋值
    }
}
const p = new Person("tom");
p.getName();

class Teacher extends Person{
    constructor(public age: number) {
        // 继承父类构造函数
        super("name");
    }

}
