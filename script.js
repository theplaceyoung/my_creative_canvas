const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let currentColor = 'black';
let isEraserActive = false;

// 각 버튼 클릭 이벤트 리스너
document.getElementById('black').addEventListener('click', () => {
    isEraserActive = false;
    currentColor = 'black';
});

document.getElementById('red').addEventListener('click', () => {
    currentColor = 'red';
});

document.getElementById('blue').addEventListener('click', () => {
    currentColor = 'blue';
});

document.getElementById('yellow').addEventListener('click', () => {
    currentColor = 'yellow';
});

document.getElementById('eraser').addEventListener('click', () => {
    isEraserActive = true;
    currentColor = 'white';
});

document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

document.getElementById('export').addEventListener('click', () => {
    alert('Export 기능 준비 중입니다!');
});

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = isEraserActive ? 10 : 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraserActive ? 'white' : currentColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

}
