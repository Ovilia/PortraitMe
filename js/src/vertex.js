/**
 * Author: Wenli Zhang, http://zhangwenli.com
 *
 * Vertex contains information of a single point in path.
 */

PM.Vertex = function(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type === undefined ? this.TYPE.NONE : type;
};

PM.Vertex.prototype = {
    TYPE: {
        CORDER: 0,
        SMOOTH: 1,
        SYMMETRIC: 2,
        HALF: 3,
        NONE: 4
    },
};
