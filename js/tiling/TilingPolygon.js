//"abstract class"

function TilingPolygon(){
  this.tiling = null;
}

  
    
TilingPolygon.prototype.getV = function(i){
  var j = i % this.numSides();
  if(j<0){
    return this.getVertex(j+this.numSides());
  }else{
    return this.getVertex(j);
  }
};

TilingPolygon.prototype.getEdge = function(i){
  return new TilingEdge(this,i);
};

TilingPolygon.prototype.getO = function(i){
  var j = i% this.numSides();
  if(j<0){
    return this.getOpposite(j+this.numSides());
  }else{
    return this.getOpposite(j);
  }
};

TilingPolygon.prototype.getPath = function(){
  var g = new GeneralPath();
  var p = this.getVertex(0);
  g.moveTo(p.getX(), p.getY());
  for (var i=1; i<this.numSides(); i++){
    p = this.getVertex(i);
    g.lineTo(p.getX(), p.getY());
  }
  g.closePath();
  return g;
};

TilingPolygon.prototype.getCenterOfMass = function(){
  var cx = 0.0;
  var cy = 0.0;
  var n = this.numSides();
  for(var i=0; i<n; i++){
    var v=this.getVertex(i);
    cx+=v.getX();
    cy+=v.getY();
  }
  return new Point(cx/n, cy/n);
};

TilingPolygon.prototype.tilingToString = function(){
  return this.tiling.toString();
};

/* 
.prototype.numSides = function(){
  
  }
 
.prototype.getVertex = function(i){
  
  }
  
.prototype.getOpposite = function(i){
  
  }
  
.prototype.tilingToString = function(){
  
  }
  
.prototype.compareTo = function(other){
  
}

*/
