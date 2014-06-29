function TriangleTiling(x,y){
    /** Construct the triangulated-parallelogram tiling including the polygon with vertices
     * (0,0), (1,0), and (X,Y).
     */
 this.x = x;
 this.y = y;
}

TriangleTiling.prototype.getUpTriangle = function(a,b){
 return new UpTriangle(this, a, b);   
}