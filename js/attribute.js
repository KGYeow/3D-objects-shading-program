// Light properties of the point/distance light source.
function lightAttribute()
{
    var data = {};

    data.lightOn        = true;
    data.lightPosition  = vec4(0.0, 0.0, 10.0, 0.0);
    data.lightAmbient   = vec4(0.8, 0.8,  0.8, 1.0);
    data.lightDiffuse   = vec4(1.0, 1.0,  1.0, 1.0);
    data.lightSpecular  = vec4(1.0, 1.0,  1.0, 1.0);
    data.lightShininess = 10.0;
    
    return data;
}

// Light properties of the spot light source.
function spotLightAttribute()
{
    var data = {};

    data.lightOn        = true;
    data.lightPosition  = vec4(0.0, 1.5, 3.0, 1.0);
    data.lightAmbient   = vec4(0.8, 0.8, 0.8, 1.0);
    data.lightDiffuse   = vec4(1.0, 1.0, 1.0, 1.0);
    data.lightSpecular  = vec4(1.0, 1.0, 1.0, 1.0);
    data.lightShininess = 10.0;
    data.cutOff          = 5;
    data.lightAngleLimit = data.cutOff * Math.PI / 180;
    data.lightDirection  = vec3(0.0, 0.0, 30.0);

    return data;
}

// Material properties of the floor.
function floorMaterialAttribute()
{
    var data  = {};

    data.materialAmbient   = vec4(0.8, 0.8, 0.8, 1.0);
    data.materialDiffuse   = vec4(0.83, 0.83, 0.83, 1.0);   // Light gray floor.
    data.materialSpecular  = vec4(1.0, 1.0, 1.0, 1.0);
    data.materialShininess = 100.0;
    data.haveTexture = true;

    return data;
}

// Material properties of the cube.
function cubeMaterialAttribute()
{   
    var data  = {};

    data.materialAmbient   = vec4(0.0, 0.0, 0.0, 1.0);
    data.materialDiffuse   = vec4(0.2, 0.8, 0.8, 1.0);
    data.materialSpecular  = vec4(1.0, 1.0, 1.0, 1.0);
    data.materialShininess = 100.0;
    data.haveTexture = false;

    return data;
}

// Material properties of the cylinder.
function cylinderMaterialAttribute()
{
    var data  = {};

    data.materialAmbient   = vec4(0.0, 0.0, 0.0, 1.0);
    data.materialDiffuse   = vec4(0.0, 1.0, 0.0, 1.0);
    data.materialSpecular  = vec4(1.0, 1.0, 1.0, 1.0);
    data.materialShininess = 100.0;
    data.haveTexture = false;

    return data;
}

// Material properties of the sphere.
function sphereMaterialAttribute()
{
    var data  = {};

    data.materialAmbient   = vec4(0.0, 0.0, 0.0, 1.0);
    data.materialDiffuse   = vec4(0.8, 1.0, 0.0, 1.0);
    data.materialSpecular  = vec4(1.0, 1.0, 1.0, 1.0);
    data.materialShininess = 100.0;
    data.haveTexture = false;

    return data;
}

// Material properties of the pentagonal prism.
function pentagonalPrismMaterialAttribute()
{
    var data  = {};

    data.materialAmbient   = vec4(0.0, 0.0, 0.0, 1.0);
    data.materialDiffuse   = vec4(1.0, 0.0, 0.0, 1.0);
    data.materialSpecular  = vec4(1.0, 1.0, 1.0, 1.0);
    data.materialShininess = 100.0;
    data.haveTexture = false;

    return data;
}

// Material properties of the teapot.
function teapotMaterialAttribute()
{
    var data  = {};

    data.materialAmbient   = vec4(0.0, 0.0, 0.0, 1.0);
    data.materialDiffuse   = vec4(0.0, 0.0, 1.0, 1.0);
    data.materialSpecular  = vec4(1.0, 1.0, 1.0, 1.0);
    data.materialShininess = 100.0;
    data.haveTexture = false;

    return data;
}