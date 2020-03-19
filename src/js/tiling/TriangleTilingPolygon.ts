import Point from "./Point";
import TilingPolygon from "./TilingPolygon";
import TriangleTiling from "./TriangleTiling";

/**
 * Represents any polygon in a TriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default abstract class TriangleTilingPolygon extends TilingPolygon {
    protected tiling: TriangleTiling;
    protected a: number;
    protected b: number;
    protected abstract v: Point[];
    protected abstract xt: Point;
    protected abstract yt: Point;
    constructor(tiling: TriangleTiling, a: number, b: number) {
        super();
        this.tiling = tiling;
        this.a = a;
        this.b = b;
    }
    public getVertex(i: number): Point {
        return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
    }
}
