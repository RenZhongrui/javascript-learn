// 1.类型定义
let a: number = 123;
a = 234;
console.log(a)

// 2.函数方法定义，求x与y的平方的平方根
function demo(data: {x: number, y:number}) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
// 3.必须传定义好的值
demo({
    x: 3,
    y: 4
});

// 4.在外部定义类型
type point = {x: number, y:number};
function demo2(data: point) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
demo2({
    x: 3,
    y: 4
});

// 5.静态类型不进会提示要传什么参数，还定义了该类型拥有哪些方法和属性