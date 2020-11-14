const renderVector = (cx: number, cy: number, middle, color : string) =>
{
    const renderer = document.getElementById('renderer') as HTMLCanvasElement;
    const context = renderer.getContext('2d') as CanvasRenderingContext2D;
    const x = middle + cx;
    const y = middle - cy;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(middle,middle);
    context.lineTo(x, y);
    context.stroke();
};

const clearScreen = () => {
    const renderer = document.getElementById('renderer') as HTMLCanvasElement;
    const context = renderer.getContext('2d') as CanvasRenderingContext2D;
    context.clearRect(0,0, renderer.width, renderer.height);
    context.beginPath();
    context.rect(0,0,renderer.width, renderer.height);
    context.stroke();
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
    const i = Math.cos(angle);
    const j = Math.sin(angle);
    return i + "i + " + j + "j";
};

const loadVectors = () => {
    clearScreen();
    const dataSource = document.getElementById('data') as HTMLTextAreaElement;
    const text = dataSource.value;
    let resultingVector = [0,0];
    renderVector(0, 100, 500, 'green');
    renderVector(100, 0, 500, 'green');

    text.split("\n").forEach((text) => {
        if (text.split(",").length == 2) {
            const x = parseFloat(text.split(",")[0]);
            const y = parseFloat(text.split(",")[1]);
            renderVector(x, y, 500, 'black');
            resultingVector[0] += x;
            resultingVector[1] += y;
        }
    });
    renderVector(resultingVector[0], resultingVector[1], 500, 'blue');
    const results = document.getElementById('results') as HTMLDivElement;
    results.innerText = "Resulting vector: " + resultingVector + "\n";
    results.innerText += "Resulting length: " + lengthVect(resultingVector) + "\n";
    results.innerText += "Resulting angle: " + lengthAngle(resultingVector) + "\n";
    results.innerText += "Unit vector: " + unitVector(resultingVector) + "\n";


};

const convertRadToDegrees = (rads) => {
    return  (360 / (2*Math.PI)) *rads;
};

const convertDegreesToRad = (degrees) => {
    return  ((2*Math.PI) / 360) *degrees;
};

const calculateAngle = (elementIdX, elementIdY, resultId) => {
    const XEl = document.getElementById(elementIdX) as HTMLInputElement;
    const YEl = document.getElementById(elementIdY) as HTMLInputElement;
    const resultEl = document.getElementById(resultId) as HTMLElement;
    const xNum = parseFloat(XEl.value);
    const yNum = parseFloat(YEl.value);

    resultEl.innerText = Math.atan2(yNum, xNum) + " rads \n" + convertRadToDegrees(Math.atan2(yNum, xNum))  +  "°";
};

const calculateXandY = (lengthVector, angleDegreesId, resultId) => {
    const lengthEl = document.getElementById(lengthVector) as HTMLInputElement;
    const angleDegreesEl = document.getElementById(angleDegreesId) as HTMLInputElement;
    const resultEl = document.getElementById(resultId) as HTMLElement;
    const angleDegrees = parseFloat(angleDegreesEl.value);
    const length = parseFloat(lengthEl.value);
    const angleRads = convertDegreesToRad(angleDegrees);
    const cx = Math.cos(angleRads) * length;
    const cy = Math.sin(angleRads) * length;
    resultEl.innerText = "x:" + cx + " y: " + cy;
};

const loadGraph = () => {
    clearScreen();
    const dataSource = document.getElementById('data') as HTMLTextAreaElement;
    const text = dataSource.value;
    let maxX = 0;
    let maxY = 0;
    text.split("\n").forEach((text) => {
        if (text.split(",").length == 2) {
            const x = parseFloat(text.split(",")[0]);
            const y = parseFloat(text.split(",")[1]);
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }
    });
    const renderer = document.getElementById('renderer') as HTMLCanvasElement;
    const width = renderer.width;
    const height = renderer.height;

    text.split("\n").forEach(function (text) {
        if (text.split(",").length == 2) {
            let x = parseFloat(text.split(",")[0]);
            let y = parseFloat(text.split(",")[1]);
            renderDot(width * x / maxX,height - (height* y / maxY));
        }
    });
};

const renderDot = (x,y) => {
    const renderer = document.getElementById('renderer') as HTMLCanvasElement;
    const context = renderer.getContext('2d') as CanvasRenderingContext2D;
    context.fillStyle = 'black';
    context.beginPath();
    context.rect(x,y,2,2);
    context.stroke();

};

class Entity {
    public x;
    public y;
    public mass;
}

const loadGravity = () => {
    const dataSource = document.getElementById('data') as HTMLTextAreaElement;
    const text = dataSource.value;
    const entities = [];
    text.split("\n").forEach((text) => {
        if (text.split(",").length == 3) {
            const x = parseFloat(text.split(",")[0]);
            const y = parseFloat(text.split(",")[1]);
            const mass = parseFloat(text.split(",")[2]);
            let ent = new Entity();
            ent.x = x;
            ent.y = y;
            ent.mass = mass;
            entities.push(ent);
        }
    });
    let solutions = "";
    const G = 6.674E-11;
    for (let x = 0; x < entities.length; x++) {
        for (let y = x + 1; y < entities.length; y++) {
            const xEntity = entities[x];
            const yEntity = entities[y];
            const force = xEntity.mass * yEntity.mass * G / distance(xEntity, yEntity);
            solutions += "Force of " + x + "<->" + y +":" + force;
        }
    }
    const results = document.getElementById('results') as HTMLDivElement;
    results.innerText = "solutions\n";


};

const distance = (xEntity: Entity, yEntity: Entity): number => {
    const dx = xEntity.x - yEntity.x;
    const dy = xEntity.y - yEntity.y;
    return Math.sqrt(dx*dx + dy*dy);

};

