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