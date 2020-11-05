var renderVector = function (cx, cy, middle) {
    var renderer = document.getElementById('renderer');
    var context = renderer.getContext('2d');
    context.beginPath();
    var x = middle + cx;
    var y = middle - cy;
    context.moveTo(middle, middle);
    context.lineTo(x, y);
    context.stroke();
};
var clearScreen = function () {
    var renderer = document.getElementById('renderer');
    var context = renderer.getContext('2d');
    context.clearRect(0, 0, 1000, 1000);
};
var lengthVect = function (points) {
    return Math.sqrt(points[0] * points[0] + points[1] * points[1]);
};
var lengthAngle = function (points) {
    var x = points[0];
    var y = points[1];
    return Math.atan(y / x) * 360 / (2 * Math.PI); //2*P/360 = RAD/GRAD
};
var lengthAngleRad = function (points) {
    var x = points[0];
    var y = points[1];
    return Math.atan(y / x); //2*P/360 = RAD/GRAD
};
var unitVector = function (points) {
    var angle = lengthAngleRad(points);
    var lengthVector = lengthVect(points);
    var i = Math.cos(angle);
    var j = Math.sin(angle);
    return i + "i + " + j + "j";
};
var loadVectors = function () {
    clearScreen();
    var dataSource = document.getElementById('data');
    var text = dataSource.value;
    var resultingVector = [0, 0];
    text.split("\n").forEach(function (text) {
        if (text.split(",").length == 2) {
            var x = parseFloat(text.split(",")[0]);
            var y = parseFloat(text.split(",")[1]);
            renderVector(x, y, 500);
            resultingVector[0] += x;
            resultingVector[1] += y;
        }
    });
    renderVector(resultingVector[0], resultingVector[1], 500);
    var results = document.getElementById('results');
    results.innerText = "Resulting vector: " + resultingVector + "\n";
    results.innerText += "Resulting length: " + lengthVect(resultingVector) + "\n";
    results.innerText += "Resulting angle: " + lengthAngle(resultingVector) + "\n";
    results.innerText += "Unit vector: " + unitVector(resultingVector) + "\n";
};
