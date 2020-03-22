import Point from "./Point";
import TilingEdge from "./TilingEdge";

type SignNum = 1 | 0 | -1;

/**
 * Geometry util
 */
const Geometry = {
    triangleSign(x: Point, y: Point, z: Point): SignNum {
        const a = y.getX() - x.getX();
        const b = y.getY() - x.getY();
        const c = z.getX() - x.getX();
        const d = z.getY() - x.getY();
        const out = a * d - b * c;
        return Geometry.signum(out);
    },

    /**
     * Return true of p is on the right when walking from the start of s to the
     * end of s.
     *
     * @param {*} s
     * @param {*} p
     * @return {*}
     */
    rightOf(s: TilingEdge, p: Point): boolean {
        return Geometry.triangleSign(s.start(), p, s.end()) > 0;
    },

    lengthSquared(s: TilingEdge): number {
        return (
            (s.start().getX() - s.end().getX()) *
                (s.start().getX() - s.end().getX()) +
            (s.start().getY() - s.end().getY()) *
                (s.start().getY() - s.end().getY())
        );
    },

    reflectIn(s: TilingEdge, p: Point): Point {
        const q = p.subtract(s.start());
        const diff = s.end().subtract(s.start());
        return q
            .cxMult(diff.cxConj())
            .cxConj()
            .cxMult(diff)
            .scale(1 / diff.normSquared())
            .add(s.start());
    },

    reflectDir(s: TilingEdge, dir: Point): Point {
        const diff = s.end().subtract(s.start());
        return dir
            .cxMult(diff.cxConj())
            .cxConj()
            .cxMult(diff)
            .scale(1 / diff.normSquared());
    },

    signum(i: number): SignNum {
        if (i === 0) {
            return 0;
        }

        return i > 0 ? 1 : -1;
    },
};

export default Geometry;
