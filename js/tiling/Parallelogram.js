function Parallelogram(tiling,a,b){
  TilingPolygon.call(this);
  this.tiling = tiling;
  this.a = a;
  this.b = b;
}

Parallelogram.prototype = Object.create(TilingPolygon.prototype);

Parallelogram.prototype.numSides = function(){
    return 4;
}
 
Parallelogram.prototype.getVertex = function(i){
  switch (i) {
            case 0: return new Point(this.a+this.b*this.tiling.x, this.b*this.tiling.y); break;
            case 1: return new Point(this.a+this.b*this.tiling.x+1, this.b*this.tiling.y); break;
            case 2: return new Point(this.a+(this.b+1)*this.tiling.x+1,(this.b+1)*this.tiling.y); break;
            case 3: return new Point(this.a+(this.b+1)*this.tiling.x, (this.b+1)*this.tiling.y); break;
            default: 
                throw new Error("Called getVertex() on a Parallelogram with invalid i="+i);
        }
}
  
Parallelogram.prototype.getOpposite = function(i){
  switch (i) {
            case 0: return new TilingEdge(this.tiling.getParallelogram(this.a, this.b-1),2);
            case 1: return new TilingEdge(this.tiling.getParallelogram(this.a+1, this.b),3);
            case 2: return new TilingEdge(this.tiling.getParallelogram(this.a, this.b+1),0);
            case 3: return new TilingEdge(this.tiling.getParallelogram(this.a-1, this.b),1);
            default: 
                throw new Error("Called getOpposite() with invalid i.");
        }
}  
  
Parallelogram.prototype.compareTo = function(p){
  if (this.a > p.a){
      return 1;
  } else if (this.a < p.a){
      return -1;
  } else if (this.b > p.b){
      return 1;
  } else if (this.b < p.b){ 
      return -1;
  } else {
      return 0;
  }
}