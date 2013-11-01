/**
 * Author: Wenli Zhang, http://zhangwenli.com
 *
 * Face object definition. It contains vector information and can be customized.
 */

PM.Face = function(xArr, yArr) {
    this.vertice = [];
    this.edges = [];
    
    if (xArr.length != PM.VERTICE_CNT || yArr.length != PM.VERTICE_CNT) {
        console.error('Error length of xArr or yArr in PM.Face.');
        return;
    }
    
    for (var i = 0; i < PM.VERTICE_CNT; ++i) {
        this.vertice.push({x: xArr[i], y: yArr[i]});
    }
};

PM.Face.prototype = {
}
