//_________________________________________________________________________________//
/*
    To import the image texture to the body element.
*/
//_________________________________________________________________________________//

var imageTex;

for(var i = 0; i < 14; i++)
{
    imageTex = document.createElement("img");
    imageTex.className = "texture";
    imageTex.setAttribute("hidden", "true");
    
    if (i == 0) imageTex.src = "imgs/grass-texture.jpg";
    else if (i == 1) imageTex.src = "imgs/ocean-texture.jpg";
    else if (i == 2) imageTex.src = "imgs/sand-texture.jpg";
    else if (i == 3) imageTex.src = "imgs/snow-texture.jpg";
    else if (i == 4) imageTex.src = "imgs/moon-texture.jpg";
    else if (i == 5) imageTex.src = "imgs/soil-texture.jpg";
    else if (i == 6) imageTex.src = "imgs/cracked-ground-texture.jpg";
    else if (i == 7) imageTex.src = "imgs/paper-texture.jpg";
    else if (i == 8) imageTex.src = "imgs/wooden-board-texture.jpg";
    else if (i == 9) imageTex.src = "imgs/brick-texture.jpg";
    else if (i == 10) imageTex.src = "imgs/silver-texture.jpg";
    else if (i == 11) imageTex.src = "imgs/gold-texture.jpg";
    else if (i == 12) imageTex.src = "imgs/concrete-texture.jpg";
    else if (i == 13) imageTex.src = "imgs/USM-logo-texture.jpg";
    
    document.body.appendChild(imageTex);
}