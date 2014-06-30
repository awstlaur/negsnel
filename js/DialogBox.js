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
        $('#modal-form').find("input[type=text], textarea").val("");
    });
    $('#modal-form').on('submit', function(e){
        e.preventDefault();        
                
        var nameValueArray = $(this).serializeArray();
        nameValueArray.forEach(function(nvObject){
         nvObject.value = parseFloat(nvObject.value);
         userError("wrong", nvObject.name);
        });                        

        //$("#my-modal").modal('hide');
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
    out += "</span>";
    out += "<input name = \"";
    out += p.placeholder;
    out += "\" type=\"text\" class=\"form-control\" placeholder=\"";
    out += p.placeholder;
    out += "\"></div></div>";
 });
 return out;   
}

function userError(message, inputname){  
  var formGroup = $("input[name=" + inputname +"]").parent(".input-group").parent(".form-group");
  formGroup.addClass("has-feedback has-error");
  formGroup.children(".input-group").append("<span class=\"glyphicon glyphicon-remove form-control-feedback\"></span>");
}