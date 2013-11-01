/**
 * Author: Wenli Zhang, http://zhangwenli.com
 *
 * Basic functions of PortraitMe
 */

PM = {
    VERTICE_CNT: 39,
    
    // scale arr to be between 0 and 1
    // scale xArr if yArr is undeifined, scale both using max and min of both
    // if yArr is defined
    // (x - min(x)) / (max(x) - min(x))
    normalArray: function(xArr, yArr) {
        var min = Infinity;
        var max = -Infinity;
        for (var i in xArr) {
            if (xArr[i]) {
                if (xArr[i] > max) {
                    max = xArr[i];
                }
                if (xArr[i] < min) {
                    min = xArr[i];
                }
            }
        }
        if (yArr !== undefined) {
            for (var i in yArr) {
                if (yArr[i]) {
                    if (yArr[i] > max) {
                        max = yArr[i];
                    }
                    if (yArr[i] < min) {
                        min = yArr[i];
                    }
                }
            }
        }
        for (var i in xArr) {
            if (xArr[i]) {
                xArr[i] = (xArr[i] - min) / (max - min);
            }
        }
        if (yArr !== undefined) {
            for (var i in yArr) {
                if (yArr[i]) {
                    yArr[i] = (yArr[i] - min) / (max - min);
                }
            }
        }
    },
    
    // scale arr to be between min and max
    scaleArray: function(arr, min, max) {
        PM.normalArray(arr);
        for (var i in arr) {
            if (arr[i]) {
                arr[i] = arr[i] * (max - min) + min;
            }
        }
    }
};
