export function getCanvasStandardColor() {
    return '#0f0f0f';
}

export function getDistanceBetweenSegments(a: number, b: number, c: number, d: number, p: number, q: number, r: number, s: number) {
    if (intersects(a, b, c, d, p, q, r, s)) {
        return 0;
    }

    let testDist = getDistanceToSegment(a, b, p, q, r, s);
    let bestDist = testDist;

    testDist = getDistanceToSegment(c, d, p, q, r, s);
    if (testDist < bestDist) {
        bestDist = testDist;
    }

    testDist = getDistanceToSegment(p, q, a, b, c, d);
    if (testDist < bestDist) {
        bestDist = testDist;
    }

    testDist = getDistanceToSegment(r, s, a, b, c, d);
    if (testDist < bestDist) {
        bestDist = testDist;
    }

    return bestDist;
}

function intersects(a: number, b: number, c: number, d: number, p: number, q: number, r: number, s: number) {
    var det: number,  gamma: number,  lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

function getDistanceToSegment(x: number, y: number, x1: number, y1: number, x2: number, y2: number) {
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;
    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq != 0)
        param = dot / len_sq;
  
    var xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    }
    else if (param > 1) {
      xx = x2;
      yy = y2;
    }
    else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
  
    var dx = x - xx;
    var dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}