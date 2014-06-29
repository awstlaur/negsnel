function Brick(tiling,a,b){
  TilingPolygon.call(this);
  this.tiling = tiling;
  this.a = a;
  this.b = b;
   this.v = [
    new Point(0,0),
    new Point(this.tiling.t,0),
    new Point(1,0),
    new Point(1,1),
    new Point(1-this.tiling.t,1),
    new Point(0,1)
  ];
  
  this.xt = new Point(1,0);
  this.yt = new Point(1-this.tiling.t,1);
}

Brick.prototype = Object.create(TilingPolygon.prototype);

Brick.prototype.numSides = function(){
    return 6;
}
 
Brick.prototype.getVertex = function(i){
 return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));   
}
 
// Brick.prototype.getVertex = function(i){
//   switch (i) {
//             case 0: return new Point(this.a+this.b*(1-this.tiling.t),this.b); break;
//             case 1: return new Point(this.a+this.b*(1-this.tiling.t)+this.tiling.t,this.b); break;
//             case 2: return new Point(this.a+this.b*(1-this.tiling.t)+1,this.b); break;
//             case 3: return new Point(this.a+this.b*(1-this.tiling.t)+1,this.b+1); break
//             case 4: return new Point(this.a+(this.b+1)*(1-this.tiling.t),this.b+1); break;
//             case 5: return new Point(this.a+this.b*(1-this.tiling.t),this.b+1); break;
//             default: 
//                 throw new Error("Called getVertex() on a Brick with invalid i="+i);
//         }
// }
  
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