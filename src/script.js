window.onload = function() {
    // Initial Setup
    initLoadingScreen();
    setFixedCanvasSize();
    applyDrawingEvents();
};

// 캔버스 크기 고정
const MAX_CANVAS_WIDTH = 1200;
const MAX_CANVAS_HEIGHT = 2800;
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let currentColor = 'black';
let isEraserActive = false;
let canvasWidth = MAX_CANVAS_WIDTH;
let canvasHeight = MAX_CANVAS_HEIGHT;

// 로딩 화면 숨기고 실제 콘텐츠 표시
function initLoadingScreen() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }, 1500);
}

// 캔버스 크기 고정
function setFixedCanvasSize() {
    canvas.width = MAX_CANVAS_WIDTH;
    canvas.height = MAX_CANVAS_HEIGHT;
}

// 캔버스 크기 변경 버튼 클릭 시 동작
document.getElementById('applyCanvasSize').addEventListener('click', () => {
    const newWidth = parseInt(document.getElementById('canvasWidth').value);
    const newHeight = parseInt(document.getElementById('canvasHeight').value);
    
    if (isValidCanvasSize(newWidth, newHeight)) {
        resizeCanvas(newWidth, newHeight);
    } else {
        alert(`Invalid size. Please enter a value between 100 and ${MAX_CANVAS_WIDTH} for width and between 100 and ${MAX_CANVAS_HEIGHT} for height.`);
    }
});

// 캔버스 크기 유효성 검사
function isValidCanvasSize(width, height) {
    return width >= 100 && width <= MAX_CANVAS_WIDTH && height >= 100 && height <= MAX_CANVAS_HEIGHT;
}

// 캔버스 크기 변경
function resizeCanvas(newWidth, newHeight) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scaleX = newWidth / canvas.width;
    const scaleY = newHeight / canvas.height;

    canvas.width = newWidth;
    canvas.height = newHeight;
    
    ctx.save();
    ctx.scale(scaleX, scaleY);
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();

    alert(`Canvas size changed to ${newWidth}x${newHeight}`);
    document.getElementById('canvasSizeMenu').style.display = 'none'; // 메뉴 숨기기
}

// 캔버스 크기 설정 메뉴 열기
document.getElementById('openCanvasSizeMenu').addEventListener('click', toggleCanvasSizeMenu);

// 캔버스 크기 설정 메뉴 닫기
document.getElementById('closeCanvasSizeMenu').addEventListener('click', () => {
    document.getElementById('canvasSizeMenu').style.display = 'none';
});

// // 캔버스 크기 설정 메뉴 열기
// document.getElementById('openCanvasSizeMenu').addEventListener('click', () => {
//     const menu = document.getElementById('canvasSizeMenu');
//     menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
// });

// // 캔버스 크기 설정 메뉴 닫기
// document.getElementById('closeCanvasSizeMenu').addEventListener('click', () => {
//     const menu = document.getElementById('canvasSizeMenu');
//     menu.style.display = 'none';  // 메뉴 숨기기
// });

// 그리기 관련 이벤트 설정
function applyDrawingEvents() {
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    document.getElementById('black').addEventListener('click', () => setColor('black'));
    document.getElementById('red').addEventListener('click', () => setColor('red'));
    document.getElementById('blue').addEventListener('click', () => setColor('blue'));
    document.getElementById('yellow').addEventListener('click', () => setColor('yellow'));
    document.getElementById('eraser').addEventListener('click', () => setEraser(true));
}

// // 그리기 관련 함수
// function applyDrawingEvents() {
//     const canvas = document.getElementById('drawingCanvas');
//     const ctx = canvas.getContext('2d');
    
//     let painting = false;
//     let currentColor = 'black';
//     let isEraserActive = false;

//     // 그리기 관련 함수
//     canvas.addEventListener('mousedown', startPosition);
//     canvas.addEventListener('mouseup', endPosition);
//     canvas.addEventListener('mousemove', (e) => {
//         if (!painting) return;
    
//         const rect = canvas.getBoundingClientRect(); // 캔버스의 렌더링 위치
//         console.log(`Canvas Rect:`, rect);
//         console.log(`Mouse: X=${e.clientX}, Y=${e.clientY}`);
    
//         // 스케일 계산 (CSS 크기와 실제 캔버스 크기의 비율)
//         const scaleX = canvas.width / rect.width;
//         const scaleY = canvas.height / rect.height;
    
//         console.log(`ScaleX: ${scaleX}, ScaleY: ${scaleY}`);
    
//         // 마우스 위치를 스케일 비율에 맞게 보정
//         const x = (e.clientX - rect.left) * scaleX;
//         const y = (e.clientY - rect.top) * scaleY;
    
//         ctx.lineWidth = isEraserActive ? 10 : 2;
//         ctx.lineCap = 'round';
//         ctx.strokeStyle = isEraserActive ? 'white' : currentColor;
    
//         ctx.lineTo(x, y);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(x, y);
//     });

//     function startPosition(e) {
//         painting = true;
//         draw(e);
//     }

//     function endPosition() {
//         painting = false;
//         ctx.beginPath();
//     }

//     function draw(e) {
//         if (!painting) return;
    
//         // 캔버스의 경계 박스와 크기
//         const rect = canvas.getBoundingClientRect();
    
//         // 캔버스의 실제 크기와 CSS 크기 간 비율 계산
//         const scaleX = canvas.width / rect.width;  // X축 스케일
//         const scaleY = canvas.height / rect.height; // Y축 스케일
    
//         // 마우스 좌표를 캔버스 좌표로 변환
//         const x = (e.clientX - rect.left) * scaleX;
//         const y = (e.clientY - rect.top) * scaleY;
    
//         // 드로잉 로직
//         ctx.lineWidth = isEraserActive ? 10 : 2;
//         ctx.lineCap = 'round';
//         ctx.strokeStyle = isEraserActive ? 'white' : currentColor;
    
//         ctx.lineTo(x, y);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(x, y);
//     }

//     // 펜 색상 설정
//     document.getElementById('black').addEventListener('click', () => {
//         isEraserActive = false;
//         currentColor = 'black';
//     });

//     document.getElementById('red').addEventListener('click', () => {
//         currentColor = 'red';
//     });

//     document.getElementById('blue').addEventListener('click', () => {
//         currentColor = 'blue';
//     });

//     document.getElementById('yellow').addEventListener('click', () => {
//         currentColor = 'yellow';
//     });

//     document.getElementById('eraser').addEventListener('click', () => {
//         isEraserActive = true;
//         currentColor = 'white';
//     });
// }
// 그리기 시작
function startPosition(e) {
    painting = true;
    draw(e);
}

// 그리기 종료
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// 그리기 함수
function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.lineWidth = isEraserActive ? 10 : 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraserActive ? 'white' : currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// 색상 설정
function setColor(color) {
    isEraserActive = false;
    currentColor = color;
}

// 지우개 활성화
function setEraser(status) {
    isEraserActive = status;
    currentColor = 'white';
}

// // 그리기 이벤트 초기화
// applyDrawingEvents();

// 저장 버튼 클릭 시
document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

// Export 버튼 클릭 시
document.getElementById('exportBtn').addEventListener('click', () => {
    const fileType = document.getElementById('fileTypeSelect').value;
    const canvas = document.getElementById('drawingCanvas');

    if (fileType === 'png') {
        exportCanvasAsPNG(canvas);
    } else if (fileType === 'jpeg') {
        exportCanvasAsJPEG(canvas);
    } else if (fileType === 'pdf') {
        exportCanvasAsPDF(canvas);
    }
});

// PNG로 export
function exportCanvasAsPNG(canvas) {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'drawing.png';
    link.click();
}

// JPEG로 export
function exportCanvasAsJPEG(canvas) {
    const dataUrl = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'drawing.jpg';
    link.click();
}

// PDF로 export
function exportCanvasAsPDF(canvas) {
    const pdf = new jsPDF();
    const canvasImg = canvas.toDataURL('image/png');
    pdf.addImage(canvasImg, 'PNG', 10, 10, 180, 160);
    pdf.save('drawing.pdf');
}

// 드래그 앤 드롭 툴박스 처리
const toolsContainer = document.getElementById('toolbox');
const toolsContainerParent = toolsContainer.parentElement;

let isDraggingTools = false;

toolsContainer.addEventListener('mousedown', (e) => {
    isDraggingTools = true;
    e.preventDefault();
});

window.addEventListener('mousemove', (e) => {
    if (isDraggingTools) {
        const rect = toolsContainerParent.getBoundingClientRect();
        const x = e.pageX - rect.left - toolsContainer.offsetWidth / 2;
        const y = e.pageY - rect.top - toolsContainer.offsetHeight / 2;

        const maxX = rect.width - toolsContainer.offsetWidth;
        const maxY = rect.height - toolsContainer.offsetHeight;

        toolsContainer.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        toolsContainer.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    }
});

window.addEventListener('mouseup', () => {
    isDraggingTools = false;

    const rect = toolsContainerParent.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const left = Math.max(0, Math.min(toolsContainer.offsetLeft, windowWidth - toolsContainer.offsetWidth));
    const top = Math.max(0, Math.min(toolsContainer.offsetTop, windowHeight - toolsContainer.offsetHeight));

    toolsContainer.style.left = `${left}px`;
    toolsContainer.style.top = `${top}px`;
});
