function AffineTransform(){
  this.m = {
    00: 1,
    01: 0,
    02: 0,
    10: 0,
    11: 1,
    12: 0
  }; //identity transformation
}

AffineTransform.prototype.setM = function(m){
  this.m = m; 
};

AffineTransform.prototype.setScaleInstance = function(x,y){
  this.m = {
    00: x,
    01: 0,
    02: 0,
    10: 0,
    11: y,
    12: 0     
  };
};

AffineTransform.prototype.setTranslateInstance = function(x,y){
  this.m = {
    00: 1,
    01: 0,
    02: x,
    10: 0,
    11: 1,
    12: y     
  };
};

AffineTransform.prototype.preConcatenate = function(other){
  var T = other.m;
  var m = this.m;
  this.m = {
    00: T[00]*m[00] + T[01]*m[01],
    01: T[00]*m[01] + T[01]*m[11],
    02: T[00]*m[02] + T[01]*m[12] + T[02],
    10: T[10]*m[00] + T[11]*m[01],
    11: T[10]*m[01] + T[11]*m[11],
    12: T[10]*m[02] + T[11]*m[12] + T[12]   
  };
};

AffineTransform.prototype.transform = function(pt){
  var x = pt.getX();
  var y = pt.getY();
  var m = this.m;
  return new Point(m[00]*x + m[01]*y + m[02], m[10]*x + m[11]*y + m[12]);
};

AffineTransform.prototype.inverseTransform = function(pt){
  var x = pt.getX();
  var y = pt.getY();
  var m = this.m;
  var D = m[00]*m[11] - m[01]*m[10];
  if(!D){throw new Error('Error: non-invertible affine transform.');}
  return new Point((m[11]*x-m[01]*y+(m[01]*m[12]-m[02]*m[11]))/D, (-m[10]*x + m[00]*y + (m[02]*m[10] - m[00]*m[12]))/D);
};

AffineTransform.prototype.transformPath = function(pathToCopy){
  var path = pathToCopy.copy();
  for(var i = 0; i < path.xValues.length; i++){
    var curr = new Point(path.xValues[i], path.yValues[i]);
    var newPt = this.transform(curr);
    path.xValues[i] = newPt.getX();
    path.yValues[i] = newPt.getY();
  }
  return path;
};

AffineTransform.prototype.copy = function(){
  var out =  new AffineTransform();
  out.setM(this.m);
  return out;
};
