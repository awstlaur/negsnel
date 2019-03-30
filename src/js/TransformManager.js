import Point from "./tiling/Point";
import Rectangle from "./tiling/Rectangle";
import config from "./config";

/**
 *
 * @param {*} initialDisplayBox
 * @param {*} component
 */
export default function TransformManager(initialDisplayBox, component) {
    this.displayBox = initialDisplayBox;
    // eslint-disable-next-line new-cap
    this.currentTransform = new Raphael.matrix(1, 0, 0, 0, 1, 0); // Identity
    this.c = component;
}

TransformManager.prototype.getDisplayBox = function() {
    return this.displayBox;
};

TransformManager.prototype.displayBoxString = function() {
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
};

TransformManager.prototype.setDisplayBox = function(r) {
    this.displayBox = r;
    this.updateTransform();
};

TransformManager.prototype.updateTransform = function() {
    const p = new Point(
        this.displayBox.getCenterX(),
        this.displayBox.getCenterY()
    );
    const transform = Raphael.matrix();

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
    } else if (this.displayBox.getHeight() !== 0 && this.c.getHeight() !== 0) {
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
};

TransformManager.prototype.toScreenCoordinates = function(p) {
    return new Point(
        this.currentTransform.x(p.getX(), p.getY()),
        this.currentTransform.y(p.getX(), p.getY())
    );
};

TransformManager.prototype.toMathCoordinates = function(p) {
    const t = this.getInverseTransform();
    return new Point(t.x(p.getX(), p.getY()), t.y(p.getX(), p.getY()));
};

TransformManager.prototype.getTransform = function() {
    return this.currentTransform;
};

TransformManager.prototype.getInverseTransform = function() {
    return this.currentTransform.invert();
};

TransformManager.prototype.transformString = function() {
    return this.currentTransform.toTransformString();
};

TransformManager.prototype.scale = function(scale, fix) {
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
};

TransformManager.prototype.shiftUp = function(shift) {
    const amt = this.displayBox.getHeight() * config.screenShift;
    this.setDisplayBox(
        new Rectangle(
            this.displayBox.getX(),
            this.displayBox.getY() - shift * amt,
            this.displayBox.getWidth(),
            this.displayBox.getHeight()
        )
    );
};

TransformManager.prototype.shiftRight = function(shift) {
    const amt = this.displayBox.getWidth() * config.screenShift;
    this.setDisplayBox(
        new Rectangle(
            this.displayBox.getX() + shift * amt,
            this.displayBox.getY(),
            this.displayBox.getWidth(),
            this.displayBox.getHeight()
        )
    );
};
