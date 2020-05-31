interface Person {
    name: string,
    age?: number,
    [propName: string]: any; // 表示可以多出一个字符串类型的属性，值是任意类型。
    say(): string // 返回只是string的方法
}

const person = {
    name: "tom",
    //age: 22,
    sex: "male",
    say() {
        return "";
    }
}
function setPerson(person: Person): void {

}
setPerson(person);

// 使用类实现接口
class User implements Person{
    name: "";
    say(){
        return "";
    }
}

// 接口继承接口
interface Teacher extends Person{
    teach():string
}