import Geometry from "./tiling/Geometry";

/**
 *
 * @param {*} startingPolygon
 * @param {*} start
 * @param {*} end
 */
export default function Orbit(startingPolygon, start, end) {
    this.s = start;
    this.dir = end.subtract(this.s).normalize();

    this.edge = startingPolygon.getEdge(0);

    /*
     * These two while loops find the tiling edge
     * to which the first ray is pointing
     */
    while (Geometry.triangleSign(end, this.edge.start(), this.s) <= 0) {
        this.edge = this.edge.nextEdge();
        if (this.edge.getI() === 0) {
            throw new Error("WHAT IS HAPPENING");
        }
    }
    while (Geometry.triangleSign(end, this.edge.end(), this.s) > 0) {
        this.edge = this.edge.nextEdge();
    }
}

Orbit.prototype.getPolygon = function() {
    return this.edge.getPolygon();
};

Orbit.prototype.next = function() {
    const first = this.edge.getI();
    this.edge = this.edge.nextEdge();
    const e = this.s.add(this.dir);
    while (Geometry.triangleSign(this.s, this.edge.end(), e) >= 0) {
        this.edge = this.edge.nextEdge();
        if (this.edge.getI() === first) {
            throw new Error("Failed to continue path due to numerical errors!");
        }
    }
    this.s = this.s.join(e).intersect(this.edge.toLine());
    this.dir = this.edge.reflectDir(this.dir).neg(); // Update direction
    this.edge = this.edge.opposite();
    return this.s;
};
