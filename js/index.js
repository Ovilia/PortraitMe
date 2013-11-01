var gb = {
    paper: null
};

window.onload = function() {
    gb.paper = new Raphael(0, 0, window.innerWidth, window.innerHeight);
    
    PM.asm(null, function(xArr, yArr) {
        var HALF_WIDTH = 150;
        var HALF_HEIGHT = 200;
        
        var face = PM.synthesis(xArr, yArr);
        renderFace(face);
        
        //console.log(face);
    });
}

function renderFace(face) {
    var faceRatio = 500;
    for (var i = 0; i < PM.VERTICE_CNT; ++i) {
        gb.paper.circle(
                (face.vertice[i].x - 0.5) * faceRatio + window.innerWidth / 2,
                (face.vertice[i].y - 0.5) * faceRatio + window.innerHeight / 2,
                2);
        //gb.paper.circle(face.vertice[i].x, face.vertice[i].y, 2);
    }
}