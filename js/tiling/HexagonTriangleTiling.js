function HexagonTriangleTiling(){    
    
}

HexagonTriangleTiling.prototype.getOriginPolygon = function(){
  return new Hexagon(this,0,0); 
};

HexagonTriangleTiling.prototype.toString = function(){
  return 'HexagonTriangleTiling'; 
};
