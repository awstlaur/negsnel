/*
 * For use in HexagonTriangleTiling
 */


function DownTriangle(tiling, a, b){
    
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;
    
    
    /*
     * Downward pointing Triangle Vertices
     */
    this.dtv = [
        new Point(1, 0),
        new Point(1.5, Math.sqrt(3) / 2),
        new Point(0.5, Math.sqrt(3) / 2)        
    ];
    
}


DownTriangle.prototype = Object.create(TilingPolygon.prototype);

DownTriangle.prototype.numSides = function(){
    return 3;
}
 
DownTriangle.prototype.getVertex = function(i){
  return this.dtv[i].add(this.tiling.xt.scale(this.a)).add(this.tiling.yt.scale(this.b));
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
  
DownTriangle.prototype.tilingToString = function(){
  return this.tiling.toString();
}
  
DownTriangle.prototype.compareTo = function(p){
    return HexagonTriangleTiling.compare(this, p);
}