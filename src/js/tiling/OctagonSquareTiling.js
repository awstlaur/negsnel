import Octagon from "./Octagon";

/**
 * A tiling of the plane with interspersed regular octagons and squares.
 */
export default function OctagonSquareTiling () { // NOOP
}

OctagonSquareTiling.prototype.getOriginPolygon = function () {
    return new Octagon(this, 0, 0);
};

OctagonSquareTiling.prototype.toString = function () {
    return "OctagonSquareTiling";
};
