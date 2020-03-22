import Hexagon from "./Hexagon";
import Tiling from "./Tiling";

/**
 * A tiling of the plane with interspersed regular hexagons and equilateral
 * triangles.
 */
export default class HexagonTriangleTiling extends Tiling {
    public getOriginPolygon(): Hexagon {
        return new Hexagon(this, 0, 0);
    }
    public toString(): string {
        return "HexagonTriangleTiling";
    }
    public fromParameters(): HexagonTriangleTiling {
        console.warn("HexagonTriangleTiling ignores params");
        return new HexagonTriangleTiling();
    }
}
