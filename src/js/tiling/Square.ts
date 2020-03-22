import Point from "./Point";
import TilingPolygon from "./TilingPolygon";
import TwoSquareTiling from "./TwoSquareTiling";

/**
 * Represents any polygon in a TwoSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default abstract class Square extends TilingPolygon {
    protected a: number;
    protected b: number;
    protected abstract v: Point[];
    protected xt: Point;
    protected yt: Point;
    protected tiling: TwoSquareTiling;
    constructor(tiling: TwoSquareTiling, a: number, b: number) {
        super();
        this.tiling = tiling;
        this.a = a;
        this.b = b;
        this.xt = new Point(this.tiling.m, this.tiling.n);
        this.yt = new Point(-this.tiling.n, this.tiling.m);
    }
    public translate(x: number, y: number): Point {
        return new Point(
            x + this.a * this.tiling.m - this.b * this.tiling.n,
            y + this.a * this.tiling.n + this.b * this.tiling.m
        );
    }
    public getVertex(i: number): Point {
        return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
    }
}
