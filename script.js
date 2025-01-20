const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.insertBefore(canvas, document.querySelector('script'));

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let isDrawing = false;
let currentColor = 'black';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function draw(event) {
    if (!isDrawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

// Add buttons for tools
const toolsDiv = document.createElement('div');
toolsDiv.className = 'tools';

['Black', 'Red', 'Blue'].forEach(color => {
    const button = document.createElement('button');
    button.textContent = color;
    button.addEventListener('click', () => (currentColor = color.toLowerCase()));
    toolsDiv.appendChild(button);
});

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
toolsDiv.appendChild(clearButton);

document.body.insertBefore(toolsDiv, canvas);


// flutter로부터 메세지 받기
function saveCanvas() {
    console.log('Save canvas triggered by Flutter');
    // 캔버스 데이터를 저장하거나 다른 작업을 실행
    const canvas = document.getElementById('myCanvas');
    const dataURL = canvas.toDataURL('image/png');
    console.log('Canvas Data URL:', dataURL);

    // Flutter에 메시지 보내기
function sendMessageToFlutter(message) {
    if (window.FlutterChannel) {
      window.FlutterChannel.postMessage(message);
    } else {
      console.error('FlutterChannel is not available.');
    }
}

// 캔버스에서 작업 후 Flutter로 알림 보내기
document.getElementById('myCanvas').addEventListener('click', () => {
    sendMessageToFlutter('Canvas clicked!');
  }); }