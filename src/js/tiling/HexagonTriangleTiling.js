import Hexagon from "./Hexagon";

/**
 * A tiling of the plane with interspersed regular hexagons and equilateral
 * triangles.
 */
export default function HexagonTriangleTiling() {
    // NOOP
}

HexagonTriangleTiling.prototype.getOriginPolygon = function() {
    return new Hexagon(this, 0, 0);
};

HexagonTriangleTiling.prototype.toString = function() {
    return "HexagonTriangleTiling";
};
