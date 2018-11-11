import Parallelogram from "./Parallelogram";

/**
 * A tiling of the plane consisting of parallelograms.
 *
 * @param {*} x
 * @param {*} y
 */
export default function ParallelogramTiling (x, y) {
    this.x = x;
    this.y = y;
}

ParallelogramTiling.prototype.getOriginPolygon = function () {
    return new Parallelogram(this, 0, 0);
};

ParallelogramTiling.prototype.toString = function () {
    return `ParallelogramTiling ${this.x.toString()} ${this.y.toString()}`;
};

ParallelogramTiling.prototype.fromParameters = function (params) {
    const [L, theta] = params;
    return new ParallelogramTiling(
        L * Math.cos(theta * Math.PI / 180),
        L * Math.sin(theta * Math.PI / 180)
    );
};
