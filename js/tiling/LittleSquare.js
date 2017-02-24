function LittleSquare(tiling,a,b){
  Square.call(this,tiling,a,b);
  this.v = [
    new Point(this.tiling.m, 0),
    new Point(this.tiling.m+this.tiling.n, 0),
    new Point(this.tiling.m+this.tiling.n, this.tiling.n),
    new Point(this.tiling.m, this.tiling.n)
  ];
}

LittleSquare.prototype = Object.create(Square.prototype);

LittleSquare.prototype.numSides = function(){
  return 4;
};
 
// LittleSquare.prototype.getVertex = function(i){
//   switch (i) {
//                 case 0: return this.translate(this.tiling.m,0); break;
//                 case 1: return this.translate(this.tiling.m+this.tiling.n,0); break;
//                 case 2: return this.translate(this.tiling.m+this.tiling.n,this.tiling.n); break;
//                 case 3: return this.translate(this.tiling.m,this.tiling.n); break;
//                 default: throw new Error("Called getVertex() with invalid i.");
//         }
// }
  
LittleSquare.prototype.getOpposite = function(i){
  switch (i) {
  case 0: return new TilingEdge(new BigSquare(this.tiling, this.a,this.b-1), 4);
  case 1: return new TilingEdge(new BigSquare(this.tiling, this.a+1,this.b-1), 6);
  case 2: return new TilingEdge(new BigSquare(this.tiling, this.a+1,this.b), 0);
  case 3: return new TilingEdge(new BigSquare(this.tiling, this.a,this.b), 2);
  default: 
    throw new Error('Called getOpposite() with invalid i.');
  }
};  
