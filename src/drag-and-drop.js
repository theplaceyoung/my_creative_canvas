// 툴 박스 드래그
const toolsContainer = document.getElementById('toolbox');  // 기존의 'tools' 대신 'toolbox'로 적용
const toolsContainerParent = toolsContainer.parentElement; // 툴박스를 포함한 부모 컨테이너

let isDraggingTools = false;

// 마우스를 눌렀을 때 툴박스 드래그 시작
toolsContainer.addEventListener('mousedown', (e) => {
    isDraggingTools = true;
    e.preventDefault(); // 기본 드래그 방지
});

// 마우스를 이동할 때 툴박스 위치 변경
window.addEventListener('mousemove', (e) => {
    if (isDraggingTools) {
        const rect = toolsContainerParent.getBoundingClientRect();
        const x = e.pageX - rect.left - toolsContainer.offsetWidth / 2;
        const y = e.pageY - rect.top - toolsContainer.offsetHeight / 2;

        // 툴박스가 부모 영역 밖으로 나가지 않도록 제한
        const maxX = rect.width - toolsContainer.offsetWidth;
        const maxY = rect.height - toolsContainer.offsetHeight;

        toolsContainer.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        toolsContainer.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    }
});

// 마우스를 떼면 드래그 종료 후 툴박스 위치 조정
window.addEventListener('mouseup', () => {
    isDraggingTools = false;

    // 툴박스를 동서남북 끝으로 위치 조정
    const rect = toolsContainerParent.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const left = Math.max(0, Math.min(toolsContainer.offsetLeft, windowWidth - toolsContainer.offsetWidth));
    const top = Math.max(0, Math.min(toolsContainer.offsetTop, windowHeight - toolsContainer.offsetHeight));

    toolsContainer.style.left = `${left}px`;
    toolsContainer.style.top = `${top}px`;
});
