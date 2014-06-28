function BrickTiling(t){
 this.t = t; 
}

BrickTiling.prototype.getBrick = function(a,b){
 return new Brick(this, a,b); 
}

BrickTiling.prototype.toString = function(){
 return "BrickTiling" + this.t.toString(); 
}