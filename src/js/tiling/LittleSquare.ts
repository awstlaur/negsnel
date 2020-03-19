import BigSquare from "./BigSquare";
import Point from "./Point";
import Square from "./Square";
import TilingEdge from "./TilingEdge";
import TwoSquareTiling from "./TwoSquareTiling";

/**
 * For use in TwoSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default class LittleSquare extends Square {
    protected v: Point[];
    constructor(tiling: TwoSquareTiling, a: number, b: number) {
        super(tiling, a, b);
        this.v = [
            new Point(this.tiling.m, 0),
            new Point(this.tiling.m + this.tiling.n, 0),
            new Point(this.tiling.m + this.tiling.n, this.tiling.n),
            new Point(this.tiling.m, this.tiling.n),
        ];
    }
    public numSides(): number {
        return 4;
    }
    public getOpposite(i: number): TilingEdge {
        switch (i) {
            case 0:
                return new TilingEdge(
                    new BigSquare(this.tiling, this.a, this.b - 1),
                    4
                );
            case 1:
                return new TilingEdge(
                    new BigSquare(this.tiling, this.a + 1, this.b - 1),
                    6
                );
            case 2:
                return new TilingEdge(
                    new BigSquare(this.tiling, this.a + 1, this.b),
                    0
                );
            case 3:
                return new TilingEdge(
                    new BigSquare(this.tiling, this.a, this.b),
                    2
                );
            default:
                throw new Error("Called getOpposite() with invalid i.");
        }
    }
}
