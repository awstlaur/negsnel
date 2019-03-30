import Point from "./Point";
import TilingPolygon from "./TilingPolygon";

/**
 * Represents any polygon in a TwoSquareTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default function Square(tiling, a, b) {
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;
    this.v = [];
    this.xt = new Point(this.tiling.m, this.tiling.n);
    this.yt = new Point(-this.tiling.n, this.tiling.m);
}

Square.prototype = Object.create(TilingPolygon.prototype);

Square.prototype.translate = function(x, y) {
    return new Point(
        x + this.a * this.tiling.m - this.b * this.tiling.n,
        y + this.a * this.tiling.n + this.b * this.tiling.m
    );
};

Square.prototype.getVertex = function(i) {
    return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));
};
