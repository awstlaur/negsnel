function OctagonSquareTiling(){    
    
}

OctagonSquareTiling.prototype.getOctagon = function(a,b){
 return new Octagon(this,a,b); 
}

OctagonSquareTiling.prototype.toString = function(){
 return "OctagonSquareTiling"; 
}


OctagonSquareTiling.prototype.compare = function(t,t1) {
if (t instanceof Octagon) {
            if (t1 instanceof Octagon) {
                var h = t;
                var h1 = t1;
                var s = Geometry.signum(h.a - h1.a);
                if (s != 0) {
                    return s;
                }
                s = Geometry.signum(h.b - h1.b);
                return s;
            } else {
                return -1;
            }
        }
        if (t instanceof Square) {
            if (t1 instanceof Square) {
                var h = t; 
                var h1 = t1;
                var s = Geometry.signum(h.a - h1.a);
                if (s != 0) {
                    return s;
                }
                s = Geometry.signum(h.b - h1.b);
                return s;
            }
            return 1;
        }               
        throw new Error("OctagonSquareTiling.prototype.compare called with invalid arguments");
    }