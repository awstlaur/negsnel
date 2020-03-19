import Component from "./Component";
import NegSnellFrame from "./NegSnellFrame";
import config from "./config";
import Raphael from "../../node_modules/raphael/raphael";

/**
 *
 * @param {*} t
 * @return {*}
 */
export default function NegSnell(t) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const paper = Raphael(0, 0, width, height);
    const c = new Component(paper);
    c.setBackgroundColor(config.backgroundColor);

    window.frame = new NegSnellFrame(t.getOriginPolygon(), c);
    return window.frame;
}
