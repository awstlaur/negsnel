import Raphael from "raphael";
import Rectangle from "./Rectangle";

/**
 * 2D path
 */
export default class GeneralPath {
    private xValues: number[];
    private yValues: number[];
    private startX: number | null;
    private startY: number | null;
    private closed: boolean;
    constructor() {
        this.xValues = [];
        this.yValues = [];
        this.startX = null;
        this.startY = null;
        this.closed = false;
    }
    public moveTo(x: number, y: number): void {
        this.xValues = [];
        this.yValues = [];
        this.xValues.push(x);
        this.yValues.push(y);
        this.closed = false;
        this.startX = x;
        this.startY = y;
    }
    public lineTo(x: number, y: number): void {
        if (closed) {
            throw new Error("Attempting to manipulate a closed path.");
        } else {
            this.xValues.push(x);
            this.yValues.push(y);
        }
    }
    private copy(): GeneralPath {
        const out = new GeneralPath();
        out.xValues = this.xValues.slice(0);
        out.yValues = this.yValues.slice(0);
        out.startX = this.startX;
        out.startY = this.startY;
        out.closed = this.closed;
        return out;
    }
    public closePath(): void {
        if (
            typeof this.startX !== "number" ||
            typeof this.startY !== "number"
        ) {
            throw new Error("Cannot close path that has not been opened");
        }
        this.closed = true;
        this.xValues.push(this.startX);
        this.yValues.push(this.startY);
    }
    public toString(): string {
        let out = `M${this.xValues[0].toString()},${this.yValues[0].toString()}`;
        for (let i = 1; i < this.xValues.length; i++) {
            out = `${out}L${this.xValues[i].toString()},${this.yValues[
                i
            ].toString()}`;
        }
        return out;
    }
    public getBoundingBox(): Rectangle {
        const box = Raphael.pathBBox(this.toString());
        return new Rectangle(box.x, box.y2, box.width, box.height);
    }
}
