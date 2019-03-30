import BigSquare from "./BigSquare";
import BrickTiling from "./BrickTiling";

/**
 * A tiling of the plane consising of interspersed squares of respective side
 * lengths `length1` and `length2`
 *
 * @param {*} length1
 * @param {*} length2
 */
export default function TwoSquareTiling(length1, length2) {
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

TwoSquareTiling.prototype.toString = function() {
    return `TwoSquareTiling ${this.m} ${this.n}`;
};
TwoSquareTiling.prototype.getOriginPolygon = function() {
    return new BigSquare(this, 0, 0);
};

TwoSquareTiling.prototype.fromParameters = function(params) {
    const [L1, L2] = params;
    if (L1 !== L2) {
        return new TwoSquareTiling(L1, L2);
    }

    return new BrickTiling(0);
};
