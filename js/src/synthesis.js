/**
 * Author: Wenli Zhang, http://zhangwenli.com
 *
 * Synthesis a cartoon face with point positions returned from asm.js.
 *
 * Input:
 * xArr, yArr: array of points locations computed using ASM algorithm
 *
 * Output:
 * pmFace: instance of Face, with contains vector information of synthesised
 *         face
 */

PM.synthesis = function(xArr, yArr) {
    return new PM.Face(xArr, yArr);
}
