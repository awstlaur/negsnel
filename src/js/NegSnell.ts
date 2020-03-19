import Component from "./Component";
import config from "./config";
import NegSnellFrame from "./NegSnellFrame";
import Raphael from "raphael";
import Tiling from "./tiling/Tiling";

type HasFrame = {
    frame: NegSnellFrame;
};

/**
 *
 * @param {*} t
 * @return {*}
 */
export default function NegSnell(t: Tiling): NegSnellFrame {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const paper = Raphael(0, 0, width, height);
    const c = new Component(paper);
    c.setBackgroundColor(config.backgroundColor);

    ((window as unknown) as HasFrame).frame = new NegSnellFrame(
        t.getOriginPolygon(),
        c
    );
    return ((window as unknown) as HasFrame).frame;
}
