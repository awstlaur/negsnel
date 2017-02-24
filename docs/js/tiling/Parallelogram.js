function Parallelogram(tiling,a,b){
  TilingPolygon.call(this);
  this.tiling = tiling;
  this.a = a;
  this.b = b;
  this.v = [
    new Point(0,0),
    new Point(1,0),
    new Point(this.tiling.x+1, this.tiling.y),
    new Point(this.tiling.x, this.tiling.y)
  ];
  this.xt = new Point(1,0);
  this.yt = new Point(this.tiling.x, this.tiling.y);
}

Parallelogram.prototype = Object.create(TilingPolygon.prototype);

Parallelogram.prototype.numSides = function(){
  return 4;
};

Parallelogram.prototype.getVertex = function(i){
  return this.v[i].add(this.xt.scale(this.a)).add(this.yt.scale(this.b));   
};
  
Parallelogram.prototype.getOpposite = function(i){
  switch (i) {
  case 0: return new TilingEdge(new Parallelogram(this.tiling, this.a, this.b-1),2);
  case 1: return new TilingEdge(new Parallelogram(this.tiling, this.a+1, this.b),3);
  case 2: return new TilingEdge(new Parallelogram(this.tiling, this.a, this.b+1),0);
  case 3: return new TilingEdge(new Parallelogram(this.tiling, this.a-1, this.b),1);
  default: 
    throw new Error('Called getOpposite() with invalid i.');
  }
};  
