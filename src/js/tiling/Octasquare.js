import Octagon from "./Octagon";
import OctagonSquareTilingPolygon from "./OctagonSquareTilingPolygon";
import Point from "./Point";
import TilingEdge from "./TilingEdge";

/**
 * For use in OctagonSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function Octasquare(tiling, a, b) {
    OctagonSquareTilingPolygon.call(this, tiling, a, b);

    /**
     * Square Vertices
     */
    this.v = [
        new Point(0, 0),
        new Point(0, -2),
        new Point(2, -2),
        new Point(2, 0),
    ];
}

Octasquare.prototype = Object.create(OctagonSquareTilingPolygon.prototype);

Octasquare.prototype.numSides = function() {
    return 4;
};

Octasquare.prototype.getOpposite = function(i) {
    switch (i) {
        case 0:
            return new TilingEdge(
                new Octagon(this.tiling, this.a, this.b - 1),
                2
            );
        case 1:
            return new TilingEdge(
                new Octagon(this.tiling, this.a + 1, this.b - 1),
                4
            );
        case 2:
            return new TilingEdge(
                new Octagon(this.tiling, this.a + 1, this.b),
                6
            );
        case 3:
            return new TilingEdge(new Octagon(this.tiling, this.a, this.b), 0);
        default:
            throw new Error(
                `Called getOpposite() on a Octasquare with invalid i=${i}`
            );
    }
};
