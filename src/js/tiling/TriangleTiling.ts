import Tiling from "./Tiling";
import UpTriangle from "./UpTriangle";

/**
 * A tiling of the plane consisting of triangulated-parallelograms,
 * including the polygon with vertices (0,0), (1,0), and (`x`,`y`).
 *
 * @param {*} x
 * @param {*} y
 */
export default class TriangleTiling extends Tiling {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
    public getOriginPolygon(): UpTriangle {
        return new UpTriangle(this, 0, 0);
    }
    public fromParameters(params: number[]): TriangleTiling {
        const [L] = params;
        const theta = (params[1] * Math.PI) / 180;
        return new TriangleTiling(L * Math.cos(theta), L * Math.sin(theta));
    }
    public fromAngles(params: number[]): TriangleTiling {
        const phi = (params[0] * Math.PI) / 180;
        const theta = (params[1] * Math.PI) / 180;
        return new TriangleTiling(
            Math.tan(phi) / (Math.tan(theta) + Math.tan(phi)),
            (Math.tan(phi) * Math.tan(theta)) /
                (Math.tan(theta) + Math.tan(phi))
        );
    }
    public toString(): string {
        return `TriangleTiling(${this.x}, ${this.y})`;
    }
}
