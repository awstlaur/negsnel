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

Parallelogram.prototype.fromParameters = function(id, params){
    var L = params[0];
    var theta = params[1];
    return new ParallelogramTiling(L*Math.cos(theta*Math.PI/180),L*Math.sin(theta*Math.PI/180));        
}