import Data from "./Data";
import Point from "./tiling/Point";
import PolygonLayer from "./PolygonLayer";
import Rectangle from "./tiling/Rectangle";
import TrajectoryLayer from "./TrajectoryLayer";
import config from "./config";

/**
 *
 * @param {*} p
 * @param {*} component
 */
export default function NegSnellFrame (p, component) {
    this.d = new Data(component, p, this);

    this.d.tm.setDisplayBox(p.getPath().getBoundingBox());
    this.d.tm.scale(config.initialDisplayBoxScale);
    this.initialDisplayBox = this.d.tm.getDisplayBox();

    this.polyLayer = new PolygonLayer(this.d);
    this.polyLayer.render();
    this.zoomBox = null;

    this.trajLayer = new TrajectoryLayer(this.d);


    this.trajLayer.render();

    Mousetrap.bind("up", this.move.bind(this));
    Mousetrap.bind("left", this.move.bind(this));
    Mousetrap.bind("down", this.move.bind(this));
    Mousetrap.bind("right", this.move.bind(this));

    Mousetrap.bind("o", this.zoom.bind(this));
    Mousetrap.bind("i", this.zoom.bind(this));
    Mousetrap.bind("r", this.zoom.bind(this));

    Mousetrap.bind("w", this.moveTrajPoints.bind(this));
    Mousetrap.bind("a", this.moveTrajPoints.bind(this));
    Mousetrap.bind("s", this.moveTrajPoints.bind(this));
    Mousetrap.bind("d", this.moveTrajPoints.bind(this));

    Mousetrap.bind("shift+w", this.moveTrajPoints.bind(this));
    Mousetrap.bind("shift+a", this.moveTrajPoints.bind(this));
    Mousetrap.bind("shift+s", this.moveTrajPoints.bind(this));
    Mousetrap.bind("shift+d", this.moveTrajPoints.bind(this));

    Mousetrap.bind("esc", this.toggleHelpBox.bind(this));


    document.onmousedown = this.mouseEvent.bind(this);
    document.onmouseup = this.mouseEvent.bind(this);
    document.onmousemove = this.mouseEvent.bind(this);
}


NegSnellFrame.prototype.move = function (e, combo) {
    const dir = config.directionMap[combo];

    /*
     * Dir:
     * 0 -> up
     * 1 -> left
     * 2 -> down
     * 3 -> right
     */

    switch (dir) {
        case 0:
            this.d.tm.shiftUp(1);
            break;
        case 1:
            this.d.tm.shiftRight(-1);
            break;
        case 2:
            this.d.tm.shiftUp(-1);
            break;
        case 3:
            this.d.tm.shiftRight(1);
            break;
        default:
            throw new Error("Error: invalid direction");
    }
    this.polyLayer.render2();
    this.trajLayer.render2();
};

NegSnellFrame.prototype.zoom = function (e, combo) {
    switch (combo) {
        case "r":
            this.d.tm.setDisplayBox(this.initialDisplayBox);
            break;
        default:
            this.d.tm.scale(config.zoomScaleMap[combo]);
    }
    this.polyLayer.render2();
    this.trajLayer.render2();
};

NegSnellFrame.prototype.setZoomBox = function () {
    this.zoomBox = this.d.component.paper.rect(0, 0, 0, 0);
};

NegSnellFrame.prototype.moveTrajPoints = function (e, combo) {
    const combos = combo.split("+");
    const alsoStartPoint = combos.length === 2;
    const dir = combos.length === 2 ?
        config.directionMap[combos[1]] :
        config.directionMap[combos[0]];

    /*
     * Dir:
     * 0 -> up
     * 1 -> left
     * 2 -> down
     * 3 -> right
     */

    switch (dir) {
        case 0:
            this.trajLayer.shiftEndPointUp(config.nudgeAmt, alsoStartPoint);
            break;
        case 1:
            this.trajLayer.shiftEndPointRight(-config.nudgeAmt, alsoStartPoint);
            break;
        case 2:
            this.trajLayer.shiftEndPointUp(-config.nudgeAmt, alsoStartPoint);
            break;
        case 3:
            this.trajLayer.shiftEndPointRight(config.nudgeAmt, alsoStartPoint);
            break;
        default:
            throw new Error("Error: invalid direction");
    }

    this.trajLayer.render();
};

NegSnellFrame.prototype.mouseEvent = function (e) {
    switch (e.type) {
        case "mousedown":
            if (e.ctrlKey) {
                this.fixX = e.clientX;
                this.fixY = e.clientY;
                this.zoomBox = this.d.component.paper.rect(this.fixX, this.fixY, 0, 0);
                this.zoomBox.attr({"stroke": config.zoomBoxStrokeColor});
            }
            break;
        case "mousemove":
            if (this.zoomBox !== null) {
                const dragX = e.clientX;
                const dragY = e.clientY;
                const minX = this.fixX > dragX ? dragX : this.fixX;
                const minY = this.fixY > dragY ? dragY : this.fixY;
                const maxX = this.fixX > dragX ? this.fixX : dragX;
                const maxY = this.fixY > dragY ? this.fixY : dragY;

                this.zoomBox.attr({
                    "x": minX,
                    "y": minY,
                    "width": maxX - minX,
                    "height": maxY - minY
                });
            }
            break;
        case "mouseup":
            if (this.zoomBox !== null) {
                const mathUpperLeft = this.d.tm.toMathCoordinates(new Point(
                    this.zoomBox.attr("x"),
                    this.zoomBox.attr("y")
                ));
                const mathLowerRight = this.d.tm.toMathCoordinates(new Point(
                    this.zoomBox.attr("x") + this.zoomBox.attr("width"),
                    this.zoomBox.attr("y") + this.zoomBox.attr("height")
                ));

                const newDisp = new Rectangle(
                    mathUpperLeft.getX(),
                    mathLowerRight.getY(),
                    mathLowerRight.getX() - mathUpperLeft.getX(),
                    mathLowerRight.getY() - mathUpperLeft.getY()
                );
                this.d.tm.setDisplayBox(newDisp);
                this.trajLayer.render2();
                this.polyLayer.render2();
                this.zoomBox.remove();
                this.zoomBox = null;
            }
            break;
        default:
    }
};

NegSnellFrame.prototype.toggleHelpBox = function () {
    if ($("#my-modal").attr("aria-hidden") === "true") {
        $("#help-popup").fadeToggle();
    }
};

NegSnellFrame.prototype.setIterations = function (iterations) {
    this.trajLayer.setIterations(iterations);
    this.trajLayer.render();
};
