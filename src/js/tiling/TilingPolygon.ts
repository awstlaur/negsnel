import GeneralPath from "./GeneralPath";
import Point from "./Point";
import TilingEdge from "./TilingEdge";

/**
 * Represents any polygon in any tiling
 *
 */
export default abstract class TilingPolygon {
    public getV(i: number): Point {
        const j = i % this.numSides();
        if (j < 0) {
            return this.getVertex(j + this.numSides());
        }
        return this.getVertex(j);
    }
    public getEdge(i: number): TilingEdge {
        return new TilingEdge(this, i);
    }
    public getO(i: number): TilingEdge {
        const j = i % this.numSides();
        if (j < 0) {
            return this.getOpposite(j + this.numSides());
        }
        return this.getOpposite(j);
    }
    public getPath(): GeneralPath {
        const g = new GeneralPath();
        let p = this.getVertex(0);
        g.moveTo(p.getX(), p.getY());
        for (let i = 1; i < this.numSides(); i++) {
            p = this.getVertex(i);
            g.lineTo(p.getX(), p.getY());
        }
        g.closePath();
        return g;
    }
    public getCenterOfMass(): Point {
        let cx = 0.0;
        let cy = 0.0;
        const n = this.numSides();
        for (let i = 0; i < n; i++) {
            const v = this.getVertex(i);
            cx += v.getX();
            cy += v.getY();
        }
        return new Point(cx / n, cy / n);
    }
    public abstract numSides(): number;
    public abstract getVertex(i: number): Point;
    protected abstract getOpposite(i: number): TilingEdge;
}
