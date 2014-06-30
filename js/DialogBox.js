function DialogBox(id){
    switch(id){
        case "hexagon-triangle":
            NegSnell(new HexagonTriangleTiling()); break;
        case "octagon-square":
            NegSnell(new OctagonSquareTiling()); break;
        default: 
            dialog();
        
    }
}

function dialog(){
    $('#myModal').modal();
}