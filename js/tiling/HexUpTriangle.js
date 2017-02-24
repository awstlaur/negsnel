/*
 * For use in HexagonTriangleTiling
 */


function HexUpTriangle(tiling, a, b){
    
  HexagonTriangleTilingPolygon.call(this, tiling, a, b);
    
    
    /**
     * Upward pointing Triangle Vertices
     */
  this.v = [
    new Point(1, 0),
    new Point(.5, -Math.sqrt(3) / 2),
    new Point(1.5, -Math.sqrt(3) / 2)        
  ];
    
}


HexUpTriangle.prototype = Object.create(HexagonTriangleTilingPolygon.prototype);

HexUpTriangle.prototype.numSides = function(){
  return 3;
};
   
HexUpTriangle.prototype.getOpposite = function(i){
  switch (i) {
  case 0:
    return new TilingEdge(new Hexagon(this.tiling, this.a, this.b), 5); break;
  case 1:
    return new TilingEdge(new Hexagon(this.tiling, this.a, this.b - 1), 1); break;
  case 2:
    return new TilingEdge(new Hexagon(this.tiling, this.a + 1, this.b), 3); break;
  default:
    throw new Error('Called getOpposite() on a HexUpTriangle with invalid i='+i);
  }
};
