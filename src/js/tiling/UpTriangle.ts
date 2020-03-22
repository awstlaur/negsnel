import DownTriangle from "./DownTriangle";
import Point from "./Point";
import TilingEdge from "./TilingEdge";
import TriangleTiling from "./TriangleTiling";
import TriangleTilingPolygon from "./TriangleTilingPolygon";

/**
 * For use in TriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default class UpTriangle extends TriangleTilingPolygon {
    protected v: Point[];
    protected xt: Point;
    protected yt: Point;
    constructor(tiling: TriangleTiling, a: number, b: number) {
        super(tiling, a, b);
        this.v = [
            new Point(0, 0),
            new Point(1, 0),
            new Point(this.tiling.x, this.tiling.y),
        ];
        this.xt = new Point(1, 0);
        this.yt = new Point(this.tiling.x, this.tiling.y);
    }
    public numSides(): number {
        return 3;
    }
    public getOpposite(i: number): TilingEdge {
        switch (i) {
            case 0:
                return new TilingEdge(
                    new DownTriangle(this.tiling, this.a, this.b - 1),
                    1
                );
            case 1:
                return new TilingEdge(
                    new DownTriangle(this.tiling, this.a, this.b),
                    2
                );
            case 2:
                return new TilingEdge(
                    new DownTriangle(this.tiling, this.a - 1, this.b),
                    0
                );
            default:
                throw new Error(
                    `Called getOpposite() on a UpTriangle with invalid i=${i}`
                );
        }
    }
}
