function GeneralPath(){
  /*2d path */
  this.xValues = [];
  this.yValues = [];
  this.startX = null;
  this.startY = null;
  this.closed = false;
}

GeneralPath.prototype.moveTo = function(x,y){
  this.xValues = [];
  this.yValues = [];
  this.xValues.push(x);
  this.yValues.push(y);
  this.closed = false;
  this.startX = x;
  this.startY = y;
}

GeneralPath.prototype.lineTo = function(x,y){
  if(closed){
    throw new Error("Attempting to manipulate a closed path.");
  }else{
    this.xValues.push(x);
    this.yValues.push(y);
  } 
}

GeneralPath.prototype.copy = function(){
 var out = new GeneralPath();
 out.xValues = this.xValues.slice(0);
 out.yValues = this.yValues.slice(0);
 out.startX = this.startX;
 out.startY = this.startY;
 out.closed = this.closed;
 return out;
}

GeneralPath.prototype.closePath = function(){
 this.closed = true;
 this.xValues.push(this.startX);
 this.yValues.push(this.startY); 
}

GeneralPath.prototype.toString = function(){
 var out = "M" + this.xValues[0].toString() + "," + this.yValues[0].toString();
 for(var i=1;i<this.xValues.length;i++){
  out = out + "L" + this.xValues[i].toString() +  "," + this.yValues[i].toString()
 }
 return out;
}

GeneralPath.prototype.getBoundingBox = function(){
 var box = Raphael.pathBBox(this.toString());
 return new Rectangle(box.x,box.y2,box.width,box.height);
}