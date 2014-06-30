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
         if(isNaN(nvObject.value)){
             userError(nvObject.name + " must be a real number!", nvObject.name);
         }else{
             var parameter = findParameterByID(data.parameters, nvObject.name);
             if(outOfBounds(parameter, nvObject.value)){
                 userError(parameter.placeholder + " is out of bounds!", nvObject.name);
             }
             
         }
        });
        console.log(nameValueArray);
        
        //for(parameter in data.parameters){
          //console.log(nameValueArray[parameter.name])
         //}

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
    out += p.id;
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
  $("#modal-form").append("<span style=\"color:red\">" + message + "</span><br>");
}

function findParameterByID(parameters, id){
 for(i in parameters){
     var p = parameters[i];
     console.log(p.id + " ?=? " + id);
  if(p.id===id) return p;
 }
 throw new Error('findParameterByPlaceholder called when no parameter had placeholder');
}

function outOfBounds(parameter, value){
    return !(value >= parameter.minInclusive && value > parameter.minExclusive
          && value <= parameter.maxInclusive && value < parameter.maxExclusive);
}