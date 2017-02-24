function Orbit(starting_polygon, start, end) {        
    
  this.s = start;
  this.dir = end.subtract(this.s).normalize();

  this.edge = starting_polygon.getEdge(0); 
        //these two while loops find the tiling edge the first ray is pointing to  
        
  while (Geometry.triangleSign(end, this.edge.start(), this.s) <= 0) {
    this.edge = this.edge.nextEdge(); 
    if(this.edge.getI() === 0){
      throw new Error('WHAT IS HAPPENING') ;
      break;
    }
  }
  while (Geometry.triangleSign(end, this.edge.end(), this.s) > 0) {
    this.edge = this.edge.nextEdge();
  }
}
    
Orbit.prototype.getPolygon = function() {
  return this.edge.getPolygon();
};

Orbit.prototype.next = function() {
  var first = this.edge.getI();
  this.edge = this.edge.nextEdge();
  var e=this.s.add(this.dir);        
  while (Geometry.triangleSign(this.s, this.edge.end(), e) >= 0) {
    this.edge = this.edge.nextEdge();
    if (this.edge.getI() === first){// && !is_triangle) {                
      console.log('Error: Failed to continue path due to numerical errors!');
      return null;
    }
  }
  this.s = this.s.join(e).intersect(this.edge.toLine());
        // update direction
  this.dir=this.edge.reflectDir(this.dir).neg();
  this.edge = this.edge.opposite();        
  return this.s;
};
