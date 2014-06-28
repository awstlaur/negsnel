/*
 * For use in HexagonTriangleTiling
 */


function UpTriangle(tiling, a, b){
    
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;
    
    
    /**
     * Upward pointing Triangle Vertices
     */
    this.utv = [
        new Point(1, 0),
        new Point(.5, -Math.sqrt(3) / 2),
        new Point(1.5, -Math.sqrt(3) / 2)        
    ];
    
}


UpTriangle.prototype = Object.create(TilingPolygon.prototype);

UpTriangle.prototype.numSides = function(){
    return 3;
}
 
UpTriangle.prototype.getVertex = function(i){
  return this.utv[i].add(this.tiling.xt.scale(this.a)).add(this.tiling.yt.scale(this.b));
}
  
UpTriangle.prototype.getOpposite = function(i){
  switch (i) {
                case 0:
                    return new TilingEdge(new Hexagon(this.tiling, this.a, this.b), 5); break;
                case 1:
                    return new TilingEdge(new Hexagon(this.tiling, this.a, this.b - 1), 1); break;
                case 2:
                    return new TilingEdge(new Hexagon(this.tiling, this.a + 1, this.b), 3); break;
                default:
                    throw new Error("Called getOpposite() on a UpTriangle with invalid i="+i);
            }
}
  
UpTriangle.prototype.tilingToString = function(){
  return this.tiling.toString();
}
  
UpTriangle.prototype.compareTo = function(p){
    return HexagonTriangleTiling.compare(this, p);
}