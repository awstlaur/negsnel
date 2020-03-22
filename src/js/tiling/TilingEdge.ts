import Geometry from "./Geometry";
import Line from "./Line";
import Point from "./Point";
import TilingPolygon from "./TilingPolygon";

/**
 * Represents the edge of any polygon in any tiling
 *
 * @param {*} polygon
 * @param {*} index
 */
export default class TilingEdge {
    private p: TilingPolygon;
    private i: number;
    constructor(polygon: TilingPolygon, index: number) {
        this.p = polygon;
        if (index >= 0) {
            this.i = index % this.p.numSides();
        } else {
            this.i = this.p.numSides() - (index % this.p.numSides());
        }
    }
    public getI(): number {
        return this.i;
    }
    public end(): Point {
        return this.p.getV(this.i + 1);
    }
    public start(): Point {
        return this.p.getV(this.i);
    }
    /* The next edge counter-clockwise around the polygon. */
    public nextEdge(): TilingEdge {
        return new TilingEdge(this.p, this.i + 1);
    }
    /*
     * I'm not sure this is even used, and it's exactly like nextEdge() in the
     * original java code...
     */
    public previousEdge(): TilingEdge {
        return new TilingEdge(this.p, this.i + 1);
    }
    public opposite(): TilingEdge {
        return this.p.getO(this.i);
    }
    public getMidpoint(): Point {
        return this.start().midpoint(this.end());
    }
    public reflect(point: Point): Point {
        return Geometry.reflectIn(this, point);
    }
    public reflectDir(point: Point): Point {
        return Geometry.reflectDir(this, point);
    }
    public getPolygon(): TilingPolygon {
        return this.p;
    }
    public toLine(): Line {
        return this.start().join(this.end());
    }
}
