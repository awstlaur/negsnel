function TwoSquareTiling(length1, length2) {
    if(length1 > length2){
        this.m = length1;
        this.n = length2;
    }else if(length2 > length1){
        this.m = length2;
        this.n = length1;
    }else{
        throw new Error("called new TwoSquareTiling(length1,length2) with length1 = length2");
    }
}

TwoSquareTiling.prototype.toString = function(){
    return "TwoSquareTiling " + m + " " + n;
}
TwoSquareTiling.prototype.getOriginPolygon = function() {
    return new BigSquare(this, 0,0);
}

TwoSquareTiling.prototype.fromParameters = function(params){
  L1 = params[0];
  L2 = params[1];
  if(L1 !== L2)
    return new TwoSquareTiling(L1, L2);
  else
    return new BrickTiling(0);
}