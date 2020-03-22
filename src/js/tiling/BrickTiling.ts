import Brick from "./Brick";
import Tiling from "./Tiling";

/**
 * A tiling of the plane with rows of offset squares. If the offset `t` is 0,
 * this is simple grid tiling of squares.
 *
 * @param {*} t The offset, a number in [0, 1]
 */
export default class BrickTiling extends Tiling {
    public t: number;
    constructor(t: number) {
        super();
        this.t = t;
    }
    public getOriginPolygon(): Brick {
        return new Brick(this, 0, 0);
    }
    public toString(): string {
        return `BrickTiling ${this.t.toString()}`;
    }
    public fromParameters(params: number[]): BrickTiling {
        const [t] = params;
        return new BrickTiling(t);
    }
}
