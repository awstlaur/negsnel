/**
 * A rectangle in the plane
 *
 * @param {*} x
 * @param {*} y
 * @param {*} width
 * @param {*} height
 */
export default class Rectangle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public getWidth(): number {
        return this.width;
    }
    public getHeight(): number {
        return this.height;
    }
    public getCenterX(): number {
        return this.getMinX() + this.width / 2;
    }
    public getCenterY(): number {
        return this.getMinY() + this.height / 2;
    }
    public getMinX(): number {
        return this.x;
    }
    public getMinY(): number {
        return this.y - this.height;
    }
}
