function ParallelogramTiling(x, y){
 this.x = x;
 this.y = y;
}

ParallelogramTiling.prototype.getParallelogram = function(a,b){
 return new Parallelogram(this,a,b); 
}

ParallelogramTiling.prototype.toString = function(){
 return "ParallelogramTiling " + this.x.toString() + " " + this.y.toString();
}