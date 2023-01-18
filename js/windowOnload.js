//_________________________________________________________________________________//
/*
    Global variables declaration.
*/
//_________________________________________________________________________________//

var gl;                 // Create gl object to handle canvas setup.

var points  = [];       // Initialize points, normals & texture coordinates array (stored value will be used in buffer).
var normals = [];
var texCoord = [];

var objPoints = [];     // To hold the starting drawing points of each object.

var modelView;          // Define the camera coordinate.
var projection;         // Define the projection method (orthographic or perspective).
var program;            // Define the shader program needed.
var shadingType = 2;    // Define the shading type (Default: Phong Shading).
var textureType = 0;    // Define the texture type (Default: None).

//********************************************************************//
/*  ===== Create Object Related Global Variables =====

    *Note: Index of the arrays below indicate 3 different objects.
    0: Floor
    1: Cube
    2: Cylinder
    3: Sphere
    4: Pentagonal Prism
    5: Teapot
*/

// Define the number of created objects.
var objNum = 6;

// Define the material attribute for each object.
var objMaterial =
[
    floorMaterialAttribute(),
    cubeMaterialAttribute(),
    cylinderMaterialAttribute(),
    sphereMaterialAttribute(),
    pentagonalPrismMaterialAttribute(),
    teapotMaterialAttribute()
];

// Store the ambient, diffuse and specular products for each object.
// 2 ambient, diffuse and specular products represents 2 light sources interact with the objects.
var ambientProduct = [], ambientProduct1 = [];
var diffuseProduct = [], diffuseProduct1 = [];
var specularProduct = [], specularProduct1 = [];

// Default ambient, diffuse, and specular reflection coefficient for each object.
var Ka = Array(objNum).fill(1);
var Kd = Array(objNum).fill(1);
var Ks = Array(objNum).fill(1);
//********************************************************************//

var light     = lightAttribute();           // Create the point or distance light source.
var spotLight = spotLightAttribute();   // Create the spot light source.

//********************************************************************//
/*  ===== Parameters of Perspective Projection =====

    This section declares the parameter required for perspective
    projection.
*/
const fovy = 55;    // Field of view y.
const near = 0.05;  // Near projection plan from camera position.
const far  = 100;   // Far projection plan from camera position.
//********************************************************************//

//********************************************************************//
/*  ===== Parameters of Camera/Viewer Attribute =====

    This section declares the parameter required for camera/viewer.
*/
var eye  = vec3(0.0, 1.0, 2.0);      // Camera or viewer position.
const at = vec3(0.0, 0.0, 0.0);     // Location to which the viewer is looking.
const up = vec3(0.0, 1.0, 0.0);     // Up direction.

var xAxis = 0;                      // x, y and z axes.
var yAxis = 1;
var zAxis = 2;
var theta = [0, 0, 0];              // Rotation in degrees.
//********************************************************************//

//_________________________________________________________________________________//
/*
    Define the execution if window is loaded.
*/
//_________________________________________________________________________________//
window.onload = function init()
{
    
    var canvas = document.getElementById("gl-canvas");  // Get the canvas from HTML.

    gl = WebGLUtils.setupWebGL(canvas);                 // Setup the canvas and alert.
    if (!gl)
    {
        alert("WebGL isn't available.");                // If the WebGL is not available.
    }

    gl.viewport(0, 0, canvas.width, canvas.height);     // Configure WebGL.
    gl.clearColor(1.0, 1.0, 1.0, 1.0);                  // Canvas background colour.

    gl.enable(gl.DEPTH_TEST);                           // Enable hidden-surface removal.

    //********************************************************************//
    /*  ===== Create Objects =====

        Create floor, cube, cylinder, sphere, pentagonal prism and teapot.
    */
    var refFloor = floor();

    var objCube = cube(0.5);
    objCube.scale(1.0, 1.0, 1.0);
    objCube.translate(-0.6, 0.0, 0.0);

    var objCylinder = cylinder(800, 1, true);
    objCylinder.scale(0.5, 0.5, 0.5);
    objCylinder.translate(0.0, 0.0, 0.0);

    var objSphere = sphere(6);
    objSphere.scale(0.3, 0.3, 0.3);
    objSphere.translate(0.6, 0.0, 0.0);

    var objPentagonalPrism = cylinder(5, 1, true);
    objPentagonalPrism.rotate(180, [0, 1, 0]);
    objPentagonalPrism.scale(0.5, 0.5, 0.5);
    objPentagonalPrism.translate(-0.6, 0.0, -0.6);

    var objTeapot = teapot(20);
    objTeapot.rotate(-45, [0, 1, 0]);
    objTeapot.scale(0.15, 0.15, 0.15);
    objTeapot.translate(0.0, 0.0, -0.6);
    //********************************************************************//

    //********************************************************************//
    /*  ===== Add Points & Normals =====

        Create points and normals for each objects that will be pass
        to the buffer.
    */
    points = refFloor.TriangleVertices;                     // Create the points & normals for the floor.
    normals = refFloor.TriangleNormals;
    texCoord = refFloor.TextureCoordinates;                 // Create the texture coordinates for the floor.
    objPoints[0] = points.length;

    points = points.concat(objCube.TriangleVertices);       // Create the points & normals for the cube.
    normals = normals.concat(objCube.TriangleNormals);
    texCoord = texCoord.concat(objCube.TextureCoordinates);
    objPoints[1] = points.length - objPoints[0];

    points = points.concat(objCylinder.TriangleVertices);   // Create the points & normals for the cylinder.
    normals = normals.concat(objCylinder.TriangleNormals);
    texCoord = texCoord.concat(objCylinder.TextureCoordinates); // Create the texture coordinates for the cylinder.
    objPoints[2] = points.length - objPoints[1];

    points = points.concat(objSphere.TriangleVertices);     // Create the points & normals for the sphere.
    normals = normals.concat(objSphere.TriangleNormals);
    texCoord = texCoord.concat(objSphere.TextureCoordinates);   // Create the texture coordinates for the sphere.
    objPoints[3] = points.length - objPoints[2];

    points = points.concat(objPentagonalPrism.TriangleVertices);    // Create the points & normals for the pentagonal prism.
    normals = normals.concat(objPentagonalPrism.TriangleNormals);
    texCoord = texCoord.concat(objPentagonalPrism.TextureCoordinates);  // Create the texture coordinates for the pentagonal prism.
    objPoints[4] = points.length - objPoints[3];

    points = points.concat(objTeapot.TriangleVertices);    // Create the points & normals for the teapot.
    normals = normals.concat(objTeapot.Normals);
    texCoord = texCoord.concat(objTeapot.TextureCoordinates);   // Create the texture coordinates for the teapot.
    //********************************************************************//

    //********************************************************************//
    /*  ===== Load Shader. =====

        Call the useShadingType() function to use the specific shading type.

        shadingType = 1 --> Gouraud Shading.
        shadingType = 2 --> Phong Shading.
        shadingType = 3 --> Flat Shading.

        **Note:
        gl.getExtension("OES_standard_derivatives") --> Get the extension for flat shading.
    */
    useShadingType(shadingType);
    //********************************************************************//

    //********************************************************************//
    /*  ===== Load Floor Texture. =====

        Call the floorTexture() function to change the texture of the
        floor object.

        Texture type:
        0: None
        1: Grass    6 : Soil            11: Silver
        2: Ocean    7 : Cracked Ground  12: Gold
        3: Sand     8 : Paper           13: Concrete
        4: Snow     9 : Wooden Board    20: USM Logo
        5: Moon     10: Brick       
    */
    floorTexture(textureType);
    //********************************************************************//

    //********************************************************************//
    /*  ===== Make & Initialize Attribute buffers =====

        Create buffer objects, initialize them, and associate them with the
        associated attribute variable in our vertex shader.
    */
    var nBuffer = gl.createBuffer();                            // Create a buffer object for normals array.
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);                    // Load the normal data into the GPU.
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);

    var vNormal = gl.getAttribLocation(program, "vNormal");     // Create a shader variable with normals data buffer.
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);  // Associate out shader variables with our data buffer.
    gl.enableVertexAttribArray(vNormal);

    var vBuffer = gl.createBuffer();                            // Create a buffer object for points array.
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);                    // Load the points data into the GPU.
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition"); // Create a shader variable with points data buffer.
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);// Associate out shader variables with our data buffer.
    gl.enableVertexAttribArray(vPosition);

    var tBuffer = gl.createBuffer();                            // Create a buffer object for texture coordinates array.
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);                   // Load the texture coordinates data into the GPU.
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoord), gl.STATIC_DRAW);

    var vTexCoord = gl.getAttribLocation(program, "vTexCoord");// Create a shader variable with texture coordinates data buffer.
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);// Associate out shader variables with our data buffer.
    gl.enableVertexAttribArray(vTexCoord);
    //********************************************************************//

    //********************************************************************//
    /*  ===== Associate to Vertex & Fragment Shaders =====

        1) Call the associateAppShaderVar() function to associate and
           connect the application variables to the program shader
           variables.
    */
    associateAppShaderVar();
    //********************************************************************//

    // Events handling functions.
    eventListeners();
    
    // Render the object.
    render();
}