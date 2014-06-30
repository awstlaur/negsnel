function TriangleTiling(x,y){
    /** Construct the triangulated-parallelogram tiling including the polygon with vertices
     * (0,0), (1,0), and (X,Y).
     */
 this.x = x;
 this.y = y;
}

TriangleTiling.prototype.getOriginPolygon = function(){
 return new UpTriangle(this, 0,0);   
}

TriangleTiling.prototype.fromParameters = function(id, params){
    switch(id){
        case "triangle":
            var L = params[0];
            var theta = params[1];
            return new TriangleTiling(L*Math.cos(theta*Math.PI/180),L*Math.sin(theta*Math.PI/180));
            break;
        case "triangle-angles":
            var phi = params[0];
            var theta = params[1];
            return new TriangleTiling(Math.tan(phi)/(Math.tan(theta) + Math.tan(phi)),
                                      (Math.tan(phi)*Math.tan(theta))/(Math.tan(theta)+Math.tan(phi)));
            break;
        default:
            throw new Error('TriangleTiling.fromParameters called on something which isn\'t triangles');
    }
}