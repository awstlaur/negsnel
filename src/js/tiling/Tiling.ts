import TilingPolygon from "./TilingPolygon";

export default abstract class Tiling {
    public abstract getOriginPolygon(): TilingPolygon;
    public abstract toString(): string;
    public abstract fromParameters(params: number[]): Tiling;
}
