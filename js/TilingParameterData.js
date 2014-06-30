var TilingParameterData={
    parallelogram:{
     name:"Parallelogram Tiling",
     message: "This window sets the tiling to the standard tiling by parallelograms with sides of length 1 and L, and an angle &#952; measured in degrees.",
     parameters:[
        {
         name: "Length",
         placeholder: "L"
        },
        {
         name: "Angle",
         placeholder: "&#952;",         
        }
     ],
    },
  
    triangle:{
     name:"Triangle Tiling",
     message: "This window sets the tiling to the standard tiling by triangulated parallelograms with sides of length 1 and L, and an angle &#952; measured in degrees. The diagonal is opposite &#952;.",
     parameters:[
        {
         name: "Length",
         placeholder: "L"
        },
        {
         name: "Angle",
         placeholder: "&#952;"
        }
     ],
    },
    
    'triangle-angles':{
     name:"Triangle Tiling",
     message: "This window sets the tiling to the standard tiling by triangulated parallelograms with angles &#966; and &#952; (both measured in degrees), and a base  length of 1. The diagonal is opposite &#952;.",
     parameters:[
        {
         name: "Angle &#966;",
         placeholder: "&#966;"
        },
        {
         name: "Angle &#952;",
         placeholder: "&#952;"
        }
     ],
    },

    brick:{
     name:"Brick Tiling",
     message: "This window constructs the tiling by square bricks with offset T, a real number between zero and one.",
     parameters:[
        {
         name: "Offset",
         placeholder: "T"
        }
     ],
    },

    'two-square':{
     name:"Two Square Tiling",
     message: "This window sets the tiling to two-square tiling with side-lengths L<sub>1</sub> and L<sub>2</sub>.",
     parameters:[
        {
         name: "Length 1",
         placeholder: "L_1"
        },
        {
         name: "Length 2",
         placeholder: "L_2"
        }        
     ],
    }    
}