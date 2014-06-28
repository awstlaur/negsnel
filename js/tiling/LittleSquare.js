function LittleSquare(tiling,a,b){
    Square.call(this,tiling,a,b);
}

LittleSquare.prototype = Object.create(Square.prototype);

LittleSquare.prototype.numSides = function(){
    return 4;
}
 
LittleSquare.prototype.getVertex = function(i){
  switch (i) {
                case 0: return this.translate(this.tiling.m,0); break;
                case 1: return this.translate(this.tiling.m+this.tiling.n,0); break;
                case 2: return this.translate(this.tiling.m+this.tiling.n,this.tiling.n); break;
                case 3: return this.translate(this.tiling.m,this.tiling.n); break;
                default: throw new Error("Called getVertex() with invalid i.");
        }
}
  
LittleSquare.prototype.getOpposite = function(i){
  switch (i) {
                case 0: return new TilingEdge(this.tiling.getBigSquare(this.a,this.b-1), 4);
                case 1: return new TilingEdge(this.tiling.getBigSquare(this.a+1,this.b-1), 6);
                case 2: return new TilingEdge(this.tiling.getBigSquare(this.a+1,this.b), 0);
                case 3: return new TilingEdge(this.tiling.getBigSquare(this.a,this.b), 2);
                default: 
                    throw new Error("Called getOpposite() with invalid i.");
        }
}  
  
LittleSquare.prototype.compareTo = function(p){
            if (this.a > p.a)
                return 1;
            else if (this.a < p.a) 
                return -1;
            if (this.b > p.b)
                return 1;
            else if (this.b < p.b) 
                return -1;
            else if(p instanceof BigSquare)
                return 1;
            return 0;
}