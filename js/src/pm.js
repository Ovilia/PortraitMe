/**
 * Author: Wenli Zhang, http://zhangwenli.com
 *
 * Basic functions of PortraitMe
 */

PM = {
    // scale arr to be between 0 and 1
    // (x - min(x)) / (max(x) - min(x))
    normalArray: function(arr) {
        var min = Infinity;
        var max = -Infinity;
        for (var i in arr) {
            if (arr[i]) {
                if (arr[i] > max) {
                    max = arr[i];
                }
                if (arr[i] < min) {
                    min = arr[i];
                }
            }
        }
        for (var i in arr) {
            if (arr[i]) {
                arr[i] = (arr[i] - min) / (max - min);
            }
        }
    },
    
    // scale arr to be between min and max
    scaleArray: function(arr, min, max) {
        PM.normalArray(arr);
        for (var i in arr) {
            if (arr[i] !== undefined) {
                arr[i] = arr[i] * (max - min) + min;
            }
        }
    },
    
    // get min and max of array
    rangeArray: function(arr) {
        var copy = arr.slice(0).sort(function(a, b) {
            return a - b;
        });
        if (arr.length > 0) {
            return {
                min: copy[0],
                max: copy[copy.length - 1]
            };
        } else {
            return null;
        }
    }
};
