window.onload = function() {
    // 로딩 화면 숨기고 실제 콘텐츠 표시
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none'; // 로딩 화면 숨김
        document.getElementById('mainContent').style.display = 'block';  // 실제 콘텐츠 표시
    }, 1000);  // 1초 후 로딩 화면 제거
};

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let currentColor = 'black';
let isEraserActive = false;

// 캔버스 크기를 윈도우 크기에 맞추는 함수
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100; // 헤더와 푸터를 제외한 화면 크기
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 크기 변경 시 기존 캔버스 내용 초기화
}

// 윈도우 크기 변경 시 캔버스 크기 조정
window.addEventListener('resize', resizeCanvas);

// 페이지 로드 시 캔버스 크기 초기화
resizeCanvas();

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
