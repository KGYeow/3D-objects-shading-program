// Determine the texture of the floor object.
function floorTexture(texType)
{
    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

    // Asynchronously load an image.
    var image = new Image();

    if(texType == 0)    // Disable the texture.
        textureTurnOnOff(0, false);
    else                // Enable the texture.
    {
        textureTurnOnOff(0, true);

        // Nature Texture.
        if(texType == 1) image.src = "/3D-objects-shading-program/imgs/grass-texture.jpg";               // If it is grass texture.
        else if (texType == 2) image.src = "/3D-objects-shading-program/imgs/ocean-texture.jpg";         // If it is ocean texture.
        else if (texType == 3) image.src = "/3D-objects-shading-program/imgs/sand-texture.jpg";          // If it is sand texture.
        else if (texType == 4) image.src = "/3D-objects-shading-program/imgs/snow-texture.jpg";          // If it is snow texture.
        else if (texType == 5) image.src = "/3D-objects-shading-program/imgs/moon-texture.jpg";          // If it is moon texture.
        else if (texType == 6) image.src = "/3D-objects-shading-program/imgs/soil-texture.jpg";          // If it is soil texture.
        else if (texType == 7) image.src = "/3D-objects-shading-program/imgs/cracked-ground-texture.jpg";// If it is cracked ground texture.

        // Material Texture.
        else if (texType == 8) image.src = "/3D-objects-shading-program/imgs/paper-texture.jpg";         // If it is paper texture.
        else if (texType == 9) image.src = "/3D-objects-shading-program/imgs/wooden-board-texture.jpg";  // If it is wooden board texture.
        else if (texType == 10) image.src = "/3D-objects-shading-program/imgs/brick-texture.jpg";         // If it is brick texture.
        else if (texType == 11) image.src = "/3D-objects-shading-program/imgs/silver-texture.jpg";       // If it is silver texture.
        else if (texType == 12) image.src = "/3D-objects-shading-program/imgs/gold-texture.jpg";         // If it is gold texture.
        else if (texType == 13) image.src = "/3D-objects-shading-program/imgs/concrete-texture.jpg";// If it is concrete texture.

        // Logo Texture.
        else if (texType == 20) image.src = "/3D-objects-shading-program/imgs/USM-logo-texture.jpg";     // If it is USM logo texture.
    }

    image.onload = function imgInit()
    {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        if (isPowerOf2(image.width) && isPowerOf2(image.height))
            gl.generateMipmap(gl.TEXTURE_2D);
        else
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    }

    return texture;
}

// Check if the value is the power of 2.
function isPowerOf2(value)
{
    return (value & (value - 1)) == 0;
}