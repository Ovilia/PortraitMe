var gb = {
    two: null,
    face: null,
    
    FACE_RATIO: 400
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

function renderFace() {
    for (var i = 0; i < gb.face.vertice.length; ++i) {
        gb.two.makeCircle(getScreenX(gb.face.vertice[i].x),
                getScreenY(gb.face.vertice[i].y), 2)//.linewidth = i * 2 + 1;
    }
    for (var i = 0; i < gb.face.edges.length; ++i) {
        var e = gb.face.edges[i];
        gb.two.makeLine(getScreenX(e.v1.x),
                getScreenY(e.v1.y),
                getScreenX(e.v2.x),
                getScreenY(e.v2.y));
    }
    gb.two.update();
}

// get position on screen with position in face
function getScreenX(x) {
    return x * gb.FACE_RATIO + window.innerWidth / 2;
}

// get position on screen with position in face
function getScreenY(y) {
    return y * gb.FACE_RATIO + window.innerHeight / 2;
}
