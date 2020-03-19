import BigSquare from "./BigSquare";
import BrickTiling from "./BrickTiling";
import Tiling from "./Tiling";

/**
 * A tiling of the plane consising of interspersed squares of respective side
 * lengths `length1` and `length2`
 *
 * @param {*} length1
 * @param {*} length2
 */
export default class TwoSquareTiling extends Tiling {
    public m: number;
    public n: number;
    constructor(length1: number, length2: number) {
        super();
        if (length1 > length2) {
            this.m = length1;
            this.n = length2;
        } else if (length2 > length1) {
            this.m = length2;
            this.n = length1;
        } else {
            throw new Error(
                "called new TwoSquareTiling(length1,length2) with length1 = length2"
            );
        }
    }
    public toString(): string {
        return `TwoSquareTiling ${this.m} ${this.n}`;
    }
    public getOriginPolygon(): BigSquare {
        return new BigSquare(this, 0, 0);
    }
    public fromParameters(params: number[]): Tiling {
        const [L1, L2] = params;
        if (L1 !== L2) {
            return new TwoSquareTiling(L1, L2);
        }
        return new BrickTiling(0);
    }
}
