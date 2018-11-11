import TilingPolygon from "./TilingPolygon";

/**
 * Represents any polygon in a TriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function TriangleTilingPolygon (tiling, a, b) {
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;
}

TriangleTilingPolygon.prototype = Object.create(TilingPolygon.prototype);

TriangleTilingPolygon.prototype.getVertex = function (i) {
    return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
};
