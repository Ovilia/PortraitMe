/**
 * Author: Wenli Zhang, http://zhangwenli.com
 *
 * This file is an implementation of Active Shape Model 
 * (Van Ginneken B, Frangi A F, Staal J J, et al. Active shape model 
 * segmentation with optimal features[J]. medical Imaging, IEEE Transactions on,
 * 2002, 21(8): 924-933.).
 *
 * Input:
 * srcImg: image to be processed, containing at least one human face
 *
 * Output:
 * ptArr: array of point locations computed using ASM algorithm
 */

PM.asm = function(srcImg, callback) {
    // TODO: Use fade data currently
    var dataFile = new XMLHttpRequest();
    dataFile.open('GET', 'asm.txt', true);
    dataFile.onreadystatechange = function() {
        if (dataFile.readyState === 4) {
            if (dataFile.status === 200 || dataFile.status === 0) {
                var text = dataFile.responseText;
                var data = text.split('\n');
                var x = [], y = [];
                for (var i in data) {
                    if (data[i]) {
                        var pair = data[i].split(' ');
                        x.push(parseInt(pair[0], 10));
                        y.push(parseInt(pair[1], 11));
                    }
                }
                PM.normalArray(x, y);
                callback(x, y);
            } else {
                console.log('Error loading data file.');
            }
        }
    }
    dataFile.send(null);
};
