/*
 * For use in HexagonTriangleTiling
 */


function Hexagon(tiling, a, b){
    
    HexagonTriangleTilingPolygon.call(this, tiling, a, b);
    
    /**
     * Hexagon Vertices
     */
    this.v = [
        new Point(1, 0),
        new Point(0.5, Math.sqrt(3) / 2),
        new Point(-0.5, Math.sqrt(3) / 2),
        new Point(-1, 0),
        new Point(-0.5, -Math.sqrt(3) / 2),
        new Point(0.5, -Math.sqrt(3) / 2)
    ];
}

Hexagon.prototype = Object.create(HexagonTriangleTilingPolygon.prototype);

Hexagon.prototype.numSides = function(){
    return 6;
}
 
Hexagon.prototype.getOpposite = function(i){
  switch (i) {
                case 0:
                    return new TilingEdge(new HexDownTriangle(this.tiling, this.a, this.b), 2); break;
                case 1:
                    return new TilingEdge(new HexUpTriangle(this.tiling, this.a, this.b + 1), 1); break;
                case 2:
                    return new TilingEdge(new HexDownTriangle(this.tiling, this.a - 1, this.b), 0); break;
                case 3:
                    return new TilingEdge(new HexUpTriangle(this.tiling, this.a - 1, this.b), 2); break;
                case 4:
                    return new TilingEdge(new HexDownTriangle(this.tiling, this.a - 1, this.b - 1), 1); break;
                case 5:
                    return new TilingEdge(new HexUpTriangle(this.tiling, this.a, this.b), 0); break;
                default: 
                    throw new Error("Called getOpposite() on a Hexagon with invalid i="+i);
            }
            return null;
}