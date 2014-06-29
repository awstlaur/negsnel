/*
 * For use in TriangleTiling
 */


function DownTriangle(tiling, a, b){    
    TriangleTilingPolygon.call(this, tiling, a, b);          
}


DownTriangle.prototype = Object.create(TriangleTilingPolygon.prototype);

DownTriangle.prototype.numSides = function(){
    return 3;
}
  
DownTriangle.prototype.getOpposite = function(i){
  switch (i) {
        case 0: return new TilingEdge(new UpTriangle(this.tiling, this.a+1, this.b),2); break;
        case 1: return new TilingEdge(new UpTriangle(this.tiling, this.a, this.b+1),0); break;
        case 2: return new TilingEdge(new UpTriangle(this.tiling, this.a, this.b),1); break;
        default:
            throw new Error("Called getOpposite() on a DownTriangle with invalid i="+i);
            }
}

DownTriangle.prototype.getVertex = function(i){
    switch (i) {
        case 0: return new Point(this.a+this.b*this.tiling.x+1, this.b*this.tiling.y);
        case 1: return new Point(this.a+(this.b+1)*this.tiling.x +1, (this.b+1)*this.tiling.y);
        case 2: return new Point(this.a+(this.b+1)*this.tiling.x,(this.b+1)*this.tiling.y);
        default: 
            throw new Error("Called getVertex() with invalid i.");
    }
}