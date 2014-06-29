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
// TwoSquareTiling.prototype.getLittleSquare = function(a,b) {
//     return new LittleSquare(this, a, b);
// }