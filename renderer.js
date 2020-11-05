var renderVector = function (points) {
    var renderer = document.getElementById('renderer');
    var context = renderer.getContext('2d');
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(points[0], points[1]);
    context.stroke();
};
var lengthVect = function (points) {
    return points[0] * points[0] + points[1] * points[1];
};
var loadVectors = function () {
    var dataSource = document.getElementById('data');
    var text = dataSource.value;
    var resultingVector = [0, 0];
    text.split("\n").forEach(function (text) {
        if (text.split(",").length == 2) {
            var currentVector = [parseFloat(text.split(",")[1]), parseFloat(text.split(",")[0])];
            renderVector(currentVector);
            resultingVector[0] += currentVector[0];
            resultingVector[1] += currentVector[1];
        }
    });
    renderVector(resultingVector);
    var results = document.getElementById('results');
    results.innerText = "Resulting vector: " + resultingVector;
    results.innerText = "Resulting length: " + lengthVect(resultingVector);
};
