function ParallelogramTiling(x, y){
 this.x = x;
 this.y = y;
}

ParallelogramTiling.prototype.getOriginPolygon = function(){
 return new Parallelogram(this,0,0); 
}

ParallelogramTiling.prototype.toString = function(){
 return "ParallelogramTiling " + this.x.toString() + " " + this.y.toString();
}