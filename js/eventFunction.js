//_________________________________________________________________________________//
/*
    Contain the functions for the event listeners.
*/
//_________________________________________________________________________________//

// Associate, connect or update the application variables to the program shader variables.
function associateAppShaderVar()
{
    for (var i = 0; i < objNum; i++) // Loop for different objects.
    {
        // Calculate the ambient, diffuse, and specular products for each object from the fragment shader.
        ambientProduct[i] = mult(light.lightAmbient, objMaterial[i].materialAmbient);
        diffuseProduct[i] = mult(light.lightDiffuse, objMaterial[i].materialDiffuse);
        specularProduct[i] = mult(light.lightSpecular, objMaterial[i].materialSpecular);
    
        // Calculate the ambient, diffuse, and specular products for each object from the fragment shader.
        ambientProduct1[i] = mult(spotLight.lightAmbient, objMaterial[i].materialAmbient);
        diffuseProduct1[i] = mult(spotLight.lightDiffuse, objMaterial[i].materialDiffuse);
        specularProduct1[i] = mult(spotLight.lightSpecular, objMaterial[i].materialSpecular);

        gl.uniform1f(gl.getUniformLocation(program, "shininess[".concat(i,"]")), objMaterial[i].materialShininess);

        // Associate the shininess, ambient, diffuse, and specular products for each object to the fragment shader.
        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct[".concat(i,"]")), flatten(ambientProduct[i]));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct[".concat(i,"]")), flatten(diffuseProduct[i]));
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct[".concat(i,"]")), flatten(specularProduct[i]));

        // Associate the shininess, ambient, diffuse, and specular products for each object to the fragment shader.
        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct1[".concat(i,"]")), flatten(ambientProduct1[i]));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct1[".concat(i,"]")), flatten(diffuseProduct1[i]));
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct1[".concat(i,"]")), flatten(specularProduct1[i]));

        // Associate the ambient, diffuse, and specular reflection coefficient for each object to the fragment shader.
        gl.uniform1f(gl.getUniformLocation(program, "Ka[".concat(i,"]")), Ka[i]);
        gl.uniform1f(gl.getUniformLocation(program, "Kd[".concat(i,"]")), Kd[i]);
        gl.uniform1f(gl.getUniformLocation(program, "Ks[".concat(i,"]")), Ks[i])

        gl.uniform1i(gl.getUniformLocation(program, "haveTexture[".concat(i,"]")), objMaterial[i].haveTexture);
    }

    // Associate the on/off status of the light sources to the vertex shader.
    gl.uniform1f(gl.getUniformLocation(program, "LightOn"), light.lightOn);
    gl.uniform1f(gl.getUniformLocation(program, "spotLightOn"), spotLight.lightOn);

    // Associate the position of the light sources to the vertex shader.
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(light.lightPosition));
    gl.uniform4fv(gl.getUniformLocation(program, "spotLightPosition"), flatten(spotLight.lightPosition));

    // Associate the direction of the spot light source to the vertex shader.
    gl.uniform3fv(gl.getUniformLocation(program, "spotLightDirection"), spotLight.lightDirection);

    // Associate the direction of the spot light source to the vertex shader.
    gl.uniform1f(gl.getUniformLocation(program, "lightAngleLimit"), Math.cos(spotLight.lightAngleLimit));

    // Associate the projection matrix to the vertex shader.
    var aspectRatio = gl.canvas.width / gl.canvas.height;
    projection = perspective(fovy, aspectRatio, near, far);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"), false, flatten(projection));
}

// Change or use the type of shading.
function useShadingType(type)
{
    if(type == 1)   // If it is Gouraud Shading.
    {
        // Enable the choosing of floor texture.
        document.getElementById("texture-type").disabled = false;

        program = initShaders(gl, "gouraud-vertex-shader", "gouraud-fragment-shader");
    }
    else if(type == 2)  // If it is Phong Shading.
    {
        // Enable the choosing of floor texture.
        document.getElementById("texture-type").disabled = false;

        program = initShaders(gl, "phong-vertex-shader", "phong-fragment-shader");
    }
    else if(type == 3)  // If it is Flat Shading.
    {
        // Disable the choosing of floor texture.
        document.getElementById("texture-type").disabled = true;

        gl.getExtension("OES_standard_derivatives");
        program = initShaders(gl, "flat-vertex-shader", "flat-fragment-shader");
    }
    gl.useProgram(program);
}

// Enable or disable the texture of the object.
function textureTurnOnOff(obj, haveTex)
{
    objMaterial[obj].haveTexture = haveTex;
    gl.uniform1i(gl.getUniformLocation(program, "haveTexture[".concat(obj,"]")), objMaterial[obj].haveTexture);
}

// Turn on/off the light sources.
function lightTurnOnOff(condition, isSpot)
{
    if (condition.checked) // Turn on the light.
    {
        if (isSpot) // If it is spot light.
        {
            spotLight.lightOn = true;
            gl.uniform1f(gl.getUniformLocation(program, "spotLightOn"), 1.0);
        }
        else        // If it is point or direction light.
        {
            light.lightOn = true;
            gl.uniform1f(gl.getUniformLocation(program, "LightOn"), 1.0);
        }
    }
    else        // Turn off the light.
    {
        if (isSpot) // If it is spot light.
        {
            spotLight.lightOn = false;
            gl.uniform1f(gl.getUniformLocation(program, "spotLightOn"), 0.0);
        }
        else        // If it is point or direction light.
        {
            light.lightOn = false;
            gl.uniform1f(gl.getUniformLocation(program, "LightOn"), 0.0);
        }
    }
}

// Change the light source location and its type.
function changeLightPosition(pos, value, isSpot)
{
    if (isSpot)    // If it is spot light.
    {
        spotLight.lightPosition[pos] = value;

        // Update the modified spot light source location to the shader program.
        gl.uniform4fv(gl.getUniformLocation(program, "spotLightPosition"), flatten(spotLight.lightPosition));
    }
    else                    // If it is point or direction light.
    {
        light.lightPosition[pos] = value;

        // Update the modified point or distance light source location and its type to the shader program.
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(light.lightPosition));
    }
}

// Change the direction/rotation of the spot light source.
function changeSpotLightDirection(direction, value)
{
    spotLight.lightDirection[direction] = value;

    // Update the modified spot light direction/rotation to the shader program.
    gl.uniform3fv(gl.getUniformLocation(program, "spotLightDirection"), spotLight.lightDirection)
}

// Convert hexadecimal RGB value to decimal RGB values.
function hexTodecRGB(hex)
{
    // Check the string with regular expression to ensure it is hexadecimal.
    // Ignore the # and break 6 hexadecimal characters into 3 pairs.
    var validHexInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!validHexInput) return false;

    // Convert 3 pairs of hexadecimal characters into decimal or integer value.
    var RGBoutput =
    {
        r: parseInt(validHexInput[1], 16),  // 1st pair is Red color value.
        g: parseInt(validHexInput[2], 16),  // 2nd pair is Green color value.
        b: parseInt(validHexInput[3], 16),  // 3rd pair is Blue color value.
    };
    return RGBoutput;
}

// Change the ambient, diffuse, and specular colours of the light source or objects.
function changeLightObjAttrib(obj, hexColor, attribute, isSpot)
{
    rgbColor = hexTodecRGB(hexColor);       // Convert hexdecimal to 3 decimal RGB values.
    rColor = rgbColor.r / 255.0;            // Convert the rgb values to floating point numbers.
    gColor = rgbColor.g / 255.0;
    bColor = rgbColor.b / 255.0;

    switch(attribute)
    {
        case 0: // Change the ambient colour.
            if (obj == -1)  // If it is light source.
            {
                if (isSpot)  // If it is spot light.
                {
                    spotLight.lightAmbient = vec4(rColor, gColor, bColor, 1.0);
                    for (var i = 0; i < objNum; i++)
                    {
                        // Calculate and update the ambient product for each object to fragment shader.
                        ambientProduct1[i] = mult(spotLight.lightAmbient, objMaterial[i].materialAmbient);
                        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct1[".concat(i,"]")), flatten(ambientProduct1[i]));
                    }
                }
                else    // If it is point or direction light.
                {
                    light.lightAmbient = vec4(rColor, gColor, bColor, 1.0);
                    for (var i = 0; i < objNum; i++)
                    {
                        // Calculate and update the ambient product for each object to fragment shader.
                        ambientProduct[i] = mult(light.lightAmbient, objMaterial[i].materialAmbient);
                        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct[".concat(i,"]")), flatten(ambientProduct[i]));
                    }
                }
            }
            else    // If it is object.
            {
                // Calculate and update the ambient product for this object to fragment shader.
                objMaterial[obj].materialAmbient = vec4(rColor, gColor, bColor, 1.0);
                ambientProduct[obj] = mult(light.lightAmbient, objMaterial[obj].materialAmbient);
                gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct[".concat(obj,"]")), flatten(ambientProduct[obj]));
            }
            break;

        case 1: // Change the diffuse colour.
            if (obj == -1)  // If it is light source.
            {
                if (isSpot)  // If it is spot light.
                {
                    spotLight.lightDiffuse = vec4(rColor, gColor, bColor, 1.0);
                    for (var i = 0; i < objNum; i++)
                    {
                        // Calculate and update the ambient product for each object to fragment shader.
                        diffuseProduct1[i] = mult(spotLight.lightDiffuse, objMaterial[i].materialDiffuse);
                        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct1[".concat(i,"]")), flatten(diffuseProduct1[i]));
                    }
                }
                else    // If it is point or direction light.
                {
                    light.lightDiffuse = vec4(rColor, gColor, bColor, 1.0);
                    for (var i = 0; i < objNum; i++)
                    {
                        // Calculate and update the diffuse product for each object to fragment shader.
                        diffuseProduct[i] = mult(light.lightDiffuse, objMaterial[i].materialDiffuse);
                        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct[".concat(i,"]")), flatten(diffuseProduct[i]));
                    }
                }
            }
            else    // If it is object.
            {
                // Calculate and update the diffuse product for this object to fragment shader.
                objMaterial[obj].materialDiffuse = vec4(rColor, gColor, bColor, 1.0);
                diffuseProduct[obj] = mult(light.lightDiffuse, objMaterial[obj].materialDiffuse);
                gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct[".concat(obj,"]")), flatten(diffuseProduct[obj]));
            }
            break;

        case 2: // Change the specular colour.
            if (obj == -1)  // If it is light source.
            {
                if (isSpot)  // If it is spot light.
                {
                    spotLight.lightSpecular = vec4(rColor, gColor, bColor, 1.0);
                    for (var i = 0; i < objNum; i++)
                    {
                        // Calculate and update the specular product for each object to fragment shader.
                        specularProduct1[i] = mult(spotLight.lightSpecular, objMaterial[i].materialSpecular);
                        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct1[".concat(i,"]")), flatten(specularProduct1[i]));
                    }
                }
                else    // If it is point or direction light.
                {
                    light.lightSpecular = vec4(rColor, gColor, bColor, 1.0);
                    for (var i = 0; i < objNum; i++)
                    {
                        // Calculate and update the specular product for each object to fragment shader.
                        specularProduct[i] = mult(light.lightSpecular, objMaterial[i].materialSpecular);
                        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct[".concat(i,"]")), flatten(specularProduct[i]));
                    }
                }
            }
            else    // If it is object.
            {
                // Calculate and update the specular product for this object to fragment shader.
                objMaterial[obj].materialSpecular = vec4(rColor, gColor, bColor, 1.0);
                specularProduct[obj] = mult(light.lightSpecular, objMaterial[obj].materialSpecular);
                gl.uniform4fv(gl.getUniformLocation(program, "specularProduct[".concat(obj,"]")), flatten(specularProduct[obj]));
            }
            break;
    }
}

// Change the shininess of the objects.
function changeObjShininess(obj, value)
{
    objMaterial[obj].materialShininess = value;
    gl.uniform1f(gl.getUniformLocation(program, "shininess[".concat(obj,"]")), objMaterial[obj].materialShininess);
}

// Change the ambient, diffuse, and specular reflection coefficients of the objects.
function changeReflectCoefficient(obj, value, attribute)
{
    switch(attribute)
    {
        case 0: // Change the ambient reflection coefficients of the object.
            Ka[obj] = value;
            gl.uniform1f(gl.getUniformLocation(program, "Ka[".concat(obj,"]")), Ka[obj]);
            break;

        case 1: // Change the diffuse reflection coefficients of the object.
            Kd[obj] = value;
            gl.uniform1f(gl.getUniformLocation(program, "Kd[".concat(obj,"]")), Kd[obj]);
            break;

        case 2: // Change the specular reflection coefficients of the object.
            Ks[obj] = value;
            gl.uniform1f(gl.getUniformLocation(program, "Ks[".concat(obj,"]")), Ks[obj]);
            break;
    }
}

// Change the object modify layout.
function changeObjModifyLayout(value)
{
    switch(value)
    {
        case "1":   // Show cube setting.
            document.getElementById("cube-attrib").hidden = false;
            document.getElementById("cylinder-attrib").hidden = true;
            document.getElementById("sphere-attrib").hidden = true;
            document.getElementById("pentagonal-prism-attrib").hidden = true;
            document.getElementById("teapot-attrib").hidden = true;
            break;

        case "2":   // Show cylinder setting.
            document.getElementById("cube-attrib").hidden = true;
            document.getElementById("cylinder-attrib").hidden = false;
            document.getElementById("sphere-attrib").hidden = true;
            document.getElementById("pentagonal-prism-attrib").hidden = true;
            document.getElementById("teapot-attrib").hidden = true;
            break;

        case "3":   // Show sphere setting.
            document.getElementById("cube-attrib").hidden = true;
            document.getElementById("cylinder-attrib").hidden = true;
            document.getElementById("sphere-attrib").hidden = false;
            document.getElementById("pentagonal-prism-attrib").hidden = true;
            document.getElementById("teapot-attrib").hidden = true;
            break;

        case "4":   // Show pentagonal prism setting.
            document.getElementById("cube-attrib").hidden = true;
            document.getElementById("cylinder-attrib").hidden = true;
            document.getElementById("sphere-attrib").hidden = true;
            document.getElementById("pentagonal-prism-attrib").hidden = false;
            document.getElementById("teapot-attrib").hidden = true;
            break;

        case "5":   // Show teapot setting.
            document.getElementById("cube-attrib").hidden = true;
            document.getElementById("cylinder-attrib").hidden = true;
            document.getElementById("sphere-attrib").hidden = true;
            document.getElementById("pentagonal-prism-attrib").hidden = true;
            document.getElementById("teapot-attrib").hidden = false;
    }
}