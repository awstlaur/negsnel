var Geometry = {
  
  triangleSign: function(x,y,z){
   var a = y.getX() - x.getX();
   var b = y.getY() - x.getY();
   var c = z.getX() - x.getX();
   var d = z.getY() - x.getY();
   var out = (a*d - b*c); 
   return Geometry.signum(out);
  },
  
  /**
    * Return true of p is on the right when walking from the start of s to the
    * end of s.
    */
  rightOf: function(s,p){
    return (Geometry.triangleSign(s.start(), p, s.end()) > 0);
  },
  
  lengthSquared: function(s){
    return (s.start().getX() - s.end().getX()) * (s.start().getX() - s.end().getX()) + (s.start().getY() - s.end().getY()) * (s.start().getY() - s.end().getY());
  },
  
  reflectIn: function(s,p){
    var q=p.subtract(s.start());
    var diff=s.end().subtract(s.start());
    return q.cxMult(diff.cxConj()).cxConj().cxMult(diff).scale(1/diff.normSquared()).add(s.start());
  },

  reflectDir: function(s,dir){
    var diff=s.end().subtract(s.start());
    return dir.cxMult(diff.cxConj()).cxConj().cxMult(diff).scale(1/diff.normSquared());
  },
  
  signum: function(i){
     return (i === 0) ? 0 : (i > 0) ? 1 : -1; 
  }
    
}