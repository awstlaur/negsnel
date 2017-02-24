/*
 * For use in TriangleTiling
 */


function UpTriangle(tiling, a, b){    
  TriangleTilingPolygon.call(this, tiling, a, b);
    
  this.v = [
    new Point(0,0),
    new Point(1,0),
    new Point(this.tiling.x, this.tiling.y)
  ];
  this.xt = new Point(1,0);
  this.yt = new Point(this.tiling.x, this.tiling.y);
}


UpTriangle.prototype = Object.create(TriangleTilingPolygon.prototype);

UpTriangle.prototype.numSides = function(){
  return 3;
};
  
UpTriangle.prototype.getOpposite = function(i){
  switch (i) {      
  case 0: return new TilingEdge(new DownTriangle(this.tiling, this.a, this.b-1),1); break;
  case 1: return new TilingEdge(new DownTriangle(this.tiling, this.a, this.b),2); break;
  case 2: return new TilingEdge(new DownTriangle(this.tiling, this.a-1, this.b),0); break;
  default:
    throw new Error('Called getOpposite() on a UpTriangle with invalid i='+i);
  }
};
