function TriangleTiling(x,y){
    /** Construct the triangulated-parallelogram tiling including the polygon with vertices
     * (0,0), (1,0), and (X,Y).
     */
  this.x = x;
  this.y = y;
}

TriangleTiling.prototype.getOriginPolygon = function(){
  return new UpTriangle(this, 0,0);   
};

TriangleTiling.prototype.fromParameters = function(params){
  var L = params[0];
  var theta = params[1]*Math.PI/180;
  return new TriangleTiling(L*Math.cos(theta),L*Math.sin(theta));
};
TriangleTiling.prototype.fromAngles = function(params){
  var phi = params[0]*Math.PI/180;
  var theta = params[1]*Math.PI/180;
  return new TriangleTiling(Math.tan(phi)/(Math.tan(theta) + Math.tan(phi)),
                                      (Math.tan(phi)*Math.tan(theta))/(Math.tan(theta)+Math.tan(phi)));
};
