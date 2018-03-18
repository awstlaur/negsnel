import config from "./config";

/**
 *
 * @param {*} data
 */
export default function PolygonLayer (data) {
    this.d = data;
    this.p = null;
}

PolygonLayer.prototype.render = function () {
    this.p = this.d.component.paper.path(this.d.p.getPath().toString());
    this.p.transform(this.d.tm.transformString());
    this.p.attr({
        "fill": config.polyColor,
        "stroke": config.polyStrokeColor
    });
};

PolygonLayer.prototype.render2 = function () {
    this.p.transform("");
    this.p.transform(this.d.tm.transformString());
};

PolygonLayer.prototype.clear = function () {
    const copy = this.p.copy();
    this.d.component.paper.remove(this.p);
    this.p = copy();
};
