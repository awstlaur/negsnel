import Brick from "./Brick";

/**
 * A tiling of the plane with rows of offset squares. If the offset `t` is 0,
 * this is simple grid tiling of squares.
 *
 * @param {*} t The offset, a number in [0, 1]
 */
export default function BrickTiling(t) {
    this.t = t;
}

BrickTiling.prototype.getOriginPolygon = function() {
    return new Brick(this, 0, 0);
};

BrickTiling.prototype.toString = function() {
    return `BrickTiling ${this.t.toString()}`;
};

BrickTiling.prototype.fromParameters = function(params) {
    const [t] = params;
    return new BrickTiling(t);
};
