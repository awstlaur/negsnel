import Octagon from "./Octagon";
import Tiling from "./Tiling";

/**
 * A tiling of the plane with interspersed regular octagons and squares.
 */
export default class OctagonSquareTiling extends Tiling {
    public getOriginPolygon(): Octagon {
        return new Octagon(this, 0, 0);
    }
    public toString(): string {
        return "OctagonSquareTiling";
    }
    public fromParameters(): OctagonSquareTiling {
        console.warn("OctagonSquareTiling.fromParameters ignores parameters");
        return new OctagonSquareTiling();
    }
}
