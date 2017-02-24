function BrickTiling(t){
  this.t = t; 
}

BrickTiling.prototype.getOriginPolygon = function(){
  return new Brick(this,0,0); 
};

BrickTiling.prototype.toString = function(){
  return 'BrickTiling ' + this.t.toString(); 
};

BrickTiling.prototype.fromParameters = function(params){
  var t = params[0];
  return new BrickTiling(t);   
};
