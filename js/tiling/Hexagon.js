/*
 * For use in HexagonTriangleTiling
 */


function Hexagon(tiling, a, b){
    
    TilingPolygon.call(this);
    this.tiling = tiling;
    this.a = a;
    this.b = b;
    console.log(this.tiling);
    
    /**
     * Hexagon Vertices
     */
    this.hv = [
        new Point(1, 0),
        new Point(0.5, Math.sqrt(3) / 2),
        new Point(-0.5, Math.sqrt(3) / 2),
        new Point(-1, 0),
        new Point(-0.5, -Math.sqrt(3) / 2),
        new Point(0.5, -Math.sqrt(3) / 2)
    ];
}

Hexagon.prototype = Object.create(TilingPolygon.prototype);

Hexagon.prototype.numSides = function(){
    return 6;
}
 
Hexagon.prototype.getVertex = function(i){  
  return this.hv[i].add(this.tiling.xt.scale(this.a)).add(this.tiling.yt.scale(this.b));
}
  
Hexagon.prototype.getOpposite = function(i){
  switch (i) {
                case 0:
                    return new TilingEdge(new DownTriangle(this.tiling, this.a, this.b), 2); break;
                case 1:
                    return new TilingEdge(new UpTriangle(this.tiling, this.a, this.b + 1), 1); break;
                case 2:
                    return new TilingEdge(new DownTriangle(this.tiling, this.a - 1, this.b), 0); break;
                case 3:
                    return new TilingEdge(new UpTriangle(this.tiling, this.a - 1, this.b), 2); break;
                case 4:
                    return new TilingEdge(new DownTriangle(this.tiling, this.a - 1, this.b - 1), 1); break;
                case 5:
                    return new TilingEdge(new UpTriangle(this.tiling, this.a, this.b), 0); break;
                default: 
                    throw new Error("Called getOpposite() on a Hexagon with invalid i="+i);
            }
            return null;
}
  
Hexagon.prototype.tilingToString = function(){
  return this.tiling.toString();
}
  
Hexagon.prototype.compareTo = function(p){
    return HexagonTriangleTiling.compare(this, p);
}