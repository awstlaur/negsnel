/*
 * For use in TriangleTiling
 */


function UpTriangle(tiling, a, b){    
    TriangleTilingPolygon.call(this, tiling, a, b);          
}


UpTriangle.prototype = Object.create(TriangleTilingPolygon.prototype);

UpTriangle.prototype.numSides = function(){
    return 3;
}
  
UpTriangle.prototype.getOpposite = function(i){
  switch (i) {      
        case 0: return new TilingEdge(new DownTriangle(this.tiling, this.a, this.b-1),1); break;
        case 1: return new TilingEdge(new DownTriangle(this.tiling, this.a, this.b),2); break;
        case 2: return new TilingEdge(new DownTriangle(this.tiling, this.a-1, this.b),0); break;
        default:
            throw new Error("Called getOpposite() on a UpTriangle with invalid i="+i);
            }
}

UpTriangle.prototype.getVertex = function(i){
    switch (i) {
        case 0: return new Point(this.a+this.b*this.tiling.x, this.b*this.tiling.y);
        case 1: return new Point(this.a+this.b*this.tiling.x+1, this.b*this.tiling.y);
        case 2: return new Point(this.a+(this.b+1)*this.tiling.x,(this.b+1)*this.tiling.y);
        default: 
            throw new Error("Called getVertex() with invalid i.");
    }
}