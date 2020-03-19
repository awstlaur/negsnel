import Component from "./Component";
import NegSnellFrame from "./NegSnellFrame";
import Rectangle from "./tiling/Rectangle";
import TilingPolygon from "./tiling/TilingPolygon";
import TransformManager from "./TransformManager";

/**
 *
 * @param {*} component
 * @param {*} p
 * @param {*} frame
 */
export default class Data {
    public component: Component;
    public tm: TransformManager;
    public p: TilingPolygon;
    private frame: NegSnellFrame;
    constructor(component: Component, p: TilingPolygon, frame: NegSnellFrame) {
        this.component = component;
        this.tm = new TransformManager(new Rectangle(-2, 2, 4, 4), component);
        this.p = p;
        this.frame = frame;
    }
}
