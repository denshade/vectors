const renderVector = (cx: number, cy: number, middle) =>
{
    const renderer = document.getElementById('renderer') as HTMLCanvasElement;
    const context = renderer.getContext('2d') as CanvasRenderingContext2D;
    context.beginPath();
    const x = middle + cx;
    const y = middle - cy;

    context.moveTo(middle,middle);
    context.lineTo(x, y);
    context.stroke();
};

const clearScreen = () => {
    const renderer = document.getElementById('renderer') as HTMLCanvasElement;
    const context = renderer.getContext('2d') as CanvasRenderingContext2D;
    context.clearRect(0,0, 1000, 1000);
};

const lengthVect = (points) => {
    return Math.sqrt(points[0] * points[0] + points[1]*points[1]);
};

const lengthAngle = (points) => {
    const x = points[0];
    const y = points[1];
    return Math.atan(y/x) * 360 / (2*Math.PI) ; //2*P/360 = RAD/GRAD
};
const lengthAngleRad = (points) => {
    const x = points[0];
    const y = points[1];
    return Math.atan(y/x); //2*P/360 = RAD/GRAD
};

const unitVector = (points) => {
    const angle = lengthAngleRad(points);
    const lengthVector = lengthVect(points);
    const i =Math.cos(angle);
    const j = Math.sin(angle);
    return i + "i + " + j + "j";
};

const loadVectors = () => {
    clearScreen();
    const dataSource = document.getElementById('data') as HTMLTextAreaElement;
    const text = dataSource.value;
    let resultingVector = [0,0];
    text.split("\n").forEach((text) => {
        if (text.split(",").length == 2) {
            const x = parseFloat(text.split(",")[0]);
            const y = parseFloat(text.split(",")[1]);
            renderVector(x, y, 500);
            resultingVector[0] += x;
            resultingVector[1] += y;
        }
    });
    renderVector(resultingVector[0], resultingVector[1], 500);
    const results = document.getElementById('results') as HTMLDivElement;
    results.innerText = "Resulting vector: " + resultingVector + "\n";
    results.innerText += "Resulting length: " + lengthVect(resultingVector) + "\n";
    results.innerText += "Resulting angle: " + lengthAngle(resultingVector) + "\n";
    results.innerText += "Unit vector: " + unitVector(resultingVector) + "\n";


};
