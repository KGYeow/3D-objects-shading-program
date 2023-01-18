//_________________________________________________________________________________//
/*
    To import the fragment shader for Gouraud Shading.
*/
//_________________________________________________________________________________//
var fragmentShaderGouraudShading = document.createElement("script");
fragmentShaderGouraudShading.id = "gouraud-fragment-shader";
fragmentShaderGouraudShading.type = "x-shader/x-fragment";
fragmentShaderGouraudShading.className = "f-gouraud-shading";
fragmentShaderGouraudShading.innerHTML =
`
    precision mediump float;

    varying vec4 fColorFinal;
    varying vec2 fTexCoord;
    uniform sampler2D texture;
    varying float haveTex;

    void main()
    {
        if(haveTex == 1.0)
            gl_FragColor = fColorFinal * texture2D(texture, fTexCoord);
        else
            gl_FragColor = fColorFinal;
    }
`;
document.head.appendChild(fragmentShaderGouraudShading);

//_________________________________________________________________________________//
/*
    ** Default shading **
    To import the fragment shader for Phong Shading.
*/
//_________________________________________________________________________________//
var fragmentShaderPhongShading = document.createElement("script");
fragmentShaderPhongShading.id = "phong-fragment-shader";
fragmentShaderPhongShading.type = "x-shader/x-fragment";
fragmentShaderPhongShading.className = "f-phong-shading";
fragmentShaderPhongShading.innerHTML =
`
    precision mediump float;

    vec4 fColor;
    vec4 fColor1;
    vec4 fColorFinal;
    varying vec2 fTexCoord;
    uniform sampler2D texture;
    uniform int haveTexture[6];

    const int objectNum = 6;
    uniform int object;

    uniform float LightOn;
    uniform float spotLightOn;

    uniform vec4 ambientProduct[6], diffuseProduct[6], specularProduct[6];
    uniform vec4 ambientProduct1[6], diffuseProduct1[6], specularProduct1[6];

    uniform float shininess[6];
    uniform float Ka[6], Kd[6], Ks[6];

    uniform vec3 spotLightDirection;
    uniform float lightAngleLimit;

    varying vec3 fN, fL, fE;
    varying vec3 fL1;

    void main()
    {
        vec3 H = normalize(fL + fE);
        vec3 H1 = normalize(fL1 + fE);

        vec4 ambient, diffuse, specular;
        vec4 ambient1, diffuse1, specular1;

        float spotDotProduct = dot(fL1, normalize(spotLightDirection));

        for(int i = 0; i < objectNum; i++)
        {
            if(object == i)
            {
                // Compute terms in the illumination equation.
                ambient = Ka[i] * ambientProduct[i];

                diffuse = Kd[i] * diffuseProduct[i] * max(dot(fL, fN), 0.0);

                specular = Ks[i] * specularProduct[i] * pow(max(dot(fN, H), 0.0), shininess[i]);

                if(dot(fL, fN) < 0.0) specular = vec4(0.0, 0.0, 0.0, 1.0);

                // Compute shader with modified phong model.
                fColor = LightOn * (ambient + diffuse + specular);

                if(spotDotProduct > lightAngleLimit)
                {
                    // Compute terms in the illumination equation.
                    ambient1 = Ka[i] * ambientProduct1[i];

                    diffuse1 = Kd[i] * diffuseProduct1[i] * max(dot(fL1, fN), 0.0);

                    specular1 = Ks[i] * specularProduct1[i] * pow(max(dot(fN, H1), 0.0), shininess[i]);

                    if(dot(fL1, fN) < 0.0) specular = vec4(0.0, 0.0, 0.0, 1.0);

                    // Compute shader with modified phong model.
                    fColor1 = spotLightOn * (ambient1 + diffuse1 + specular1);
                } 
                fColorFinal = fColor + fColor1;
                fColorFinal.a = 1.0;

                if(haveTexture[i] == 1)
                    gl_FragColor = fColorFinal * texture2D(texture, fTexCoord);
                else
                    gl_FragColor = fColorFinal;
            }
        }
    }
`;
document.head.appendChild(fragmentShaderPhongShading);

//_________________________________________________________________________________//
/*
    To import the fragment shader for Flat Shading.
*/
//_________________________________________________________________________________//
var fragmentShaderFlatShading = document.createElement("script");
fragmentShaderFlatShading.id = "flat-fragment-shader";
fragmentShaderFlatShading.type = "x-shader/x-fragment";
fragmentShaderFlatShading.className = "f-flat-shading";
fragmentShaderFlatShading.innerHTML =
`
    #extension GL_OES_standard_derivatives : enable
    precision mediump float;

    vec4 fColor;
    vec4 fColor1;
    vec4 fColorFinal;

    const int objectNum = 6;
    uniform int object;

    uniform float LightOn;
    uniform float spotLightOn;

    uniform vec4 ambientProduct[6], diffuseProduct[6], specularProduct[6];
    uniform vec4 ambientProduct1[6], diffuseProduct1[6], specularProduct1[6];

    uniform float shininess[6];
    uniform float Ka[6], Kd[6], Ks[6];

    uniform vec3 spotLightDirection;
    uniform float lightAngleLimit;

    varying vec3 pos;
    varying vec3 fL, fE;
    varying vec3 fL1;

    void main()
    {
        vec3 H = normalize(fL + fE);
        vec3 H1 = normalize(fL1 + fE);

        vec4 ambient, diffuse, specular;
        vec4 ambient1, diffuse1, specular1;

        vec3 U = dFdx(pos);
        vec3 V = dFdy(pos);
        vec3 N = normalize(cross(U, V));

        float spotDotProduct = dot(fL1, normalize(spotLightDirection));

        for(int i = 0; i < objectNum; i++)
        {
            if(object == i)
            {
                // Compute terms in the illumination equation.
                ambient = Ka[i] * ambientProduct[i];

                diffuse = Kd[i] * diffuseProduct[i] * max(dot(fL, N), 0.0);

                specular = Ks[i] * specularProduct[i] * pow(max(dot(N, H), 0.0), shininess[i]);

                if(dot(fL, N) < 0.0) specular = vec4(0.0, 0.0, 0.0, 1.0);

                // Compute shader with modified phong model.
                fColor = LightOn * (ambient + diffuse + specular);

                if(spotDotProduct > lightAngleLimit)
                {
                    // Compute terms in the illumination equation.
                    ambient1 = Ka[i] * ambientProduct1[i];
    
                    diffuse1 = Kd[i] * diffuseProduct1[i] * max(dot(fL1, N), 0.0);
    
                    specular1 = Ks[i] * specularProduct1[i] * pow(max(dot(N, H1), 0.0), shininess[i]);
    
                    if(dot(fL1, N) < 0.0) specular = vec4(0.0, 0.0, 0.0, 1.0);
    
                    // Compute shader with modified phong model.
                    fColor1 = spotLightOn * (ambient1 + diffuse1 + specular1);
                } 
                fColorFinal = fColor + fColor1;
                fColorFinal.a = 1.0;
            }
        }
        gl_FragColor = fColorFinal;
    }
`;
document.head.appendChild(fragmentShaderFlatShading);