import UpTriangle from "./UpTriangle";

/**
 * A tiling of the plane consisting of triangulated-parallelograms,
 * including the polygon with vertices (0,0), (1,0), and (`x`,`y`).
 *
 * @param {*} x
 * @param {*} y
 */
export default function TriangleTiling (x, y) {
    this.x = x;
    this.y = y;
}

TriangleTiling.prototype.getOriginPolygon = function () {
    return new UpTriangle(this, 0, 0);
};

TriangleTiling.prototype.fromParameters = function (params) {
    const [L] = params;
    const theta = params[1] * Math.PI / 180;
    return new TriangleTiling(L * Math.cos(theta), L * Math.sin(theta));
};
TriangleTiling.prototype.fromAngles = function (params) {
    const phi = params[0] * Math.PI / 180;
    const theta = params[1] * Math.PI / 180;
    return new TriangleTiling(
        Math.tan(phi) / (Math.tan(theta) + Math.tan(phi)),
        Math.tan(phi) * Math.tan(theta) /
                                (Math.tan(theta) + Math.tan(phi))
    );
};
