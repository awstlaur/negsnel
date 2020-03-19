import BrickTiling from "./BrickTiling";
import Point from "./Point";
import TilingEdge from "./TilingEdge";
import TilingPolygon from "./TilingPolygon";

/**
 * For use in BrickTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default class Brick extends TilingPolygon {
    private a: number;
    private b: number;
    private v: Point[];
    private xt: Point;
    private yt: Point;
    private tiling: BrickTiling;
    constructor(tiling: BrickTiling, a: number, b: number) {
        super();
        this.tiling = tiling;
        this.a = a;
        this.b = b;
        this.v = [
            new Point(0, 0),
            new Point(this.tiling.t, 0),
            new Point(1, 0),
            new Point(1, 1),
            new Point(1 - this.tiling.t, 1),
            new Point(0, 1),
        ];
        this.xt = new Point(1, 0);
        this.yt = new Point(1 - this.tiling.t, 1);
    }
    public numSides(): number {
        return 6;
    }
    public getVertex(i: number): Point {
        return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
    }
    protected getOpposite(i: number): TilingEdge {
        switch (i) {
            case 0:
                return new TilingEdge(
                    new Brick(this.tiling, this.a, this.b - 1),
                    3
                );
            case 1:
                return new TilingEdge(
                    new Brick(this.tiling, this.a + 1, this.b - 1),
                    4
                );
            case 2:
                return new TilingEdge(
                    new Brick(this.tiling, this.a + 1, this.b),
                    5
                );
            case 3:
                return new TilingEdge(
                    new Brick(this.tiling, this.a, this.b + 1),
                    0
                );
            case 4:
                return new TilingEdge(
                    new Brick(this.tiling, this.a - 1, this.b + 1),
                    1
                );
            case 5:
                return new TilingEdge(
                    new Brick(this.tiling, this.a - 1, this.b),
                    2
                );
            default:
                throw new Error("Called getOpposite() with invalid i.");
        }
    }
}
