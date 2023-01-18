function floor()
{
    var data = {};

    var size = 80.0;
    var floorHeight = -3.0;

    var floorVertices =
    [
        [ size, floorHeight,  size, 1.0],
        [-size, floorHeight,  size, 1.0],
        [-size, floorHeight, -size, 1.0],
        [ size, floorHeight, -size, 1.0]
    ];

    var floorElements =
    [
        1, 0, 3,
        3, 2, 1
    ];

    var floorTexElements =
    [
        1, 0, 3,
        3, 2, 1
    ];

    var floorNormalElements =
    [
        0, 0, 0,
        0, 0, 0
    ];

    var floorFaceNormals =
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
    ];

    var faceTexCoord =
    [
        [1, 1],
        [0, 1],
        [0, 0],
        [1, 0],
    ];

    var floorTriangleVertices = [];
    var floorTriangleNormals = [];
    var floorTextureCoordinates = [];

    for (var i = 0; i < floorElements.length; i++)
    {
        floorTriangleVertices.push(floorVertices[floorElements[i]] );
        floorTriangleNormals.push(floorFaceNormals[floorNormalElements[i]]);
        floorTextureCoordinates.push(faceTexCoord[floorTexElements[i]]);
    }

    data.TriangleVertices = floorTriangleVertices;
    data.TriangleNormals = floorTriangleNormals;
    data.TextureCoordinates = floorTextureCoordinates;

    return data;
}