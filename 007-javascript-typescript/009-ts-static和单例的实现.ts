// 单例的实现
class Demo {
    private static instance: Demo;
    private constructor(public name: string) {}
    // 创建Demo的实例
    static getInstance(name) {
        if (!this.instance) {
            this.instance = new Demo(name);
        }
        return this.instance;
    }
}
// demo1和demo2是同一个实例
let demo1 = Demo.getInstance("tom");
let demo2 = Demo.getInstance("jack");
if (demo1 === demo2) {
    console.log("单例")
}