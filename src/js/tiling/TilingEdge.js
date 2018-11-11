import Geometry from "./Geometry";

/**
 * Represents the edge of any polygon in any tiling
 *
 * @param {*} polygon
 * @param {*} index
 */
export default function TilingEdge (polygon, index) {
    this.p = polygon;
    if (index >= 0) {
        this.i = index % this.p.numSides();
    }
    else {
        this.i = this.p.numSides() - (index % this.p.numSides());
    }
}

TilingEdge.prototype.getI = function () {
    return this.i;
};

TilingEdge.prototype.end = function () {
    return this.p.getV(this.i + 1);
};

TilingEdge.prototype.start = function () {
    return this.p.getV(this.i);
};

/* The next edge counter-clockwise around the polygon. */
TilingEdge.prototype.nextEdge = function () {
    return new TilingEdge(this.p, this.i + 1);
};

/*
 * I'm not sure this is even used, and it's exactly like nextEdge() in the
 * original java code...
 */
TilingEdge.prototype.previousEdge = function () {
    return new TilingEdge(this.p, this.i + 1);
};

TilingEdge.prototype.opposite = function () {
    return this.p.getO(this.i);
};

TilingEdge.prototype.getMidpoint = function () {
    return this.start().midpoint(this.end());
};

TilingEdge.prototype.reflect = function (point) {
    return Geometry.reflectIn(this, point);
};


TilingEdge.prototype.reflectDir = function (point) {
    return Geometry.reflectDir(this, point);
};

TilingEdge.prototype.getPolygon = function () {
    return this.p;
};

TilingEdge.prototype.toLine = function () {
    return this.start().join(this.end());
};
