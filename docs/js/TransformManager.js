function TransformManager(initialDisplayBox, component){
  this.displayBox = initialDisplayBox;
  this.currentTransform = new Raphael.matrix(1,0,0,0,1,0); //identity
  this.c = component;
}

TransformManager.prototype.getDisplayBox = function(){
  return this.displayBox; 
};

TransformManager.prototype.displayBoxString = function(){
  return this.displayBox.getX().toString().concat(' ',
                                                  this.displayBox.getY().toString(), ' ', 
                                                  this.displayBox.getWidth().toString(), ' ',
                                                  this.displayBox.getHeight().toString());
};

TransformManager.prototype.setDisplayBox = function(r){
  this.displayBox = r;
  this.updateTransform();
};

TransformManager.prototype.updateTransform = function(){

  var p = new Point(this.displayBox.getCenterX(),this.displayBox.getCenterY());
  var transform = Raphael.matrix();

  // The number scale is the minimal ratio of screen dimensions to bounding box dimensions.
  var scale;
  if ((this.displayBox.getWidth() !== 0) && (this.c.getWidth() !== 0)) {
    if ((this.displayBox.getHeight() !== 0) && (this.c.getHeight() !== 0)) {
      scale = Math.min(this.c.getWidth() / this.displayBox.getWidth(),
                  this.c.getHeight() / this.displayBox.getHeight());
    } else {
      scale = this.c.getWidth() / this.displayBox.getWidth();
    }
  } else {
    if ((this.displayBox.getHeight() !== 0) && (this.c.getHeight() !== 0)) {
      scale = this.c.getHeight() / this.displayBox.getHeight();
    } else {
      scale = 1;
    }
  }
  
  transform.scale(scale,scale);
  var centerDest = (new Point(transform.x(p.getX(), p.getY()), transform.y(p.getX(), p.getY())));
  
  var centerX = -centerDest.getX() + this.c.getWidth()/2;
  var centerY = -centerDest.getY() + this.c.getHeight()/2;
  transform.translate(centerX/scale,centerY/scale);
  
  var currString = transform.toTransformString();
  var cx = this.c.getWidth()/2;
  var cy = this.c.getHeight()/2;  
  currString += 'T' + cx + ',' + cy + 'S' + scale + ',' + scale + 'T' + (-cx).toString() + ',' + (-cy).toString();
      
  this.currentTransform = transform;
 
};

TransformManager.prototype.toScreenCoordinates = function(p){
  return new Point(this.currentTransform.x(p.getX(), p.getY()), this.currentTransform.y(p.getX(), p.getY()));
};

TransformManager.prototype.toMathCoordinates = function(p){
  var t = this.getInverseTransform();
  return new Point(t.x(p.getX(), p.getY()),t.y(p.getX(), p.getY()));
};

TransformManager.prototype.getTransform = function(){
  return this.currentTransform; 
};

TransformManager.prototype.getInverseTransform = function(){
  return this.currentTransform.invert(); 
};

TransformManager.prototype.transformString = function(){
  return this.currentTransform.toTransformString(); 
};

TransformManager.prototype.scale = function(scale, fix){
  if (scale > 0) {
    fix = (typeof fix === 'undefined') ? (new Point(this.displayBox.getCenterX(), this.displayBox.getCenterY())) : fix;
    this.setDisplayBox(new Rectangle(
          scale * (this.displayBox.getX() - fix.getX()) + fix.getX(),
          scale * (this.displayBox.getY() - fix.getY()) + fix.getY(),
          scale * this.displayBox.getWidth(),
          scale * this.displayBox.getHeight()));
  } 
};

TransformManager.prototype.shiftUp = function(shift){
  var amt = this.displayBox.getHeight()*config.screenShift;
  this.setDisplayBox(new Rectangle(
          this.displayBox.getX(),
          this.displayBox.getY()-shift*amt,
          this.displayBox.getWidth(),
          this.displayBox.getHeight()));  
};

TransformManager.prototype.shiftRight = function(shift){
  var amt = this.displayBox.getWidth()*config.screenShift;
  this.setDisplayBox(new Rectangle(
          this.displayBox.getX()+shift*amt,
          this.displayBox.getY(),
          this.displayBox.getWidth(),
          this.displayBox.getHeight()));  
};
