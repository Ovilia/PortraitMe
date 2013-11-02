var gb = {
    two: null,
    face: null
};

window.onload = function() {
    gb.two = new Two({
        fullscreen: true
    });
    gb.two.appendTo(document.body);
    
    PM.asm(null, function(xArr, yArr) {
        gb.face = PM.synthesis(xArr, yArr);
        renderFace(gb.face);
    });
}

function renderFace(face) {
    var faceRatio = 500;
    var a = 0;
    for (var i = 0; i < PM.VERTICE_CNT; ++i) {
        gb.two.makeCircle(
                face.vertice[i].x * faceRatio + window.innerWidth / 2,
                face.vertice[i].y * faceRatio + window.innerHeight / 2,
                2);
        a += (face.vertice[i].x - 0.5);
    }
    gb.two.update();
}