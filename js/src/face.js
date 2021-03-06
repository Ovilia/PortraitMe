/**
 * Author: Wenli Zhang, http://zhangwenli.com
 *
 * Face object definition. It contains vector information and can be customized.
 */

PM.Face = function(xArr, yArr) {
    this.vertice = [];
    this.edges = [];
    
    if (xArr.length != this.VERTICE_CNT || yArr.length != this.VERTICE_CNT) {
        console.error('Error length of xArr or yArr in PM.Face.');
        return;
    }
    
    // vertice position
    for (var i = 0; i < this.VERTICE_CNT; ++i) {
        this.vertice.push({x: xArr[i], y: yArr[i]});
    }
    
    // vertice id which makes an edge
    for (var e in this.edgeId) {
        var lastVid = null;
        for (var i = 0; i < this.edgeId[e].length; ++i) {
            // continue with last path
            if (lastVid !== null) {
                this.edges.push(new PM.Edge(
                        new PM.Vertex(xArr[lastVid], yArr[lastVid]),
                        new PM.Vertex(xArr[this.edgeId[e][i][0]], 
                        yArr[this.edgeId[e][i][0]])));
            }
            // this path
            for (var j = this.edgeId[e][i][0]; j < this.edgeId[e][i][1]; ++j) {
                if (this.vertexType[j] !== PM.Vertex.prototype.TYPE.NONE) {
                    this.edges.push(new PM.Edge(
                            new PM.Vertex(xArr[j], yArr[j]), 
                            new PM.Vertex(xArr[j + 1], yArr[j + 1])));
                }
            }
            lastVid = this.edgeId[e][i][1];
        }
        // loop this path
        var type = this.vertexType[this.edgeId[e][--i][1]];
        if (this.edgeId[e][i][2] === 'c' 
                && (type == PM.Vertex.prototype.TYPE.CORDER
                || type == PM.Vertex.prototype.TYPE.SMOOTH
                || type == PM.Vertex.prototype.TYPE.SYMMETRIC)) {
            this.edges.push(new PM.Edge(
                    new PM.Vertex(xArr[this.edgeId[e][i][1]], 
                    yArr[this.edgeId[e][i][1]]), 
                    new PM.Vertex(xArr[this.edgeId[e][i][0]],
                    yArr[this.edgeId[e][i][0]])));
            lastVid = this.edgeId[e][i][1];
        }
    }

};

PM.Face.prototype = {
    VERTICE_CNT: 77,
    
    vertexType: [
        1,   //  0, LTemple
        1,   //  1, LJaw01
        1,   //  2, LJawNoseline
        1,   //  3, LJawMouthline
        1,   //  4, LJaw04
        2,   //  5, LJaw05
        1,   //  6, CTipOfChin
        1,   //  7, RJaw07
        1,   //  8, RJaw08
        1,   //  9, RJawMouthline
        1,   // 10, RJawNoseline
        1,   // 11, RJaw11
        1,   // 12, RTemple
        1,   // 13, RForehead
        2,   // 14, CForehead
        1,   // 15, LForehead
        1,   // 16, LEyebrowTopInner
        1,   // 17, LEyebrowTopOuter
        0,   // 18, LEyebrowOuter
        1,   // 19, LEyebrowBotOuter
        1,   // 20, LEyebrowBotInner
        0,   // 21, LEyebrowInner
        1,   // 22, REyebrowInner
        1,   // 23, REyebrowTopInner
        0,   // 24, REyebrowTopOuter
        0,   // 25, REyebrowOuter
        1,   // 26, REyebrowBotOuter
        1,   // 27, REyebrowBotInner
        4,   // 28, REyelid
        4,   // 29, LEyelid
        0,   // 30, LEyeInner
        1,   // 31, LEye31
        1,   // 32, LEyeTop
        1,   // 33, LEye33
        0,   // 34, LEyeOuter
        1,   // 35, LEye35
        1,   // 36, LEyeBot
        1,   // 37, LEye37
        4,   // 38, LPupil
        1,   // 39, RPupil
        0,   // 40, REyeInner
        1,   // 41, REye41
        1,   // 42, REyeTop
        1,   // 43, REye43
        0,   // 44, REyeOuter
        1,   // 45, REye45
        1,   // 46, REyeBot
        1,   // 47, REye47
        3,   // 48, RNoseMid
        1,   // 49, CNoseMid
        4,   // 50, LNoseMid
        1,   // 51, LNostrilTop
        1,   // 52, CNoseTip
        1,   // 53, RNostrilTop
        0,   // 54, RNoseSide
        3,   // 55, RNostrilBot
        1,   // 56, CNoseBase
        3,   // 57, LNostrilBot
        4,   // 58, LNoseSide
        0,   // 59, LMouthCorner
        1,   // 60, LMouth60
        1,   // 61, LMouthCupid
        2,   // 62, CTopOfTopLip
        1,   // 63, RMouthCupid
        1,   // 64, RMouth64
        0,   // 65, RMouthCorner
        1,   // 66, RMouth66
        2,   // 67, CBotOfTopLip
        1,   // 68, LMouth68
        1,   // 69, LMouth69
        2,   // 70, CTopOfBotLip
        1,   // 71, RMouth71
        1,   // 72, RMouth72
        1,   // 73, RMouth73
        2,   // 74, CBotOfBotLip
        1,   // 75, LMouth75
        1    // 76, LMouth76
    ],
    
    // 'c' for making circle, 'l' for making line
    edgeId: {
        Face:       [[0,  15, 'c']],
        
        LEyeBrow:   [[16, 21, 'c']],
        REyeBrow:   [[22, 27, 'c']],
        LEye:       [[30, 37, 'c']],
        REye:       [[40, 47, 'c']],
        
        Nose:       [[48, 48, 'l'], [54, 55, 'l'], [53, 53, 'l'], [56, 56, 'l'], [51, 51, 'l'], [57, 57, 'l'], [58, 58, 'l'],
                    [50, 50, 'l']],
        
        TopMouth:   [[59, 68, 'c']],
        BotMouth:   [[59, 59, 'l'], [69, 71, 'c'], [65, 65, 'l'], [72, 76, 'l'],
                    [59, 59]]
        // TODO
    }
}
