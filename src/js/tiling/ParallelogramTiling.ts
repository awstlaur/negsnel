import Parallelogram from "./Parallelogram";
import Tiling from "./Tiling";

/**
 * A tiling of the plane consisting of parallelograms.
 *
 * @param {*} x
 * @param {*} y
 */
export default class ParallelogramTiling extends Tiling {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
    public getOriginPolygon(): Parallelogram {
        return new Parallelogram(this, 0, 0);
    }
    public toString(): string {
        return `ParallelogramTiling ${this.x.toString()} ${this.y.toString()}`;
    }
    public fromParameters(params: number[]): ParallelogramTiling {
        const [L, theta] = params;
        return new ParallelogramTiling(
            L * Math.cos((theta * Math.PI) / 180),
            L * Math.sin((theta * Math.PI) / 180)
        );
    }
}
