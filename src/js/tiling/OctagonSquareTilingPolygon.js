import OctagonSquareTiling from "./OctagonSquareTiling";
import Point from "./Point";
import TilingPolygon from "./TilingPolygon";

/**
 * Represents any polygon in an OctagonSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function OctagonSquareTilingPolygon(tiling, a, b) {
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;

    this.v = [];

    /**
     * Horizontal translation
     */
    this.xt = new Point(2 + Math.sqrt(2), -2 - Math.sqrt(2));

    /**
     * Vertical translation
     */
    this.yt = new Point(2 + Math.sqrt(2), 2 + Math.sqrt(2));
}

OctagonSquareTilingPolygon.prototype = Object.create(TilingPolygon.prototype);

OctagonSquareTilingPolygon.prototype.getVertex = function(i) {
    return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
};

OctagonSquareTilingPolygon.prototype.compareTo = function(p) {
    return OctagonSquareTiling.compare(this, p);
};
