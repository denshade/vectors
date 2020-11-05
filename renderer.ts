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
}

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
    results.innerText = "Resulting vector: " + resultingVector;
    results.innerText = "Resulting length: " + lengthVect(resultingVector);


};
