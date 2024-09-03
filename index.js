const container = document.getElementById('randomIconsContainer');
const iconSrc = './svg/brg.png'; 
const iconWidth = 70; // Chiều rộng của icon
const iconHeight = 70; // Chiều cao của icon
const numIcons = 1000; // Số lượng icon muốn tạo
let positions = [];

function isOverlapping(x, y, positions) {
    for (let pos of positions) {
        if (x < pos.x + iconWidth + 5 && x + iconWidth + 5 > pos.x &&
            y < pos.y + iconHeight + 5 && y + iconHeight + 5 > pos.y) {
            return true;
        }
    }
    return false;
}
for (let i = 0; i < numIcons; i++) {
    let x, y;
    let attempts = 0;

    do {
        x = Math.random() * (container.offsetWidth - iconWidth);
        y = Math.random() * (container.offsetHeight - iconHeight);
        attempts++;
    } while (isOverlapping(x, y, positions) && attempts < 1000); // Giới hạn số lần thử

    // Nếu tìm thấy vị trí hợp lệ
    if (attempts < 100) {
        positions.push({ x: x, y: y });

        const icon = document.createElement('img');
        icon.src = iconSrc;
        icon.style.width = `${iconWidth}px`;
        icon.style.height = `${iconHeight}px`;
        icon.style.position = 'absolute';
        icon.style.left = `${x}px`;
        icon.style.zIndex= "-1";
        icon.style.top = `${y}px`;
        const randomRotation = Math.random() * 360; // Xoay ngẫu nhiên từ 0 đến 360 độ
        icon.style.transform = `rotate(${randomRotation}deg)`;

        container.appendChild(icon);
    }
}