import Point from "./Point";

/**
 *
 * @param {*} A
 * @param {*} B
 * @param {*} C
 */
export default function Line (A, B, C) {
    this.a = A;
    this.b = B;
    this.c = C;
}

Line.prototype.intersect = function (l) {
    const d = (this.a * l.b) - (this.b * l.a);
    if (d === 0) {
        throw new Error("Error: lines do not intersect");
    }
    else {
        return new Point(((this.b * l.c) - (this.c * l.b)) / d,
                         ((this.c * l.a) - (this.a * l.c)) / d);
    }
};
