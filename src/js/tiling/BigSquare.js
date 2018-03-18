import LittleSquare from "./LittleSquare";
import Point from "./Point";
import Square from "./Square";
import TilingEdge from "./TilingEdge";

/**
 * For use in TwoSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function BigSquare (tiling, a, b) {
    Square.call(this, tiling, a, b);
    this.v = [
        new Point(0, 0),
        new Point(this.tiling.n, 0),
        new Point(this.tiling.m, 0),
        new Point(this.tiling.m, this.tiling.n),
        new Point(this.tiling.m, this.tiling.m),
        new Point(this.tiling.m - this.tiling.n, this.tiling.m),
        new Point(0, this.tiling.m),
        new Point(0, this.tiling.m - this.tiling.n)
    ];
}

BigSquare.prototype = Object.create(Square.prototype);

BigSquare.prototype.numSides = function () {
    return 8;
};

BigSquare.prototype.getOpposite = function (i) {
    switch (i) {
        case 0: return new TilingEdge(new LittleSquare(this.tiling, this.a - 1, this.b), 2);
        case 1: return new TilingEdge(new BigSquare(this.tiling, this.a, this.b - 1), 5);
        case 2: return new TilingEdge(new LittleSquare(this.tiling, this.a, this.b), 3);
        case 3: return new TilingEdge(new BigSquare(this.tiling, this.a + 1, this.b), 7);
        case 4: return new TilingEdge(new LittleSquare(this.tiling, this.a, this.b + 1), 4);
        case 5: return new TilingEdge(new BigSquare(this.tiling, this.a, this.b + 1), 1);
        case 6: return new TilingEdge(new LittleSquare(this.tiling, this.a - 1, this.b + 1), 1);
        case 7: return new TilingEdge(new BigSquare(this.tiling, this.a - 1, this.b), 3);
        default:
            throw new Error("Called getOpposite() with invalid i.");
    }
};
