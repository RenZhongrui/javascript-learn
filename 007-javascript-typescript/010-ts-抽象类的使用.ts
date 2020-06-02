// readonly
class Person {
    public readonly name: string; // 只能读不能写

    constructor(name: string) {
        this.name = name;
    }
}

let p = new Person("tom");

// p.name = "jack";// name属性是只读的，报错不能赋值

abstract class Geom {
    width: number;

    getType() {
        return "Geom";
    }

    abstract getArea(): number;
}

class Circle extends Geom {
    radius: number;

    getArea(): number {
        return this.radius * this.radius * Math.PI;
    }

}

class Square extends Geom {
    getArea(): number {
        return this.width * this.width;
    }
}

class Triangle extends Geom {
    getArea(): number {
        return 0;
    }
}