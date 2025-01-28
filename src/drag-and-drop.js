// 툴 박스 드래그
const toolsContainer = document.getElementById('tools');
const toolsContainerParent = toolsContainer.parentElement; // 툴박스를 포함한 부모 컨테이너

let isDraggingTools = false;

toolsContainer.addEventListener('mousedown', (e) => {
    isDraggingTools = true;
    e.preventDefault(); // 기본 드래그 방지
});

window.addEventListener('mousemove', (e) => {
    if (isDraggingTools) {
        const rect = toolsContainerParent.getBoundingClientRect();
        const x = e.pageX - rect.left - toolsContainer.offsetWidth / 2;
        const y = e.pageY - rect.top - toolsContainer.offsetHeight / 2;

        // 컨테이너 밖으로 나가지 않도록 제한
        const maxX = rect.width - toolsContainer.offsetWidth;
        const maxY = rect.height - toolsContainer.offsetHeight;

        toolsContainer.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        toolsContainer.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    }
});

window.addEventListener('mouseup', () => {
    isDraggingTools = false;

    // 드래그한 후 툴 박스를 동서남북 끝으로 위치 조정
    const rect = toolsContainerParent.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const left = Math.max(0, Math.min(toolsContainer.offsetLeft, windowWidth - toolsContainer.offsetWidth));
    const top = Math.max(0, Math.min(toolsContainer.offsetTop, windowHeight - toolsContainer.offsetHeight));

    toolsContainer.style.left = `${left}px`;
    toolsContainer.style.top = `${top}px`;
});
