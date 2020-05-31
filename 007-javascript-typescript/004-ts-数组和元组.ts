// 1.普通数组
let arr1: number[] = [1, 2, 3];
// 2.多种类型的数组
let arr2: (number | string) [] = [1, 2, "3"];

// 3.对象数组
type User = { name: string, age: number };
// 表示数组中的每一项都是User类型的
let arr3: User[] = [
    {
        name: "a",
        age: 12
    }
]

// class数组
class Teacher {
    name: string
    age: number

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

let arr4: Teacher[] = [{
    name: "Mr.li",
    age: 22
}];
// 或者是 new class
let arr5: Teacher[] = [
    new Teacher("z", 22),
    {
        name: "Mr.li",
        age: 22
    }
];

// 元组，定义每一项的类型和数组长度
const info: [string, string, number] = ["1", "2", 3];
// 应用场景csv
// csv格式：
// tom, jack, 22
// 转成数组
const csvArr: [string,string, number][] = [
    [
        "tom1", "jack1", 11
    ],
    [
        "tom2", "jack2", 22
    ]
]
