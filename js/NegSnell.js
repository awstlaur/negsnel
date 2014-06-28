function NegSnell(){   
   var canvas = document.getElementById("raphael-canvas");
   var width = window.innerWidth;
   var height = window.innerHeight;
   
   //canvas.style.height = height;
   //canvas.style.width = .8*width;
   
   var RX = .1*width;
   var RY = .1*height;
   var RW = .8*width;
   var RH = .8*height;
   var paper = Raphael(0,0,width,height);

   var c = new Component(paper);
   c.setBackgroundColor(config.backgroundColor);
  
   document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || text.innerText; 
    console.log(target, target.className, target.id);
}, false);
   
   
  var t = new TwoSquareTiling(1,2);
  var frame = new NegSnellFrame(t.getBigSquare(0,0), c);
  
  //document.onkeypress = keypressHandler(event);
  
  //document.onkeyup = keypressHandler(event)
  
}



