import GeneralPath from "./GeneralPath";
import Point from "./Point";
import TilingEdge from "./TilingEdge";

/**
 * Represents any polygon in any tiling
 *
 */
export default function TilingPolygon () {
    this.tiling = null;
}

TilingPolygon.prototype.getV = function (i) {
    const j = i % this.numSides();
    if (j < 0) {
        return this.getVertex(j + this.numSides());
    }

    return this.getVertex(j);
};

TilingPolygon.prototype.getEdge = function (i) {
    return new TilingEdge(this, i);
};

TilingPolygon.prototype.getO = function (i) {
    const j = i % this.numSides();
    if (j < 0) {
        return this.getOpposite(j + this.numSides());
    }

    return this.getOpposite(j);
};

TilingPolygon.prototype.getPath = function () {
    const g = new GeneralPath();
    let p = this.getVertex(0);
    g.moveTo(p.getX(), p.getY());
    for (let i = 1; i < this.numSides(); i++) {
        p = this.getVertex(i);
        g.lineTo(p.getX(), p.getY());
    }
    g.closePath();
    return g;
};

TilingPolygon.prototype.getCenterOfMass = function () {
    let cx = 0.0;
    let cy = 0.0;
    const n = this.numSides();
    for (let i = 0; i < n; i++) {
        const v = this.getVertex(i);
        cx += v.getX();
        cy += v.getY();
    }
    return new Point(cx / n, cy / n);
};

TilingPolygon.prototype.tilingToString = function () {
    return this.tiling.toString();
};

/*
 * .prototype.numSides = function(){
 *
 * }
 *
 * .prototype.getVertex = function(i){
 *
 * }
 *
 * .prototype.getOpposite = function(i){
 *
 * }
 *
 * .prototype.tilingToString = function(){
 *
 * }
 *
 * .prototype.compareTo = function(other){
 *
 * }
 *
 */
