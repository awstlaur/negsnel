function BigSquare(tiling,a,b){
    Square.call(this,tiling,a,b);
}

BigSquare.prototype = Object.create(Square.prototype);

BigSquare.prototype.numSides = function(){
    return 8;
}
 
BigSquare.prototype.getVertex = function(i){
  switch (i) {
            case 0: return this.translate(0,0); break;
            case 1: return this.translate(this.tiling.n,0); break;
            case 2: return this.translate(this.tiling.m,0); break;
            case 3: return this.translate(this.tiling.m,this.tiling.n); break;
            case 4: return this.translate(this.tiling.m,this.tiling.m); break;
            case 5: return this.translate(this.tiling.m-this.tiling.n, this.tiling.m); break;
            case 6: return this.translate(0,this.tiling.m); break;
            case 7: return this.translate(0, this.tiling.m-this.tiling.n); break;
            default:
                throw new Error("Called getVertex() with invalid i.");
        }
}
  
BigSquare.prototype.getOpposite = function(i){
  switch (i) {
            case 0: return new TilingEdge(this.tiling.getLittleSquare(this.a-1, this.b),2); break;
            case 1: return new TilingEdge(this.tiling.getBigSquare(this.a, this.b-1),5); break;
            case 2: return new TilingEdge(this.tiling.getLittleSquare(this.a, this.b),3); break;
            case 3: return new TilingEdge(this.tiling.getBigSquare(this.a+1,this.b), 7); break;
            case 4: return new TilingEdge(this.tiling.getLittleSquare(this.a,this.b+1), 4); break;
            case 5: return new TilingEdge(this.tiling.getBigSquare(this.a,this.b+1), 1); break;
            case 6: return new TilingEdge(this.tiling.getLittleSquare(this.a-1,this.b+1), 1); break;
            case 7: return new TilingEdge(this.tiling.getBigSquare(this.a-1,this.b), 3); break;
            default: 
                System.err.println("Called getOpposite() with invalid i.");
        }
}  
  
BigSquare.prototype.compareTo = function(p){
    if (this.a > p.a)
        return 1;
    else if (this.a < p.a) 
        return -1;
    if (this.b > p.b)
        return 1;
    else if (this.b < p.b) 
        return -1;
    else if(p instanceof LittleSquare)
        return -1;
    return 0;
}