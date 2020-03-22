import Component from "./Component";
import config from "./config";
import Point from "./tiling/Point";
import Raphael from "raphael";
import Rectangle from "./tiling/Rectangle";

/**
 *
 * @param {*} initialDisplayBox
 * @param {*} component
 */
export default class TransformManager {
    private displayBox: Rectangle;
    private currentTransform: RaphaelMatrix;
    private c: Component;
    constructor(initialDisplayBox: Rectangle, component: Component) {
        this.displayBox = initialDisplayBox;
        this.currentTransform = Raphael.matrix(1, 0, 0, 0, 1, 0); // Identity
        this.c = component;
    }
    public getDisplayBox(): Rectangle {
        return this.displayBox;
    }
    private displayBoxString(): string {
        return this.displayBox
            .getX()
            .toString()
            .concat(
                " ",
                this.displayBox.getY().toString(),
                " ",
                this.displayBox.getWidth().toString(),
                " ",
                this.displayBox.getHeight().toString()
            );
    }
    public setDisplayBox(r: Rectangle): void {
        this.displayBox = r;
        this.updateTransform();
    }
    private updateTransform(): void {
        const p = new Point(
            this.displayBox.getCenterX(),
            this.displayBox.getCenterY()
        );

        const transform = Raphael.matrix(1, 0, 0, 1, 0, 0); // ???
        /*
         * The number scale is the minimal ratio of screen dimensions to bounding
         * box dimensions.
         */
        let scale = 1;
        if (this.displayBox.getWidth() !== 0 && this.c.getWidth() !== 0) {
            if (this.displayBox.getHeight() !== 0 && this.c.getHeight() !== 0) {
                scale = Math.min(
                    this.c.getWidth() / this.displayBox.getWidth(),
                    this.c.getHeight() / this.displayBox.getHeight()
                );
            } else {
                scale = this.c.getWidth() / this.displayBox.getWidth();
            }
        } else if (
            this.displayBox.getHeight() !== 0 &&
            this.c.getHeight() !== 0
        ) {
            scale = this.c.getHeight() / this.displayBox.getHeight();
        }
        transform.scale(scale, scale);
        const centerDest = new Point(
            transform.x(p.getX(), p.getY()),
            transform.y(p.getX(), p.getY())
        );
        const centerX = -centerDest.getX() + this.c.getWidth() / 2;
        const centerY = -centerDest.getY() + this.c.getHeight() / 2;
        transform.translate(centerX / scale, centerY / scale);
        this.currentTransform = transform;
    }
    public toScreenCoordinates(p: Point): Point {
        return new Point(
            this.currentTransform.x(p.getX(), p.getY()),
            this.currentTransform.y(p.getX(), p.getY())
        );
    }
    public toMathCoordinates(p: Point): Point {
        const t = this.getInverseTransform();
        return new Point(t.x(p.getX(), p.getY()), t.y(p.getX(), p.getY()));
    }
    private getTransform(): RaphaelMatrix {
        return this.currentTransform;
    }
    private getInverseTransform(): RaphaelMatrix {
        return this.currentTransform.invert();
    }
    public transformString(): string {
        return this.currentTransform.toTransformString();
    }
    public scale(scale: number, fix?: Point): void {
        if (scale > 0) {
            const fixPoint =
                fix ||
                new Point(
                    this.displayBox.getCenterX(),
                    this.displayBox.getCenterY()
                );
            this.setDisplayBox(
                new Rectangle(
                    scale * (this.displayBox.getX() - fixPoint.getX()) +
                        fixPoint.getX(),
                    scale * (this.displayBox.getY() - fixPoint.getY()) +
                        fixPoint.getY(),
                    scale * this.displayBox.getWidth(),
                    scale * this.displayBox.getHeight()
                )
            );
        }
    }
    public shiftUp(shift: number): void {
        const amt = this.displayBox.getHeight() * config.screenShift;
        this.setDisplayBox(
            new Rectangle(
                this.displayBox.getX(),
                this.displayBox.getY() - shift * amt,
                this.displayBox.getWidth(),
                this.displayBox.getHeight()
            )
        );
    }
    public shiftRight(shift: number): void {
        const amt = this.displayBox.getWidth() * config.screenShift;
        this.setDisplayBox(
            new Rectangle(
                this.displayBox.getX() + shift * amt,
                this.displayBox.getY(),
                this.displayBox.getWidth(),
                this.displayBox.getHeight()
            )
        );
    }
}
