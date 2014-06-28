function TrajectoryLayer(data){
 this.d = data;
 this.s = null;
 this.e = null;
;
 this.traj = [];
 this.polys = [];
 this.L = config.trajectoryIters;
 this.R = config.trajectoryEndpointRadius;
 this.orbitColor = config.orbitColor;
//this.plotLengthChangeRectangle = null; //?? 
 
 this.trajectoryPath = null;
 this.polygonPathSet = [];
 this.circles = [];
 
 this.reset();  
}

TrajectoryLayer.prototype.reset = function(){
  this.s = this.d.p.getCenterOfMass();
  var edge = this.d.p.getEdge(0);
  this.e = edge.start().scale(2).add(edge.end()).scale(1 / 3);
  this.traj = [];
  this.polys = [];

  
  this.trajectoryPath = null;
  this.polygonPathSet = [];
  this.circles = [];
}

TrajectoryLayer.prototype.computeTrajectory = function(){ 
  this.clearLayerObjects();
  
  this.trajectoryPath = null;
  this.polygonPathSet = []; 
  this.circles = [];
  
  this.traj = [];
  this.polys = [];
  this.traj.push(this.s);
  var o = new Orbit(this.d.p, this.s, this.e);
  var keepGoing = true;
  while(this.traj.length <= this.L && keepGoing){
   this.polys.push(o.getPolygon());
   var pt = o.next();
   if(pt == null){ // === null OR === undefined
     keepGoing = false;
   } else {
     this.traj.push(pt);
   }
  }
  
}

TrajectoryLayer.prototype.render = function(){
 this.computeTrajectory();
 
 var self = this;
 this.polys.forEach(function(poly){
    var path = self.d.component.paper.path(poly.getPath().toString());
    path.attr({stroke:config.polyStrokeColor});
    path.transform(self.d.tm.transformString());
    self.polygonPathSet.push(path);
 });
 var first = this.traj[0];
 var trajectoryPathString = "M" + first.getX().toString() + "," + first.getY().toString()
 for(var i = 1; i < this.traj.length; i++){
  current = this.traj[i];
  trajectoryPathString += ("L" + current.getX().toString() + "," + current.getY().toString());
 }
 this.trajectoryPath = this.d.component.paper.path(trajectoryPathString);
 this.trajectoryPath.attr({stroke:config.orbitColor});
 this.trajectoryPath.transform(this.d.tm.transformString());
 
 if(this.traj.length > 1){
  var mathCoordCenter = this.traj[this.traj.length - 1]
  var endPtOfPlot = this.d.tm.toScreenCoordinates(mathCoordCenter);
  var endCircle = this.d.component.paper.ellipse(endPtOfPlot.getX(), endPtOfPlot.getY(), this.R, this.R);
  endCircle.attr({fill:config.endTrajectoryColor});  
  this.circles.push([endCircle, mathCoordCenter]);
 }
 
 var ss = this.d.tm.toScreenCoordinates(this.s);
 var ee = this.d.tm.toScreenCoordinates(this.e);
 var sCircle = this.d.component.paper.ellipse(ss.getX(), ss.getY(), this.R, this.R);
 var eCircle = this.d.component.paper.ellipse(ee.getX(), ee.getY(), this.R, this.R);
 sCircle.attr({fill:config.startCircleColor});
 eCircle.attr({fill:config.endCircleColor});

 //set drag events and add pointers to stuff from this which will be needed for the drag event
 sCircle.drag(this.dragEvents.move, this.dragEvents.start, this.dragEvents.end);
 eCircle.drag(this.dragEvents.move, this.dragEvents.start, this.dragEvents.end);
 sCircle.layer = this;
 eCircle.layer = this;
 sCircle.pointObject = this.s;
 eCircle.pointObject = this.e;
 sCircle.tm = this.d.tm;
 eCircle.tm = this.d.tm;
 sCircle.canEscapePolygon = false;
 eCircle.canEscapePolygon = true;
 
 this.circles.push([sCircle, this.s]);
 this.circles.push([eCircle, this.e]);
}

TrajectoryLayer.prototype.render2 = function(){
  var self = this;
 this.polygonPathSet.forEach(function(path){
   path.transform("");
   path.transform(self.d.tm.transformString());
 });
 
 this.circles.forEach(function(c){
   var newLocation = self.d.tm.toScreenCoordinates(c[1]);
   c[0].attr({cx:newLocation.getX(), cy:newLocation.getY()});
 });
 
 this.trajectoryPath.transform("");
 this.trajectoryPath.transform(this.d.tm.transformString());
}

TrajectoryLayer.prototype.clearLayerObjects = function(){
 if(this.trajectoryPath !== null){
   this.trajectoryPath.remove();
 }
 this.polygonPathSet.forEach(function(path){
   path.remove();
 });
 this.circles.forEach(function(c){
   c[0].undrag();
   c[0].remove();
 });
}

TrajectoryLayer.prototype.shiftEndPointRight = function(shiftingConstant, alsoStartPoint){
 if(alsoStartPoint){
  var possibleNewStartPoint = new Point(this.s.getX() + shiftingConstant, this.s.getY());
  if(this.pointInsideStartPolygon(possibleNewStartPoint)){
    this.s = possibleNewStartPoint;
  }
 }
 var x = this.e.getX();
 var y = this.e.getY();
 this.e = new Point(x+shiftingConstant, y);
 
}

TrajectoryLayer.prototype.shiftEndPointUp = function(shiftingConstant, alsoStartPoint){
 if(alsoStartPoint){
  var possibleNewStartPoint = new Point(this.s.getX(), this.s.getY() - shiftingConstant);
  if(this.pointInsideStartPolygon(possibleNewStartPoint)){
    this.s = possibleNewStartPoint;
  }
 }
 var x = this.e.getX();
 var y = this.e.getY();
 this.e = new Point(x, y - shiftingConstant);
 
}

TrajectoryLayer.prototype.pointInsideStartPolygon = function(pt){
  for (var i = 0; i < this.d.p.numSides(); i++) {
        var edge = this.d.p.getEdge(i);
        if (Geometry.rightOf(edge, pt)) {
            return false;
        }
  }
  return true;
}

TrajectoryLayer.prototype.dragEvents = {
  //this refers to the element being dragged
  
 start: function(){
  this.preDragFill = this.attr("fill");
  this.ox = this.attr("cx");
  this.oy = this.attr("cy");
  this.attr({fill:config.draggingCircleColor});
 },
 
 move: function(dx,dy){
   var allow = this.canEscapePolygon || this.layer.pointInsideStartPolygon(this.tm.toMathCoordinates(new Point(this.ox + dx, this.oy + dy)));
   if(allow){
     this.attr({cx: this.ox + dx, cy:this.oy + dy});
   }
 },
 
 end: function(){  
   this.attr({fill:this.preDragFill}); 
   var newPt = this.tm.toMathCoordinates(new Point(this.attr("cx"), this.attr("cy")));
   this.pointObject.x = newPt.getX();
   this.pointObject.y = newPt.getY();
   this.layer.render();
 }
  
  
}





