// Canvas 및 Context 생성
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.insertBefore(canvas, document.querySelector('script'));

// Canvas 크기 설정
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// 상태 플래그 및 기본 설정
let drawing = false;  // 그림 그리기 상태 플래그
let currentColor = 'black';  // 기본 색상 설정

// 그리기 상태 관리
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// 시작, 그리기, 종료 함수
function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function draw(event) {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// 색상 변경 버튼 추가
const toolsDiv = document.createElement('div');
toolsDiv.className = 'tools';

// 그리기 모드 전환 스위치 추가
const toggleDrawingButton = document.createElement('button');
toggleDrawingButton.textContent = '그리기 모드 전환';
toggleDrawingButton.className = 'toggle-drawing';
toolsDiv.appendChild(toggleDrawingButton);

['Black', 'Red', 'Blue'].forEach(color => {
    const button = document.createElement('button');
    button.textContent = color;
    button.addEventListener('click', () => (currentColor = color.toLowerCase()));
    toolsDiv.appendChild(button);
});

toggleDrawingButton.addEventListener('click', (e) => {
    e.preventDefault();  // 버튼 클릭 시 화면 이동 방지
    drawing = !drawing;
    if (drawing) {
        console.log("그리기 모드 활성화");
    } else {
        console.log("그리기 모드 비활성화");
        ctx.closePath();
    }
});

// Clear 버튼 추가
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.className = 'clear-canvas';
clearButton.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
toolsDiv.appendChild(clearButton);

// 툴박스 스타일 적용
toolsDiv.classList.add('tools-footer');
document.body.appendChild(toolsDiv);

// Footer 추가
const footer = document.createElement('footer');
footer.style.height = '50px';  // Footer 높이 설정
document.body.appendChild(footer);
