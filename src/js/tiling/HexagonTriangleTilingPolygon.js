import HexagonTriangleTiling from "./HexagonTriangleTiling";
import Point from "./Point";
import TilingPolygon from "./TilingPolygon";

/**
 * Represents any polygon in a HexagonTriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function HexagonTriangleTilingPolygon(tiling, a, b) {
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;

    this.v = [];

    /**
     * Horizontal translation
     */
    this.xt = new Point(2, 0);

    /**
     * Vertical translation
     */
    this.yt = new Point(-1, Math.sqrt(3));
}

HexagonTriangleTilingPolygon.prototype = Object.create(TilingPolygon.prototype);

HexagonTriangleTilingPolygon.prototype.getVertex = function(i) {
    return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
};

HexagonTriangleTilingPolygon.prototype.compareTo = function(p) {
    return HexagonTriangleTiling.compare(this, p);
};
