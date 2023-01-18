//_________________________________________________________________________________//
/*
    Contain the required event listeners.
*/
//_________________________________________________________________________________//
function eventListeners()
{
    //********************************************************************//
    /*  ===== Change Shading Type =====

        1) Call the useShadingType() function to change the shading
           type.
           
        useShadingType(1) --> Gouraud Shading   (Smooth Shading)
        useShadingType(2) --> Phong Shading     (Smooth Shading)
        useShadingType(3) --> Flat Shading

        2) Call the associateAppShaderVar() function to update and
           associate the application variables to the program shader
           variables.
    */
    document.getElementById("shading-type").onchange = function()
    {
        useShadingType(this.value);
        associateAppShaderVar();
    }
    //********************************************************************//

    //********************************************************************//
    /*  ===== Change Texture Type =====

        Call the floorTexture() function to change the texture of the
        floor object.

        Range of input value:
        0 <= this.value <= 20

        Texture type:
        0: None
        1: Grass    6 : Soil            11: Silver
        2: Ocean    7 : Cracked Ground  12: Gold
        3: Sand     8 : Paper           13: Concrete
        4: Snow     9 : Wooden Board    20: USM Logo
        5: Moon     10: Brick       
    */
    document.getElementById("texture-type").onchange = function(){ floorTexture(this.value); }
    //********************************************************************//

    //********************************************************************//
    /*  ===== Modifications of the Light Sources =====

        There are 2 light sources:
        - 1st: point / distance light
        - 2nd: spot light

        1) Change the x, y and z locations of the 2 light sources

        2) Change the type of the 1st light source.
            - light.lightPosition[3] = 1 (point light)
            - light.lightPosition[3] = 0 (distance light)

        3) Change the direction/rotation of the spot light.

        4) Change the ambient, diffuse, and specular colour of the 2 light sources.

        5) Turn on/off the 2 light sources.
    */
    document.getElementById("light-x").oninput = function(){ changeLightPosition(0, this.value, false); }
    document.getElementById("light-y").oninput = function(){ changeLightPosition(1, this.value, false); }
    document.getElementById("light-z").oninput = function(){ changeLightPosition(2, this.value, false); }
    document.getElementById("light-type").onchange = function(){ changeLightPosition(3, this.value, false); }

    document.getElementById("spot-light-x").oninput = function(){ changeLightPosition(0, this.value, true); }
    document.getElementById("spot-light-y").oninput = function(){ changeLightPosition(1, this.value, true); }
    document.getElementById("spot-light-z").oninput = function(){ changeLightPosition(2, this.value, true); }

    document.getElementById("spot-light-rotate-x").oninput = function(){ changeSpotLightDirection(0, this.value); }
    document.getElementById("spot-light-rotate-y").oninput = function(){ changeSpotLightDirection(1, this.value); }

    document.getElementById("light-ambient-color").oninput = function(){ changeLightObjAttrib(-1, this.value, 0, false); }
    document.getElementById("light-diffuse-color").oninput = function(){ changeLightObjAttrib(-1, this.value, 1, false); }
    document.getElementById("light-specular-color").oninput = function(){ changeLightObjAttrib(-1, this.value, 2, false); }

    document.getElementById("spot-light-ambient-color").oninput = function(){ changeLightObjAttrib(-1, this.value, 0, true); }
    document.getElementById("spot-light-diffuse-color").oninput = function(){ changeLightObjAttrib(-1, this.value, 1, true); }
    document.getElementById("spot-light-specular-color").oninput = function(){ changeLightObjAttrib(-1, this.value, 2, true); }

    document.getElementById("point-dist-light").onchange = function(){ lightTurnOnOff(this, false); }
    document.getElementById("spot-light").onchange = function(){ lightTurnOnOff(this, true); }
    //********************************************************************//

    //********************************************************************//
    /*  ===== Modifications of the Camera/Viewer =====

        1) Change the x, y and z locations of the camera or viewer.
        2) Change the x, y and z orientations of the camera or viewer.
    */
    document.getElementById("camera-pos-x").oninput = function(){ eye[0] = this.value; }
    document.getElementById("camera-pos-y").oninput = function(){ eye[1] = this.value; }
    document.getElementById("camera-pos-z").oninput = function(){ eye[2] = this.value; }

    document.getElementById("camera-orient-x").oninput = function(){ theta[0] = this.value; }
    document.getElementById("camera-orient-y").oninput = function(){ theta[1] = this.value; }
    document.getElementById("camera-orient-z").oninput = function(){ theta[2] = this.value; }
    //********************************************************************//

    //********************************************************************//
    /*  ===== Modifications of the Objects =====

        1) Change the shininess, ambient, diffuse, and specular reflection
           coefficients of each objects.

        2) Change the shininess, ambient, diffuse, and specular products
           of each objects.

        *Note: Index of the arrays below indicate different objects.
        1: Cube
        2: Cylinder
        3: Sphere
        4: Pentagonal Prism
        5: Teapot
    */

    // Modify on cube.
    document.getElementById("obj-ambient-color[1]").oninput = function(){ changeLightObjAttrib(1, this.value, 0); }
    document.getElementById("obj-diffuse-color[1]").oninput = function(){ changeLightObjAttrib(1, this.value, 1); }
    document.getElementById("obj-specular-color[1]").oninput = function(){ changeLightObjAttrib(1, this.value, 2); }
    document.getElementById("shininess[1]").oninput = function(){ changeObjShininess(1, this.value); }
    document.getElementById("ambient-Ka[1]").oninput = function(){ changeReflectCoefficient(1, this.value, 0); }
    document.getElementById("diffuse-Kd[1]").oninput = function(){ changeReflectCoefficient(1, this.value, 1); }
    document.getElementById("specular-Ks[1]").oninput = function(){ changeReflectCoefficient(1, this.value, 2); }

    // Modify on cylinder.
    document.getElementById("obj-ambient-color[2]").oninput = function(){ changeLightObjAttrib(2, this.value, 0); }
    document.getElementById("obj-diffuse-color[2]").oninput = function(){ changeLightObjAttrib(2, this.value, 1); }
    document.getElementById("obj-specular-color[2]").oninput = function(){ changeLightObjAttrib(2, this.value, 2); }
    document.getElementById("shininess[2]").oninput = function(){ changeObjShininess(2, this.value); }
    document.getElementById("ambient-Ka[2]").oninput = function(){ changeReflectCoefficient(2, this.value, 0); }
    document.getElementById("diffuse-Kd[2]").oninput = function(){ changeReflectCoefficient(2, this.value, 1); }
    document.getElementById("specular-Ks[2]").oninput = function(){ changeReflectCoefficient(2, this.value, 2); }

    // Modify on sphere.
    document.getElementById("obj-ambient-color[3]").oninput = function(){ changeLightObjAttrib(3, this.value, 0); }
    document.getElementById("obj-diffuse-color[3]").oninput = function(){ changeLightObjAttrib(3, this.value, 1); }
    document.getElementById("obj-specular-color[3]").oninput = function(){ changeLightObjAttrib(3, this.value, 2); }
    document.getElementById("shininess[3]").oninput = function(){ changeObjShininess(3, this.value); }
    document.getElementById("ambient-Ka[3]").oninput = function(){ changeReflectCoefficient(3, this.value, 0); }
    document.getElementById("diffuse-Kd[3]").oninput = function(){ changeReflectCoefficient(3, this.value, 1); }
    document.getElementById("specular-Ks[3]").oninput = function(){ changeReflectCoefficient(3, this.value, 2); }

    // Modify on pentagonal prism.
    document.getElementById("obj-ambient-color[4]").oninput = function(){ changeLightObjAttrib(4, this.value, 0); }
    document.getElementById("obj-diffuse-color[4]").oninput = function(){ changeLightObjAttrib(4, this.value, 1); }
    document.getElementById("obj-specular-color[4]").oninput = function(){ changeLightObjAttrib(4, this.value, 2); }
    document.getElementById("shininess[4]").oninput = function(){ changeObjShininess(4, this.value); }
    document.getElementById("ambient-Ka[4]").oninput = function(){ changeReflectCoefficient(4, this.value, 0); }
    document.getElementById("diffuse-Kd[4]").oninput = function(){ changeReflectCoefficient(4, this.value, 1); }
    document.getElementById("specular-Ks[4]").oninput = function(){ changeReflectCoefficient(4, this.value, 2); }

    // Modify on teapot.
    document.getElementById("obj-ambient-color[5]").oninput = function(){ changeLightObjAttrib(5, this.value, 0); }
    document.getElementById("obj-diffuse-color[5]").oninput = function(){ changeLightObjAttrib(5, this.value, 1); }
    document.getElementById("obj-specular-color[5]").oninput = function(){ changeLightObjAttrib(5, this.value, 2); }
    document.getElementById("shininess[5]").oninput = function(){ changeObjShininess(5, this.value); }
    document.getElementById("ambient-Ka[5]").oninput = function(){ changeReflectCoefficient(5, this.value, 0); }
    document.getElementById("diffuse-Kd[5]").oninput = function(){ changeReflectCoefficient(5, this.value, 1); }
    document.getElementById("specular-Ks[5]").oninput = function(){ changeReflectCoefficient(5, this.value, 2); }
    //********************************************************************//

    //********************************************************************//
    /*  ===== Graphical User Interface (GUI) Interaction =====

        User interacts with the GUI elements of the webpage.
    */

    // Change the object setting layout.
    document.getElementById("obj").onchange = function(){ changeObjModifyLayout(this.value); }

    // Unmute or mute the background music.
    document.getElementById("music_btn").onclick = function()
    {
        if(document.getElementById("bgMusic").muted)                // If background music is muted.
        {
            document.getElementById("bgMusic").play();              // Play the background music.
            document.getElementById("bgMusic").muted = false;       // Unmute background music.
            document.getElementById("music_img").src = "imgs/music-on.png";
        }
        else                                                        // If background music is unmuted.
        {
            document.getElementById("bgMusic").load();              // Reload the background music.
            document.getElementById("bgMusic").muted = true;        // Mute background music.
            document.getElementById("music_img").src = "imgs/music-off.png";
        }
    }
    //********************************************************************//
}