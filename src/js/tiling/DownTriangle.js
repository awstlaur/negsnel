import Point from "./Point";
import TilingEdge from "./TilingEdge";
import TriangleTilingPolygon from "./TriangleTilingPolygon";
import UpTriangle from "./UpTriangle";

/**
 * For use in TriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function DownTriangle (tiling, a, b) {
    TriangleTilingPolygon.call(this, tiling, a, b);
    this.v = [
        new Point(1, 0),
        new Point(this.tiling.x + 1,
                  this.tiling.y),
        new Point(this.tiling.x,
                  this.tiling.y)
    ];
    this.xt = new Point(1, 0);
    this.yt = new Point(this.tiling.x, this.tiling.y);
}


DownTriangle.prototype = Object.create(TriangleTilingPolygon.prototype);

DownTriangle.prototype.numSides = function () {
    return 3;
};

DownTriangle.prototype.getOpposite = function (i) {
    switch (i) {
        case 0: return new TilingEdge(new UpTriangle(this.tiling, this.a + 1, this.b), 2);
        case 1: return new TilingEdge(new UpTriangle(this.tiling, this.a, this.b + 1), 0);
        case 2: return new TilingEdge(new UpTriangle(this.tiling, this.a, this.b), 1);
        default:
            throw new Error(`Called getOpposite() on a DownTriangle with invalid i=${i}`);
    }
};
