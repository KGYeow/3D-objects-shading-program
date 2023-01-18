// Update some modified variables in the application to the shader program.
function updateVariableToShaderProgram()
{
    // Update the modified position of the model view or camera to the shader program.
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "modelViewMatrix"), false, flatten(modelView));
}

// Draw the objects through their points.
function drawObjects()
{
    // Draw the reference floor.
    gl.uniform1i(gl.getUniformLocation(program, "object"), 0);
    gl.drawArrays(gl.TRIANGLES, 0, objPoints[0]);

    // Draw the cube.
    gl.uniform1i(gl.getUniformLocation(program, "object"), 1);
    gl.drawArrays(gl.TRIANGLES, objPoints[0], objPoints[1]);

    // Draw the cylinder.
    gl.uniform1i(gl.getUniformLocation(program, "object"), 2);
    gl.drawArrays(gl.TRIANGLES, objPoints[1], objPoints[2]);

    // Draw the sphere.
    gl.uniform1i(gl.getUniformLocation(program, "object"), 3);
    gl.drawArrays(gl.TRIANGLES, objPoints[2], objPoints[3]);

    // Draw the pentagonal prism.
    gl.uniform1i(gl.getUniformLocation(program, "object"), 4);
    gl.drawArrays(gl.TRIANGLES, objPoints[3], objPoints[4]);
    
    // Draw the teapot.
    gl.uniform1i(gl.getUniformLocation(program, "object"), 5);
    gl.drawArrays(gl.TRIANGLES, objPoints[4], points.length);
}

// Display the modified values input from the event listener to the screen.
function displayModifiedValue()
{
    // Display the current value of the slider input for point/distance light source position.
    document.getElementById("text-light-x").innerHTML = light.lightPosition[0];
    document.getElementById("text-light-y").innerHTML = light.lightPosition[1];
    document.getElementById("text-light-z").innerHTML = light.lightPosition[2];

    // Display the current value of the slider input for spot light source position.
    document.getElementById("text-spot-light-x").innerHTML = spotLight.lightPosition[0];
    document.getElementById("text-spot-light-y").innerHTML = spotLight.lightPosition[1];
    document.getElementById("text-spot-light-z").innerHTML = spotLight.lightPosition[2];

    // Display the current value of the slider input for spot light rotation/direction.
    document.getElementById("text-spot-light-rotate-x").innerHTML = spotLight.lightDirection[0] + "°";
    document.getElementById("text-spot-light-rotate-y").innerHTML = spotLight.lightDirection[1] + "°";

    // Display the current value of the slider input for camera position.
    document.getElementById("text-camera-pos-x").innerHTML = eye[0];
    document.getElementById("text-camera-pos-y").innerHTML = eye[1];
    document.getElementById("text-camera-pos-z").innerHTML = eye[2];

    // Display the current value of the slider input for camera orientation.
    document.getElementById("text-camera-orient-x").innerHTML = theta[0] + "°";
    document.getElementById("text-camera-orient-y").innerHTML = theta[1] + "°";
    document.getElementById("text-camera-orient-z").innerHTML = theta[2] + "°";

    // Display the current value of the slider input for each object attribute.
    for (var i = 1; i < objNum; i++)
    {
        document.getElementById("text-shininess[".concat(i,"]")).innerHTML = objMaterial[i].materialShininess;
        document.getElementById("text-Ka[".concat(i,"]")).innerHTML = Ka[i];
        document.getElementById("text-Kd[".concat(i,"]")).innerHTML = Kd[i];
        document.getElementById("text-Ks[".concat(i,"]")).innerHTML = Ks[i];
    }
}

// Display and render the objects.
function render()
{
    // Clear the buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Calculate the combination of camera position and rotation from x, y and z positions of the camera postion.
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, rotate(theta[xAxis], [1, 0, 0]));
    modelView = mult(modelView, rotate(theta[yAxis], [0, 1, 0]));
    modelView = mult(modelView, rotate(theta[zAxis], [0, 0, 1]));

    // Update some modified variables in the application to the shader program.
    updateVariableToShaderProgram();
    
    // Draw the objects through their points.
    drawObjects();
    
    // Display the modified values input from the event listener to the screen.
    displayModifiedValue();
    
    // Request to display and render the next frame.
    requestAnimFrame(render);
}