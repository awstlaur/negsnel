import ParallelogramTiling from "./ParallelogramTiling";
import Point from "./Point";
import TilingEdge from "./TilingEdge";
import TilingPolygon from "./TilingPolygon";

/**
 * For use in ParallelogramTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default class Parallelogram extends TilingPolygon {
    private tiling: ParallelogramTiling;
    private a: number;
    private b: number;
    private v: Point[];
    private xt: Point;
    private yt: Point;
    constructor(tiling: ParallelogramTiling, a: number, b: number) {
        super();
        this.tiling = tiling;
        this.a = a;
        this.b = b;
        this.v = [
            new Point(0, 0),
            new Point(1, 0),
            new Point(this.tiling.x + 1, this.tiling.y),
            new Point(this.tiling.x, this.tiling.y),
        ];
        this.xt = new Point(1, 0);
        this.yt = new Point(this.tiling.x, this.tiling.y);
    }
    public numSides(): number {
        return 4;
    }
    public getVertex(i: number): Point {
        return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
    }
    public getOpposite(i: number): TilingEdge {
        switch (i) {
            case 0:
                return new TilingEdge(
                    new Parallelogram(this.tiling, this.a, this.b - 1),
                    2
                );
            case 1:
                return new TilingEdge(
                    new Parallelogram(this.tiling, this.a + 1, this.b),
                    3
                );
            case 2:
                return new TilingEdge(
                    new Parallelogram(this.tiling, this.a, this.b + 1),
                    0
                );
            case 3:
                return new TilingEdge(
                    new Parallelogram(this.tiling, this.a - 1, this.b),
                    1
                );
            default:
                throw new Error("Called getOpposite() with invalid i.");
        }
    }
}
