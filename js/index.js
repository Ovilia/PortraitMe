var gb = {
    paper: null,
    
    STATE: {
        NONE: 0,
        ADD_POINT: 1,
        MOVE_POINT: 2
    },
    state: 0,
    
    mouse: {
        isPressed: false,
        selectedPointId: null
    },
    
    CONTROL_PANEL_HEIGHT: 50,
    NEAR_TOLERANCE: 16,
    LINE_ATTR: {
        stroke: '#45B29D',
        'stroke-width': 1
    },
    POINT_ATTR: {
        fill: '#45B29D'
    },
    
    points: [],
    lines: []
};

$(document).ready(function() {
    gb.paper = new Raphael(0, gb.CONTROL_PANEL_HEIGHT,
            window.innerWidth, window.innerHeight);
    
    mouseEvent();
    
    $('#addPoint').click(function() {
        $('svg').css('cursor', 'crosshair');
        gb.paper.clear();
        gb.lines = [];
        gb.points = [];
        gb.state = gb.STATE.ADD_POINT;
    });
    
    $('#movePoint').click(function() {
        $('svg').css('cursor', 'crosshair');
        if (gb.state === gb.STATE.MOVE_POINT) {
            gb.state = gb.STATE.NONE;
        } else {
            gb.state = gb.STATE.MOVE_POINT;
        }
    })
    
    $('.button').click(function() {
        var that = this;
        $('.button').each(function() {
            if (that === this) {
                $(this).toggleClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    })
});

function mouseEvent() {
    $('svg').mousedown(function(e) {
        var x = e.clientX;
        var y = e.clientY - gb.CONTROL_PANEL_HEIGHT;
        
        if (gb.state === gb.STATE.MOVE_POINT) {
            gb.mouse.selectedPointId = getSelectedPointId(x, y);
            if (gb.mouse.selectedPointId != null) {
                $('svg').css('cursor', 'move');
            }
        }
        
        gb.mouse.isPressed = true;
    
    }).mouseup(function(e) {
        var x = e.clientX;
        var y = e.clientY - gb.CONTROL_PANEL_HEIGHT;
        if (gb.state === gb.STATE.ADD_POINT) {
            if (coverFirstPoint(x, y)) {
                // end adding points
                gb.state = gb.STATE.NONE;
                $('#addPoint').removeClass('selected');
                
                // add line if first point exists
                // TODO: check next if first point is deleted
                if (gb.points[0] && gb.points[gb.points.length - 1]) {
                    var first = gb.points[0].attrs;
                    var last = gb.points[gb.points.length - 1].attrs;
                    var l = gb.paper.path('M ' + first.cx + ' ' + first.cy
                            + ' L ' + last.cx + ' ' + last.cy + ' Z');
                    l.attr(gb.LINE_ATTR);
                    gb.lines.push(l);
                }
                
            } else {
                // add point
                var p = gb.paper.circle(x, y, 5);
                p.attr(gb.POINT_ATTR);
                
                // add line if has former points
                // TODO: check next if last point is deleted
                if (gb.points[gb.points.length - 1]) {
                    var last = gb.points[gb.points.length - 1].attrs;
                    var l = gb.paper.path('M ' + last.cx + ' ' + last.cy
                            + ' L ' + x + ' ' + y + ' Z');
                    l.attr(gb.LINE_ATTR);
                    gb.lines.push(l);
                }
                
                gb.points.push(p);
            }
            
        } else if (gb.state === gb.STATE.MOVE_POINT) {
            gb.mouse.selectedPointId = null;
            $('svg').css('cursor', 'default');
        }
        
        gb.mouse.isPressed = false;
        
    }).mousemove(function(e) {
        var x = e.clientX;
        var y = e.clientY - gb.CONTROL_PANEL_HEIGHT;
        if (gb.state === gb.STATE.ADD_POINT) {
            if (coverFirstPoint(x, y)) {
                // mouse cursor showing ending
                $('svg').css('cursor', 'pointer');
            } else {
                $('svg').css('cursor', 'crosshair');
            }
        
        } else if (gb.state === gb.STATE.MOVE_POINT) {
            if (gb.mouse.isPressed && gb.mouse.selectedPointId !== null) {
                // move point
                gb.points[gb.mouse.selectedPointId].attr('cx', x).attr('cy', y);
                var left = gb.mouse.selectedPointId === 0
                        ? gb.points.length - 1
                        : gb.mouse.selectedPointId - 1;
                var right = gb.mouse.selectedPointId === gb.points.length - 1
                        ? 0 : gb.mouse.selectedPointId + 1;
                gb.lines[left].attr('path', 'M '
                        + gb.points[gb.mouse.selectedPointId].attr('cx') + ' '
                        + gb.points[gb.mouse.selectedPointId].attr('cy') + ' L '
                        + gb.points[left].attr('cx') + ' '
                        + gb.points[left].attr('cy') + ' Z');
                gb.lines[gb.mouse.selectedPointId].attr('path', 'M '
                        + gb.points[gb.mouse.selectedPointId].attr('cx') + ' '
                        + gb.points[gb.mouse.selectedPointId].attr('cy') + ' L '
                        + gb.points[right].attr('cx') + ' '
                        + gb.points[right].attr('cy') + ' Z');
                $('svg').css('cursor', 'move');
            } else {
                if (getSelectedPointId(x, y) != null) {
                    $('svg').css('cursor', 'move');
                } else {
                    $('svg').css('cursor', 'default');
                }
            }
            
        } else {
            $('svg').css('cursor', 'default');
        }
        
        return false;
    });
    
    // return if current position cover with the first point
    function coverFirstPoint(x, y) {
        return gb.points[0]
                && Math.abs(gb.points[0].attrs.cx - x) < gb.NEAR_TOLERANCE
                && Math.abs(gb.points[0].attrs.cy - y) < gb.NEAR_TOLERANCE;
    }
    
    // return index of selected point, null if not exists
    function getSelectedPointId(x, y) {
        for (var i = 0; i < gb.points.length; ++i) {
            if (gb.points[i] && Math.abs(gb.points[i].attrs.cx - x)
                    < gb.NEAR_TOLERANCE && Math.abs(gb.points[i].attrs.cy - y)
                    < gb.NEAR_TOLERANCE) {
                return i;
            }
        }
        return null;
    }
}
