import Hexagon from "./Hexagon";
import HexagonTriangleTiling from "./HexagonTriangleTiling";
import HexagonTriangleTilingPolygon from "./HexagonTriangleTilingPolygon";
import Point from "./Point";
import TilingEdge from "./TilingEdge";

/**
 * For use in HexagonTriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default class HexUpTriangle extends HexagonTriangleTilingPolygon {
    protected v: Point[];
    constructor(tiling: HexagonTriangleTiling, a: number, b: number) {
        super(tiling, a, b);
        /**
         * Upward pointing Triangle Vertices
         */
        this.v = [
            new Point(1, 0),
            new Point(0.5, -Math.sqrt(3) / 2),
            new Point(1.5, -Math.sqrt(3) / 2),
        ];
    }
    public numSides(): number {
        return 3;
    }
    public getOpposite(i: number): TilingEdge {
        switch (i) {
            case 0:
                return new TilingEdge(
                    new Hexagon(this.tiling, this.a, this.b),
                    5
                );
            case 1:
                return new TilingEdge(
                    new Hexagon(this.tiling, this.a, this.b - 1),
                    1
                );
            case 2:
                return new TilingEdge(
                    new Hexagon(this.tiling, this.a + 1, this.b),
                    3
                );
            default:
                throw new Error(
                    `Called getOpposite() on a HexUpTriangle with invalid i=${i}`
                );
        }
    }
}
