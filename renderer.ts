const renderVector = (points: number[]) =>
{
    const renderer = document.getElementById('renderer') as HTMLCanvasElement;
    const context = renderer.getContext('2d') as CanvasRenderingContext2D;
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(points[0], points[1]);
    context.stroke();
};

const lengthVect = (points) => {
    return points[0] * points[0] + points[1]*points[1];
}

const loadVectors = () => {
    const dataSource = document.getElementById('data') as HTMLTextAreaElement;
    const text = dataSource.value;
    let resultingVector = [0,0];
    text.split("\n").forEach((text) => {
        if (text.split(",").length == 2) {
            const currentVector = [parseFloat(text.split(",")[1]), parseFloat(text.split(",")[0])];
            renderVector(currentVector);
            resultingVector[0] += currentVector[0];
            resultingVector[1] += currentVector[1];
        }
    });
    renderVector(resultingVector);
    const results = document.getElementById('results') as HTMLDivElement;
    results.innerText = "Resulting vector: " + resultingVector;
    results.innerText = "Resulting length: " + lengthVect(resultingVector);


};
