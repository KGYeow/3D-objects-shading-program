//_________________________________________________________________________________//
/*
    To import the vertex shader for Gouraud Shading.
*/
//_________________________________________________________________________________//
var vertexShaderGouraudShading = document.createElement("script");
vertexShaderGouraudShading.id = "gouraud-vertex-shader";
vertexShaderGouraudShading.type = "x-shader/x-vertex";
vertexShaderGouraudShading.className = "v-gouraud-shading";
vertexShaderGouraudShading.innerHTML =
`
    attribute vec4 vPosition;
    attribute vec3 vNormal;
    attribute vec2 vTexCoord;
    uniform int haveTexture[6];
    varying float haveTex;

    vec4 fColor;
    vec4 fColor1;
    varying vec4 fColorFinal;
    varying vec2 fTexCoord;

    const int objectNum = 6;
    uniform int object;

    uniform float LightOn;
    uniform float spotLightOn;

    uniform mat4 modelViewMatrix;       // Position the camera.
    uniform mat4 projectionMatrix;      // Define view volume.
    uniform vec4 lightPosition;         // Point or distance light position.
    uniform vec4 spotLightPosition;     // Spot light position.
    
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
        vec3 pos = (modelViewMatrix * vPosition).xyz;
        vec3 light = (modelViewMatrix * lightPosition).xyz;
        vec3 spotLight = (modelViewMatrix * spotLightPosition).xyz;

        fL = normalize(light - pos);
        fL1 = normalize(spotLight - pos);

        fE = normalize(-pos);
        
        vec4 NN = vec4(vNormal,0);

        // Transform vertex normal into eye coordinates.
        fN = normalize((modelViewMatrix * NN).xyz);

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
                    haveTex = 1.0;
                else
                    haveTex = 0.0;
            }
        }
        gl_Position = projectionMatrix * modelViewMatrix * vPosition;
        fTexCoord = vTexCoord;
    }
`;
document.head.appendChild(vertexShaderGouraudShading);

//_________________________________________________________________________________//
/*
    ** Default shading **
    To import the vertex shader for Phong Shading.
*/
//_________________________________________________________________________________//
var vertexShaderPhongShading = document.createElement("script");
vertexShaderPhongShading.id = "phong-vertex-shader";
vertexShaderPhongShading.type = "x-shader/x-vertex";
vertexShaderPhongShading.className = "v-phong-shading";
vertexShaderPhongShading.innerHTML =
`
    attribute vec4 vPosition;
    attribute vec3 vNormal;
    attribute vec2 vTexCoord;
    varying vec2 fTexCoord;
    
    uniform mat4 modelViewMatrix;       // Position the camera.
    uniform mat4 projectionMatrix;      // Define view volume.
    uniform vec4 lightPosition;         // Point or distance light Position.
    uniform vec4 spotLightPosition;     // Spot light position.

    varying vec3 fN, fL, fE;
    varying vec3 fL1;

    void main()
    {
        vec3 pos = (modelViewMatrix * vPosition).xyz;
        vec3 light = (modelViewMatrix * lightPosition).xyz;
        vec3 spotLight = (modelViewMatrix * spotLightPosition).xyz;

        fL = normalize(light - pos);
        fL1 = normalize(spotLight - pos);
        
        fE = normalize(-pos);
        
        vec4 NN = vec4(vNormal,0);

        // Transform vertex normal into eye coordinates.
        fN = normalize((modelViewMatrix * NN).xyz);

        gl_Position = projectionMatrix * modelViewMatrix * vPosition;
        fTexCoord = vTexCoord;
    }
`;
document.head.appendChild(vertexShaderPhongShading);

//_________________________________________________________________________________//
/*
    To import the vertex shader for Flat Shading.
*/
//_________________________________________________________________________________//
var vertexShaderFlatShading = document.createElement("script");
vertexShaderFlatShading.id = "flat-vertex-shader";
vertexShaderFlatShading.type = "x-shader/x-vertex";
vertexShaderFlatShading.className = "v-flat-shading";
vertexShaderFlatShading.innerHTML =
`
    attribute vec4 vPosition;
    attribute vec3 vNormal;
    attribute vec2 vTexCoord;

    uniform mat4 modelViewMatrix;       // Position the camera.
    uniform mat4 projectionMatrix;      // Define view volume.
    uniform vec4 lightPosition;         // Point or distance light Position.
    uniform vec4 spotLightPosition;     // Spot light Position.

    varying vec3 pos;
    varying vec3 fL, fE;
    varying vec3 fL1;

    void main()
    {
        pos = (modelViewMatrix * vPosition).xyz;
        vec3 light = (modelViewMatrix * lightPosition).xyz;
        vec3 spotLight = (modelViewMatrix * spotLightPosition).xyz;

        fL = normalize(light - pos);
        fL1 = normalize(spotLight - pos);

        fE = normalize(-pos);
        
        gl_Position = projectionMatrix * modelViewMatrix * vPosition;
    }
`;
document.head.appendChild(vertexShaderFlatShading);