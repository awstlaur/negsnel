import Rectangle from "./tiling/Rectangle";
import TransformManager from "./TransformManager";

/**
 *
 * @param {*} component
 * @param {*} p
 * @param {*} frame
 */
export default function Data(component, p, frame) {
    this.component = component;
    this.tm = new TransformManager(new Rectangle(-2, 2, 4, 4), component);
    this.p = p;
    this.frame = frame;
}
