/*
 * For use in HexagonTriangleTiling
 */


function DownTriangle(tiling, a, b){
    
    HexagonTriangleTilingPolygon.call(this, tiling, a, b);    
    
    /*
     * Downward pointing Triangle Vertices
     */
    this.v = [
        new Point(1, 0),
        new Point(1.5, Math.sqrt(3) / 2),
        new Point(0.5, Math.sqrt(3) / 2)        
    ];
    
}


DownTriangle.prototype = Object.create(HexagonTriangleTilingPolygon.prototype);

DownTriangle.prototype.numSides = function(){
    return 3;
}
  
DownTriangle.prototype.getOpposite = function(i){
  switch (i) {
        case 0:
            return new TilingEdge(new Hexagon(this.tiling, this.a + 1, this.b), 2);
        case 1:
            return new TilingEdge(new Hexagon(this.tiling, this.a + 1, this.b + 1), 4);
        case 2:
            return new TilingEdge(new Hexagon(this.tiling, this.a, this.b), 0);
        default:
            throw new Error("Called getOpposite() on a UpTriangle with invalid i="+i);
            }
}