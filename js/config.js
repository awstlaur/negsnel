var config = {

  initialDisplayBoxScale: 2,
  nudgeAmt: .015,
  screenShift: .02,
  trajectoryEndpointRadius: 5,
  trajectoryIters: 100,
  
  
  backgroundColor:"white",
  polyColor: "lightgrey",
  polyStrokeColor: "blue",
  orbitColor: "red",
  startCircleColor: "green",
  endCircleColor: "red",
  draggingCircleColor: "yellow",
  endTrajectoryColor: "pink",
  zoomBoxStrokeColor: "orange",
  
  directionMap: {
   'up': 0,
   'left': 1,
   'down': 2,
   'right': 3,
   'w': 0,
   'a': 1,
   's': 2,
   'd': 3
  },
  
  zoomScaleMap: {
    'i': 0.9,
    'o': 1.1
  },
  
  moveTrajPointsMap: {
    'alt': false,
    'shift':true
  }


}