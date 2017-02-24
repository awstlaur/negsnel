function PolygonLayer(data){
  Layer.call(this);
  this.d = data;
  this.p = null;
}

PolygonLayer.prototype = Object.create(Layer.prototype);
PolygonLayer.prototype.constructor = PolygonLayer;

PolygonLayer.prototype.render = function(){
 //console.log("render");
 
  this.p = this.d.component.paper.path(this.d.p.getPath().toString());
  this.p.transform(this.d.tm.transformString());
  this.p.attr({fill:config.polyColor, stroke:config.polyStrokeColor});
 
 //console.log(this.d.p.getPath().toString());
 //console.log(this.d.tm.transformString());
 
};

PolygonLayer.prototype.render2 = function(){
 
 //this.p.transform("...T50,50");
 //console.log("dfljsbdfsadf");  
  this.p.transform('');
  this.p.transform(this.d.tm.transformString());
 
 
};

PolygonLayer.prototype.clear = function(){
  var copy = this.p.copy();
  this.d.component.paper.remove(this.p);
  this.p = copy();
 //console.log("clear");
};
