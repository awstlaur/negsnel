function HexagonTriangleTiling(){    
    
}

HexagonTriangleTiling.prototype.getHexagon = function(a,b){
 return new Hexagon(this,a,b); 
}

HexagonTriangleTiling.prototype.toString = function(){
 return "HexagonTriangleTiling"; 
}


HexagonTriangleTiling.prototype.compare = function(t,t1) {
        if (t instanceof Hexagon) {
            if (t1 instanceof Hexagon) {
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
        if (t instanceof UpTriangle) {
            if (t1 instanceof Hexagon) {
                return 1;
            }
            if (t1 instanceof UpTriangle) {
                var h = t;
                var h1 = t1;
                var s = Geometry.signum(h.a - h1.a);
                if (s != 0) {
                    return s;
                }
                s = Geometry.signum(h.b - h1.b);
                return s;
            }
            return -1;
        }
        if (t instanceof DownTriangle) {            
            if (t1 instanceof DownTriangle) {
                var h = t;
                var h1 = t1;
                var s = Integer.signum(h.a - h1.a);
                if (s != 0) {
                    return s;
                }
                s = Integer.signum(h.b - h1.b);
                return s;
            }
            return 1;
        }
        
        
        throw new Error("HexagonTriangleTiling.prototype.compare called with invalid arguments");
    }