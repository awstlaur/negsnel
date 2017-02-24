function Point(x,y) {
  this.x=x;
  this.y=y;
}
    
Point.prototype.getX = function() {
  return this.x;
};

Point.prototype.getY = function() {
  return this.y;
};
    
    /** return the vector obtained by subtracting v from this vector. */
Point.prototype.subtract = function(v) {
  return new Point(this.x-v.x, this.y-v.y);
};
    
    /** return the vector obtained by adding v to this vector. */
Point.prototype.add = function(v) {
  return new Point(this.x+v.x, this.y+v.y);
};
    
Point.prototype.rotate90Clockwise = function() {
  return new Point(this.y, -this.x);
};
    
Point.prototype.rotate90CounterClockwise = function() {
  return new Point(-this.y, this.x);
};
    
Point.prototype.dot = function(v){
  return this.x*v.x+this.y*v.y;
};
    
Point.prototype.scale = function(lambda) {
  return new Point(lambda*this.x, lambda*this.y);
};
    
Point.prototype.normalize = function() {
  return this.scale(1/this.norm());
};
    
Point.prototype.neg = function() {
  return new Point(-this.x,-this.y);
};

Point.prototype.toString = function() {
  return '(' + this.x.toString() + ', ' + this.y.toString() + ')';
};
    
Point.prototype.midpoint = function(another) {
  return new Point((this.x+another.x)/2, (this.y+another.y)/2);
};        
    
Point.prototype.join = function(p) {
  return new Line(this.y-p.y,p.x-this.x,this.x*p.y-this.y*p.x);
};
    
Point.prototype.cxConj = function() {
  return new Point(this.x,-this.y);
};
    
Point.prototype.normSquared = function() {
  return this.x*this.x+this.y*this.y;
};
    
Point.prototype.norm = function() {
  return Math.sqrt(this.normSquared());
};
    
Point.prototype.cxInv = function() {
  return this.cxConj().scale(1/this.normSquared());
};
    
Point.prototype.cxMult = function(p) {
  return new Point(this.x*p.x-this.y*p.y,this.x*p.y+this.y*p.x);
};
