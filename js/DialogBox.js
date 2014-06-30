function DialogBox(id){
    switch(id){
        case "hexagon-triangle":
            NegSnell(new HexagonTriangleTiling()); break;
        case "octagon-square":
            NegSnell(new OctagonSquareTiling()); break;
        default: 
            dialog(id);
        
    }
}

function dialog(id){
    //$('#myModal > .modal-dialog > .modal-content > .modal-body').html(id);
    
    var data = TilingParameterData[id];
    
    $('#my-modal-label').html(data.name + " Parameter");
    $('#modal-form').html(getHTML(data));
    
    
    /* submit/cancel behavior */
    $('#modal-form-submit').on('click', function(e){   
        e.preventDefault(); 
        $('#modal-form').submit();
    });
    $('#my-modal').on('hidden.bs.modal', function(e){  
        console.log("hidden");
        $('#modal-form').find("input[type=text], textarea").val("");
    });
    $('#modal-form').on('submit', function(e){
        e.preventDefault();        
        $("#my-modal").modal('hide');        
        NegSnell(new TriangleTiling(0.5,0.3));        
        

        
    });
    
    /* show time! */
    $('#my-modal').modal();
}

function getHTML(data){
 var out = "<p class=\"help-block\">" + data.message + "</p>";
 data.parameters.forEach(function(p){
    out += "<div class=\"form-group\">";
    out += "<div class=\"input-group\">";
    out += "<span class=\"input-group-addon\">";
    out += p.name;
    out += "</span>"
    out += "<input type=\"text\" class=\"form-control\" placeholder=\"";
    out += p.placeholder;
    out += "\"></div></div>";
 });
 return out;   
}