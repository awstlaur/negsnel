/* this object wraps our paper/screen object, to provide a level of graphics-agnosticism */

function Component(paper){
  this.paper = paper;
}

Component.prototype.getWidth = function(){
  return this.paper.width; 
};

Component.prototype.getHeight = function(){
  return this.paper.height; 
};

Component.prototype.setBackgroundColor = function(hexColor){  
  this.paper.canvas.style.backgroundColor = hexColor; 
};

Component.prototype.setViewBox = function(rect){
  this.paper.setViewBox(rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight(), false);
};

Component.prototype.hexColor = function(colorString){
  var colorObj = Raphael.color(colorString);
  if(colorObj.error){
    throw new Error('Error: invalid color'); 
  }else{
    return colorObj.hex;
  }
};
