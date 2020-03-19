import Raphael from "raphael";
import Rectangle from "./tiling/Rectangle";

/**
 * This object wraps our paper/screen object, to provide a level of
 * graphics-agnosticism
 *
 * @param {*} paper
 */
export default class Component {
    public paper: RaphaelPaper;
    constructor(paper: RaphaelPaper) {
        this.paper = paper;
    }
    public getWidth(): number {
        return this.paper.width;
    }
    public getHeight(): number {
        return this.paper.height;
    }
    public setBackgroundColor(hexColor: string): void {
        this.paper.canvas.style.backgroundColor = hexColor;
    }
    public setViewBox(rect: Rectangle): void {
        this.paper.setViewBox(
            rect.getX(),
            rect.getY(),
            rect.getWidth(),
            rect.getHeight(),
            false
        );
    }
    public hexColor(colorString: string): string {
        const colorObj = Raphael.color(colorString);
        if (colorObj.error) {
            throw new Error("Error: invalid color");
        } else {
            return colorObj.hex;
        }
    }
}
