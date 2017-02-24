function NegSnell(t){
  var width = window.innerWidth;
  var height = window.innerHeight;
  var paper = Raphael(0,0,width,height);
  var c = new Component(paper);
  c.setBackgroundColor(config.backgroundColor);

  return frame = new NegSnellFrame(t.getOriginPolygon(), c);
}
