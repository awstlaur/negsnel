function Rectangle(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getX = function(){
  return this.x; 
};

Rectangle.prototype.getY = function(){
  return this.y; 
};

Rectangle.prototype.getWidth = function(){
  return this.width;
};

Rectangle.prototype.getHeight = function(){
  return this.height; 
};

Rectangle.prototype.getCenterX = function(){
  return this.getMinX() + this.width/2; 
};

Rectangle.prototype.getCenterY = function(){
  return this.getMinY() + this.height/2; 
};

Rectangle.prototype.getMinX = function(){
  return this.x;
};

Rectangle.prototype.getMinY = function(){
  return this.y - this.height;
};
