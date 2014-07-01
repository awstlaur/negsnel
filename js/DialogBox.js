function DialogBox(id){
    switch(id){
        case "hexagon-triangle":
            window.currentFrame =  NegSnell(new HexagonTriangleTiling()); break;
        case "octagon-square":
            window.currentFrame =  NegSnell(new OctagonSquareTiling()); break;
        default: 
            dialog(id);
        
    }
}

function dialog(id){
    //$('#myModal > .modal-dialog > .modal-content > .modal-body').html(id);
    
    var data = TilingParameterData[id];
    $("#error-messages").empty();
    
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
    
    $('#modal-form').unbind('submit').on('submit', function(e){
        e.preventDefault();           
        var submit = true;        
        var nameValueArray = $(this).serializeArray();
        $("#error-messages").empty();
        //console.log(nameValueArray);
        
        nameValueArray.forEach(function(nvObject){
         nvObject.value = parseFloat(nvObject.value);         
         if(isNaN(nvObject.value)){
             userError(nvObject.name + " must be a real number!", nvObject.name);
             submit = false;
         }else{
             var parameter = findParameterByID(data.parameters, nvObject.name);
             if(outOfBounds(parameter, nvObject.value)){
                 userError(parameter.placeholder + " is out of bounds!", nvObject.name);
                 submit = false;
             }else{
                 userSuccess(nvObject.name);   
             }             
         }
        });
        if(submit){
            var params = nameValueArray.map(function(nvPair){return nvPair.value});
            var newTiling = new TilingParameterData[id].tiling(params);            
            $('#my-modal').modal('hide');
            window.currentFrame = NegSnell(newTiling);
        }
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
    out += p.placeholder + "\">";
    out += "<span class=\"glyphicon form-control-feedback\"></span>";
    out += "</div>"; //end input-group    
    out += "</div>"; //end form-group
 });
 return out;   
}

function userError(message, inputname){  
  var formGroup = $("input[name=" + inputname +"]").parent(".input-group").parent(".form-group");
  formGroup.removeClass("has-success");
  formGroup.addClass("has-feedback has-error");
  //formGroup.children(".input-group").append("<span class=\"glyphicon glyphicon-remove form-control-feedback\"></span>");
  //console.log(formGroup.children(".input-group"))  
  formGroup.children(".input-group").children(".glyphicon").removeClass("glyphicon-ok");
  formGroup.children(".input-group").children(".glyphicon").addClass("glyphicon-remove");
  $("#error-messages").append("<span id=\"" + inputname + "\">" + message + "</span><br>");
}

function userSuccess(inputname){
    var formGroup = $("input[name=" + inputname +"]").parent(".input-group").parent(".form-group");
    formGroup.removeClass("has-error");
    formGroup.addClass("has-feedback has-success");
    formGroup.children(".input-group").children(".glyphicon").removeClass("glyphicon-remove");
    formGroup.children(".input-group").children(".glyphicon").addClass("glyphicon-ok");
    
    //console.log($("#error-messages > #" + inputname));
    $("#error-messages > #" + inputname).remove();
}

function findParameterByID(parameters, id){
 for(i in parameters){
     var p = parameters[i];
     //console.log(p.id + " ?=? " + id);
     if(p.id===id) return p;
 }
 throw new Error('findParameterByID called when no parameter had ID');
}

function outOfBounds(parameter, value){
    return !(value >= parameter.minInclusive && value > parameter.minExclusive
          && value <= parameter.maxInclusive && value < parameter.maxExclusive);
}