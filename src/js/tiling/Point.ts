import Line from "./Line";

/**
 *
 * @param {*} x
 * @param {*} y
 */
export default class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    /**
     * Return the vector obtained by subtracting v from this vector.
     * @param {*} v
     * @return {*}
     */
    public subtract(v: Point): Point {
        return new Point(this.x - v.x, this.y - v.y);
    }
    /**
     * Return the vector obtained by adding v to this vector.
     * @param {*} v
     * @return {*}
     */
    public add(v: Point): Point {
        return new Point(this.x + v.x, this.y + v.y);
    }
    private rotate90Clockwise(): Point {
        return new Point(this.y, -this.x);
    }
    private rotate90CounterClockwise(): Point {
        return new Point(-this.y, this.x);
    }
    private dot(v: Point): number {
        return this.x * v.x + this.y * v.y;
    }
    public scale(lambda: number): Point {
        return new Point(lambda * this.x, lambda * this.y);
    }
    public normalize(): Point {
        return this.scale(1 / this.norm());
    }
    public neg(): Point {
        return new Point(-this.x, -this.y);
    }
    public toString(): string {
        return `(${this.x.toString()}, ${this.y.toString()})`;
    }
    public midpoint(another: Point): Point {
        return new Point((this.x + another.x) / 2, (this.y + another.y) / 2);
    }
    public join(p: Point): Line {
        return new Line(
            this.y - p.y,
            p.x - this.x,
            this.x * p.y - this.y * p.x
        );
    }
    public cxConj(): Point {
        return new Point(this.x, -this.y);
    }
    public normSquared(): number {
        return this.x * this.x + this.y * this.y;
    }
    private norm(): number {
        return Math.sqrt(this.normSquared());
    }
    private cxInv(): Point {
        return this.cxConj().scale(1 / this.normSquared());
    }
    public cxMult(p: Point): Point {
        return new Point(
            this.x * p.x - this.y * p.y,
            this.x * p.y + this.y * p.x
        );
    }
}
