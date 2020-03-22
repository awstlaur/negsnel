import OctagonSquareTiling from "./OctagonSquareTiling";
import Point from "./Point";
import TilingPolygon from "./TilingPolygon";

/**
 * Represents any polygon in an OctagonSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default abstract class OctagonSquareTilingPolygon extends TilingPolygon {
    protected tiling: OctagonSquareTiling;
    protected a: number;
    protected b: number;
    protected abstract v: Point[];
    protected xt: Point;
    protected yt: Point;
    constructor(tiling: OctagonSquareTiling, a: number, b: number) {
        super();
        this.tiling = tiling;
        this.a = a;
        this.b = b;
        /**
         * Horizontal translation
         */
        this.xt = new Point(2 + Math.sqrt(2), -2 - Math.sqrt(2));
        /**
         * Vertical translation
         */
        this.yt = new Point(2 + Math.sqrt(2), 2 + Math.sqrt(2));
    }
    public getVertex(i: number): Point {
        return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
    }
}
