// 返回值
function add(x: number, y: number): number {
    return x + y;
}

// 无返回值
function add2(): void {

}

// never返回值
function add3(): never {
    while (true) {
    }
}

// 解构赋值
function add4({x, y}: { x: number, y: number }): number {
    return x + y;
}

// 默认参数和可选参数
function add5(x = 4, y?: number): number {
    return x;
}

// 剩余参数
function add6(first: number, ...leastParams: string[]) {
    return first + leastParams[0];
}

// 箭头函数
// let aaa: (x: number, y: number) => number表示函数名为a，参数为x，y；返回值为number
// (x: number, y: number): number =>表示箭头函数
let aaa: (x: number, y: number) => number = (x: number, y: number): number => {
    return x;
}
// 或者 后面可以推断出跟前面一致
let aaa1: (x: number, y: number) => number = (x, y) => {
    return x;
}
