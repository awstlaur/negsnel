import HexagonTriangleTiling from "./HexagonTriangleTiling";
import Point from "./Point";
import TilingPolygon from "./TilingPolygon";

/**
 * Represents any polygon in a HexagonTriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default abstract class HexagonTriangleTilingPolygon extends TilingPolygon {
    protected abstract v: Point[];
    protected tiling: HexagonTriangleTiling;
    protected a: number;
    protected b: number;
    protected xt: Point;
    protected yt: Point;
    constructor(tiling: HexagonTriangleTiling, a: number, b: number) {
        super();
        this.tiling = tiling;
        this.a = a;
        this.b = b;
        /**
         * Horizontal translation
         */
        this.xt = new Point(2, 0);
        /**
         * Vertical translation
         */
        this.yt = new Point(-1, Math.sqrt(3));
    }
    public getVertex(i: number): Point {
        return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
    }
}
