var renderVector = function (cx, cy, middle, color) {
    var renderer = document.getElementById('renderer');
    var context = renderer.getContext('2d');
    var x = middle + cx;
    var y = middle - cy;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(middle, middle);
    context.lineTo(x, y);
    context.stroke();
};
var clearScreen = function () {
    var renderer = document.getElementById('renderer');
    var context = renderer.getContext('2d');
    context.clearRect(0, 0, renderer.width, renderer.height);
    context.beginPath();
    context.rect(0, 0, renderer.width, renderer.height);
    context.stroke();
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
    var i = Math.cos(angle);
    var j = Math.sin(angle);
    return i + "i + " + j + "j";
};
var loadVectors = function () {
    clearScreen();
    var dataSource = document.getElementById('data');
    var text = dataSource.value;
    var resultingVector = [0, 0];
    renderVector(0, 100, 500, 'green');
    renderVector(100, 0, 500, 'green');
    text.split("\n").forEach(function (text) {
        if (text.split(",").length == 2) {
            var x = parseFloat(text.split(",")[0]);
            var y = parseFloat(text.split(",")[1]);
            renderVector(x, y, 500, 'black');
            resultingVector[0] += x;
            resultingVector[1] += y;
        }
    });
    renderVector(resultingVector[0], resultingVector[1], 500, 'blue');
    var results = document.getElementById('results');
    results.innerText = "Resulting vector: " + resultingVector + "\n";
    results.innerText += "Resulting length: " + lengthVect(resultingVector) + "\n";
    results.innerText += "Resulting angle: " + lengthAngle(resultingVector) + "\n";
    results.innerText += "Unit vector: " + unitVector(resultingVector) + "\n";
};
var convertRadToDegrees = function (rads) {
    return (360 / (2 * Math.PI)) * rads;
};
var convertDegreesToRad = function (degrees) {
    return ((2 * Math.PI) / 360) * degrees;
};
var calculateAngle = function (elementIdX, elementIdY, resultId) {
    var XEl = document.getElementById(elementIdX);
    var YEl = document.getElementById(elementIdY);
    var resultEl = document.getElementById(resultId);
    var xNum = parseFloat(XEl.value);
    var yNum = parseFloat(YEl.value);
    resultEl.innerText = Math.atan2(yNum, xNum) + " rads \n" + convertRadToDegrees(Math.atan2(yNum, xNum)) + "°";
};
var calculateXandY = function (lengthVector, angleDegreesId, resultId) {
    var lengthEl = document.getElementById(lengthVector);
    var angleDegreesEl = document.getElementById(angleDegreesId);
    var resultEl = document.getElementById(resultId);
    var angleDegrees = parseFloat(angleDegreesEl.value);
    var length = parseFloat(lengthEl.value);
    var angleRads = convertDegreesToRad(angleDegrees);
    var cx = Math.cos(angleRads) * length;
    var cy = Math.sin(angleRads) * length;
    resultEl.innerText = "x:" + cx + " y: " + cy;
};
var loadGraph = function () {
    clearScreen();
    var dataSource = document.getElementById('data');
    var text = dataSource.value;
    var maxX = 0;
    var maxY = 0;
    text.split("\n").forEach(function (text) {
        if (text.split(",").length == 2) {
            var x = parseFloat(text.split(",")[0]);
            var y = parseFloat(text.split(",")[1]);
            if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
        }
    });
    var renderer = document.getElementById('renderer');
    var width = renderer.width;
    var height = renderer.height;
    text.split("\n").forEach(function (text) {
        if (text.split(",").length == 2) {
            var x = parseFloat(text.split(",")[0]);
            var y = parseFloat(text.split(",")[1]);
            renderDot(width * x / maxX, height - (height * y / maxY));
        }
    });
};
var renderDot = function (x, y) {
    var renderer = document.getElementById('renderer');
    var context = renderer.getContext('2d');
    context.fillStyle = 'black';
    context.beginPath();
    context.rect(x, y, 2, 2);
    context.stroke();
};
