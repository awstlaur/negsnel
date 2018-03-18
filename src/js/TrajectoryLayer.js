import Geometry from "./tiling/Geometry";
import Orbit from "./Orbit";
import Point from "./tiling/Point";
import config from "./config";

/**
 *
 * @param {*} data
 */
export default function TrajectoryLayer (data) {
    this.d = data;
    this.s = null;
    this.e = null;

    this.traj = [];
    this.polys = [];
    this.L = config.trajectoryIters;
    this.R = config.trajectoryEndpointRadius;
    this.orbitColor = config.orbitColor;

    this.trajectoryPath = null;
    this.polygonPathSet = [];
    this.circles = [];

    this.reset();
}

TrajectoryLayer.prototype.reset = function () {
    this.s = this.d.p.getCenterOfMass();
    const edge = this.d.p.getEdge(0);
    this.e = edge.start().scale(2).
        add(edge.end()).
        scale(1 / 3);
    this.traj = [];
    this.polys = [];


    this.trajectoryPath = null;
    this.polygonPathSet = [];
    this.circles = [];
};

TrajectoryLayer.prototype.computeTrajectory = function () {
    this.clearLayerObjects();

    this.trajectoryPath = null;
    this.polygonPathSet = [];
    this.circles = [];

    this.traj = [];
    this.polys = [];
    this.traj.push(this.s);
    const o = new Orbit(this.d.p, this.s, this.e);
    let keepGoing = true;
    while (this.traj.length <= this.L && keepGoing) {
        this.polys.push(o.getPolygon());

        let pt = null;
        try {
            pt = o.next();
        }
        catch (e) {
            console.error(e); // eslint-disable-line no-console
        }

        if (pt) {
            this.traj.push(pt);
        }
        else {
            keepGoing = false;
        }
    }
};

TrajectoryLayer.prototype.setIterations = function (iterations) {
    this.L = iterations;
};

/**
 * Called initially and for major changes
 */
TrajectoryLayer.prototype.render = function () {
    this.computeTrajectory();

    this.polys.forEach((poly) => {
        const path = this.d.component.paper.path(poly.getPath().toString());
        path.attr({"stroke": config.polyStrokeColor});
        path.transform(this.d.tm.transformString());
        this.polygonPathSet.push(path);
    });
    const [first] = this.traj;
    let trajectoryPathString = `M${first.getX().toString()},${first.getY().toString()}`;
    for (let i = 1; i < this.traj.length; i++) {
        const current = this.traj[i];
        trajectoryPathString += `L${current.getX().toString()},${current.getY().toString()}`;
    }
    this.trajectoryPath = this.d.component.paper.path(trajectoryPathString);
    this.trajectoryPath.attr({"stroke": config.orbitColor});
    this.trajectoryPath.transform(this.d.tm.transformString());

    if (this.traj.length > 1) {
        const mathCoordCenter = this.traj[this.traj.length - 1];
        const endPtOfPlot = this.d.tm.toScreenCoordinates(mathCoordCenter);
        const endCircle = this.d.component.paper.ellipse(
            endPtOfPlot.getX(),
            endPtOfPlot.getY(),
            this.R,
            this.R
        );
        endCircle.attr({"fill": config.endTrajectoryColor});
        this.circles.push([
            endCircle, mathCoordCenter
        ]);
    }

    const ss = this.d.tm.toScreenCoordinates(this.s);
    const ee = this.d.tm.toScreenCoordinates(this.e);
    const sCircle = this.d.component.paper.ellipse(ss.getX(), ss.getY(), this.R, this.R);
    const eCircle = this.d.component.paper.ellipse(ee.getX(), ee.getY(), this.R, this.R);
    sCircle.attr({"fill": config.startCircleColor});
    eCircle.attr({"fill": config.endCircleColor});

    /*
     * Set drag events and add pointers to stuff from this which will be needed
     * for the drag event
     */
    sCircle.drag(this.dragEvents.move, this.dragEvents.start, this.dragEvents.end);
    eCircle.drag(this.dragEvents.move, this.dragEvents.start, this.dragEvents.end);
    sCircle.layer = this;
    eCircle.layer = this;
    sCircle.pointObject = this.s;
    eCircle.pointObject = this.e;
    sCircle.tm = this.d.tm;
    eCircle.tm = this.d.tm;
    sCircle.canEscapePolygon = false;
    eCircle.canEscapePolygon = true;

    this.circles.push([
        sCircle, this.s
    ]);
    this.circles.push([
        eCircle, this.e
    ]);
};

/**
 * Called for view changes (like zoom/pan)
 */
TrajectoryLayer.prototype.render2 = function () {
    this.polygonPathSet.forEach((path) => {
        path.transform("");
        path.transform(this.d.tm.transformString());
    });

    this.circles.forEach((c) => {
        const newLocation = this.d.tm.toScreenCoordinates(c[1]);
        c[0].attr({
            "cx": newLocation.getX(),
            "cy": newLocation.getY()
        });
    });

    this.trajectoryPath.transform("");
    this.trajectoryPath.transform(this.d.tm.transformString());
};

TrajectoryLayer.prototype.clearLayerObjects = function () {
    if (this.trajectoryPath !== null) {
        this.trajectoryPath.remove();
    }
    this.polygonPathSet.forEach((path) => {
        path.remove();
    });
    this.circles.forEach((c) => {
        c[0].undrag();
        c[0].remove();
    });
};

TrajectoryLayer.prototype.shiftEndPointRight = function (shiftingConstant, alsoStartPoint) {
    if (alsoStartPoint) {
        const possibleNewStartPoint = new Point(this.s.getX() + shiftingConstant, this.s.getY());
        if (this.pointInsideStartPolygon(possibleNewStartPoint)) {
            this.s = possibleNewStartPoint;
        }
    }
    const x = this.e.getX();
    const y = this.e.getY();
    this.e = new Point(x + shiftingConstant, y);
};

TrajectoryLayer.prototype.shiftEndPointUp = function (shiftingConstant, alsoStartPoint) {
    if (alsoStartPoint) {
        const possibleNewStartPoint = new Point(this.s.getX(), this.s.getY() - shiftingConstant);
        if (this.pointInsideStartPolygon(possibleNewStartPoint)) {
            this.s = possibleNewStartPoint;
        }
    }
    const x = this.e.getX();
    const y = this.e.getY();
    this.e = new Point(x, y - shiftingConstant);
};

TrajectoryLayer.prototype.pointInsideStartPolygon = function (pt) {
    for (let i = 0; i < this.d.p.numSides(); i++) {
        const edge = this.d.p.getEdge(i);
        if (Geometry.rightOf(edge, pt)) {
            return false;
        }
    }
    return true;
};

TrajectoryLayer.prototype.dragEvents = {

    /* This refers to the element being dragged */

    "start" () {
        this.preDragFill = this.attr("fill");
        this.ox = this.attr("cx");
        this.oy = this.attr("cy");
        this.attr({"fill": config.draggingCircleColor});
    },

    "move" (dx, dy) {
        const allow = this.canEscapePolygon ||
            this.layer.pointInsideStartPolygon(
                this.tm.toMathCoordinates(
                    new Point(this.ox + dx, this.oy + dy)
                )
            );
        if (allow) {
            this.attr({
                "cx": this.ox + dx,
                "cy": this.oy + dy
            });
        }
    },

    "end" () {
        this.attr({"fill": this.preDragFill});
        const newPt = this.tm.toMathCoordinates(new Point(this.attr("cx"), this.attr("cy")));
        this.pointObject.x = newPt.getX();
        this.pointObject.y = newPt.getY();
        this.layer.render();
    }


};
