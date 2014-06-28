function test(){
  var scale = new AffineTransform()
  var translate = new AffineTransform();  
  scale.setScaleInstance(4,5);
  translate.setTranslateInstance(3,2);
  var tp = new Point(0.5,0.5);
  //console.log(scale);
  
  //console.log(scale.transform(tp).toString());
  //console.log(translate.transform(tp).toString());
  
  var q1 = scale.transform(tp);
  var q2 = translate.transform(q1);
  
  console.log(q2.toString());
  
  var r1 = translate.transform(tp);  
  var r2 = scale.transform(r1);
  console.log(r2.toString());
  
  scale2 = scale.copy();
  scale.preConcatenate(translate);
  translate.preConcatenate(scale2);
  
  var T1 = scale;
  var T2 = translate;
  
  var p1 = T1.transform(tp);
  var p2 = T2.transform(tp);
  console.log(p1.toString());
  console.log(p2.toString());
  
  
  /* path / bounding box */
  var path = new GeneralPath();
  path.moveTo(2,3);
  path.lineTo(2,-2);
  path.lineTo(-1,-1);
  path.lineTo(-2,-1.5);
  path.lineTo(-3,1);
  path.lineTo(-1.5,4);
  path.lineTo(1.5,3.5);
  path.closePath();
  console.log(path.toString());
  console.log(path.getBoundingBox());
}