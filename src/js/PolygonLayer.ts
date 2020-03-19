import config from "./config";
import Data from "./Data";

/**
 *
 * @param {*} data
 */
export default class PolygonLayer {
    private d: Data;
    private p: RaphaelPath | null;
    constructor(data: Data) {
        this.d = data;
        this.p = null;
    }
    public render(): void {
        this.p = this.d.component.paper.path(this.d.p.getPath().toString());
        this.p.transform(this.d.tm.transformString());
        this.p.attr({
            fill: config.polyColor,
            stroke: config.polyStrokeColor,
        });
    }
    public render2(): void {
        if (this.p === null) {
            throw new Error("Cannot call render2 without first calling render");
        }
        this.p.transform("");
        this.p.transform(this.d.tm.transformString());
    }
}
