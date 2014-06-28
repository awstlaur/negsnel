function Brick(tiling,a,b){
  TilingPolygon.call(this);
  this.tiling = tiling;
  this.a = a;
  this.b = b;
}

Brick.prototype = Object.create(TilingPolygon.prototype);

Brick.prototype.numSides = function(){
    return 6;
}
 
Brick.prototype.getVertex = function(i){
  switch (i) {
            case 0: return new Point(this.a+this.b*(1-this.tiling.t),this.b); break;
            case 1: return new Point(this.a+this.b*(1-this.tiling.t)+this.tiling.t,this.b); break;
            case 2: return new Point(this.a+this.b*(1-this.tiling.t)+1,this.b); break;
            case 3: return new Point(this.a+this.b*(1-this.tiling.t)+1,this.b+1); break
            case 4: return new Point(this.a+(this.b+1)*(1-this.tiling.t),this.b+1); break;
            case 5: return new Point(this.a+this.b*(1-this.tiling.t),this.b+1); break;
            default: 
                throw new Error("Called getVertex() on a Brick with invalid i="+i);
        }
}
  
Brick.prototype.getOpposite = function(i){
  switch (i) {
            case 0: return new TilingEdge(this.tiling.getBrick(this.a, this.b-1),3); break;
            case 1: return new TilingEdge(this.tiling.getBrick(this.a+1, this.b-1),4); break;
            case 2: return new TilingEdge(this.tiling.getBrick(this.a+1, this.b),5); break;
            case 3: return new TilingEdge(this.tiling.getBrick(this.a, this.b+1),0); break;
            case 4: return new TilingEdge(this.tiling.getBrick(this.a-1, this.b+1),1); break;
            case 5: return new TilingEdge(this.tiling.getBrick(this.a-1, this.b),2); break;
            default: 
                throw new Error("Called getOpposite() with invalid i.");
        }
}  
  
Brick.prototype.compareTo = function(p){
  if (this.a > p.a){
      return 1;
  } else if (this.a < p.a){
      return -1;
  } else if (this.b > p.b){
      return 1;
  } else if (this.b < p.b){ 
      return -1;
  } else {
      return 0;
  }
}