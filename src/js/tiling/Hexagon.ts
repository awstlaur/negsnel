import HexagonTriangleTiling from "./HexagonTriangleTiling";
import HexagonTriangleTilingPolygon from "./HexagonTriangleTilingPolygon";
import HexDownTriangle from "./HexDownTriangle";
import HexUpTriangle from "./HexUpTriangle";
import Point from "./Point";
import TilingEdge from "./TilingEdge";

/**
 * For use in HexagonTriangleTiling
 *
 * @param {*} tiling
 * @param {*} a
 * @param {*} b
 */
export default class Hexagon extends HexagonTriangleTilingPolygon {
    protected v: Point[];
    constructor(tiling: HexagonTriangleTiling, a: number, b: number) {
        super(tiling, a, b);
        /**
         * Hexagon Vertices
         */
        this.v = [
            new Point(1, 0),
            new Point(0.5, Math.sqrt(3) / 2),
            new Point(-0.5, Math.sqrt(3) / 2),
            new Point(-1, 0),
            new Point(-0.5, -Math.sqrt(3) / 2),
            new Point(0.5, -Math.sqrt(3) / 2),
        ];
    }
    public numSides(): number {
        return 6;
    }
    public getOpposite(i: number): TilingEdge {
        switch (i) {
            case 0:
                return new TilingEdge(
                    new HexDownTriangle(this.tiling, this.a, this.b),
                    2
                );
            case 1:
                return new TilingEdge(
                    new HexUpTriangle(this.tiling, this.a, this.b + 1),
                    1
                );
            case 2:
                return new TilingEdge(
                    new HexDownTriangle(this.tiling, this.a - 1, this.b),
                    0
                );
            case 3:
                return new TilingEdge(
                    new HexUpTriangle(this.tiling, this.a - 1, this.b),
                    2
                );
            case 4:
                return new TilingEdge(
                    new HexDownTriangle(this.tiling, this.a - 1, this.b - 1),
                    1
                );
            case 5:
                return new TilingEdge(
                    new HexUpTriangle(this.tiling, this.a, this.b),
                    0
                );
            default:
                throw new Error(
                    `Called getOpposite() on a Hexagon with invalid i=${i}`
                );
        }
    }
}
