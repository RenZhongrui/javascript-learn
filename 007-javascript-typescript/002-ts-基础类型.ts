// 布尔
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
let names: string = "bob";
names = "smith";

// 模板字符串
let name1: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name1 }.I'll be ${ age + 1 } years old next month.`;

// 数组
let list1: number[] = [1, 2, 3];
// 泛数组
let list2: Array<number> = [1, 2, 3];

// 元组 Tuple 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// Declare a tuple type
let x: [string, number];
x = ['hello', 10]; // OK
// x = [10, 'hello']; // Error

// 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
let d:Color = Color.Blue;

// 多个类型
let z: number | string = 111;
z = "111";