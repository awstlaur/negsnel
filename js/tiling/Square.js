/*
 * TwoSquareTiling Polygon
 */

function Square(tiling, a,b){
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;
    
}

Square.prototype = Object.create(TilingPolygon.prototype);

Square.prototype.translate = function(x,y){
    return new Point(x + this.a*this.tiling.m - this.b*this.tiling.n, y + this.a*this.tiling.n + this.b*this.tiling.m);
}