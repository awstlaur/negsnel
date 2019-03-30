import OctagonSquareTilingPolygon from "./OctagonSquareTilingPolygon";
import Octasquare from "./Octasquare";
import Point from "./Point";
import TilingEdge from "./TilingEdge";

/**
 * For use in OctagonSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function Octagon(tiling, a, b) {
    OctagonSquareTilingPolygon.call(this, tiling, a, b);

    /**
     * Octagon Vertices
     */
    this.v = [
        new Point(0, 0),
        new Point(2, 0),
        new Point(2 + Math.sqrt(2), Math.sqrt(2)),
        new Point(2 + Math.sqrt(2), 2 + Math.sqrt(2)),
        new Point(2, 2 + 2 * Math.sqrt(2)),
        new Point(0, 2 + 2 * Math.sqrt(2)),
        new Point(-Math.sqrt(2), 2 + Math.sqrt(2)),
        new Point(-Math.sqrt(2), Math.sqrt(2)),
    ];
}

Octagon.prototype = Object.create(OctagonSquareTilingPolygon.prototype);

Octagon.prototype.numSides = function() {
    return 8;
};

Octagon.prototype.getOpposite = function(i) {
    switch (i) {
        case 0:
            return new TilingEdge(
                new Octasquare(this.tiling, this.a, this.b),
                3
            );
        case 1:
            return new TilingEdge(
                new Octagon(this.tiling, this.a + 1, this.b),
                5
            );
        case 2:
            return new TilingEdge(
                new Octasquare(this.tiling, this.a, this.b + 1),
                0
            );
        case 3:
            return new TilingEdge(
                new Octagon(this.tiling, this.a, this.b + 1),
                7
            );
        case 4:
            return new TilingEdge(
                new Octasquare(this.tiling, this.a - 1, this.b + 1),
                1
            );
        case 5:
            return new TilingEdge(
                new Octagon(this.tiling, this.a - 1, this.b),
                1
            );
        case 6:
            return new TilingEdge(
                new Octasquare(this.tiling, this.a - 1, this.b),
                2
            );
        case 7:
            return new TilingEdge(
                new Octagon(this.tiling, this.a, this.b - 1),
                3
            );
        default:
            throw new Error(
                `Called getOpposite() on a Octagon with invalid i=${i}`
            );
    }
};
