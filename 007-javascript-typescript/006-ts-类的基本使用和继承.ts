// 类的基本使用
class Person {
    name = "a";
    getName() {
        return this.name;
    }
}
const p = new Person();
p.getName();

// 类的继承
class Teacher extends Person{
    getTeacherName() {
        return "teacher";
    }
    getName(): string {
        return super.getName()+"ddd";
    }
}
let t = new Teacher();
console.log(t.getName());
console.log(t.getTeacherName());