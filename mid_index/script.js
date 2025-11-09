// ============================================
// Canvas 海洋場景（首頁）
// ============================================

window.addEventListener('load', function() {
    const canvas = document.getElementById('oceanCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // 繪製天空（漸層）
    const skyGradient = ctx.createLinearGradient(0, 0, 0, 200);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#B0E0E6');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, 200);

    // 繪製太陽
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(650, 80, 40, 0, Math.PI * 2);
    ctx.fill();

    // 太陽光暈
    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(650, 80, 60, 0, Math.PI * 2);
    ctx.fill();

    // 繪製雲朵
    function drawCloud(x, y) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.arc(x + 25, y, 35, 0, Math.PI * 2);
        ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
        ctx.fill();
    }

    drawCloud(100, 60);
    drawCloud(400, 100);

    // 繪製海平面
    ctx.strokeStyle = '#1E90FF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(canvas.width, 200);
    ctx.stroke();

    // 繪製海洋（漸層）
    const oceanGradient = ctx.createLinearGradient(0, 200, 0, canvas.height);
    oceanGradient.addColorStop(0, '#1E90FF');
    oceanGradient.addColorStop(0.5, '#1873CC');
    oceanGradient.addColorStop(1, '#104E8B');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 200, canvas.width, canvas.height - 200);

    // 繪製沙地
    ctx.fillStyle = '#C2B280';
    ctx.fillRect(0, 450, canvas.width, 50);

    // 繪製海草
    function drawSeaweed(x, baseY, height, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(x, baseY);
        
        for (let i = 0; i <= height; i += 15) {
            const offset = Math.sin(i * 0.15) * 12;
            ctx.lineTo(x + offset, baseY - i);
        }
        ctx.stroke();

        // 繪製海草葉子
        ctx.fillStyle = color;
        for (let i = 20; i < height; i += 35) {
            const offset = Math.sin(i * 0.15) * 12;
            ctx.beginPath();
            ctx.ellipse(x + offset, baseY - i, 10, 18, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 繪製多株海草
    drawSeaweed(120, 450, 140, '#2E8B57');
    drawSeaweed(180, 450, 110, '#3CB371');
    drawSeaweed(280, 450, 160, '#2E8B57');
    drawSeaweed(550, 450, 130, '#3CB371');
    drawSeaweed(620, 450, 150, '#2E8B57');
    drawSeaweed(700, 450, 120, '#3CB371');

    // 繪製氣泡
    function drawBubble(x, y, radius) {
        // 氣泡主體
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // 氣泡高光
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x - radius/3, y - radius/3, radius/3, 0, Math.PI * 2);
        ctx.fill();

        // 氣泡邊框
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    // 繪製多個氣泡
    drawBubble(150, 380, 8);
    drawBubble(160, 350, 6);
    drawBubble(145, 320, 7);
    
    drawBubble(250, 400, 9);
    drawBubble(265, 370, 5);
    drawBubble(255, 340, 7);
    drawBubble(245, 310, 6);

    drawBubble(350, 420, 7);
    drawBubble(360, 390, 8);
    drawBubble(355, 360, 6);

    drawBubble(580, 410, 8);
    drawBubble(590, 380, 6);
    drawBubble(585, 350, 7);
    drawBubble(575, 320, 5);

    drawBubble(650, 400, 9);
    drawBubble(665, 370, 7);
    drawBubble(655, 340, 6);

    drawBubble(450, 430, 7);
    drawBubble(460, 400, 5);
    drawBubble(455, 370, 6);
});

// ============================================
// Image Map 響應式處理（相簿頁面）
// ============================================

window.addEventListener('resize', updateImageMap);
window.addEventListener('load', updateImageMap);

function updateImageMap() {
    const img = document.getElementById('oceanMap');
    if (!img) return;
    
    const areas = document.querySelectorAll('map[name="oceanmap"] area');
    const originalWidth = 800; // 原始圖片寬度
    
    const scale = img.clientWidth / originalWidth;
    
    areas.forEach(area => {
        const originalCoords = area.dataset.originalCoords;
        if (!originalCoords) return;
        
        const coords = originalCoords.split(',').map(coord => 
            Math.round(parseFloat(coord) * scale)
        ).join(',');
        
        area.setAttribute('coords', coords);
    });
}

// ============================================
// 表格樣式切換器（展示頁面）
// ============================================

// 儲存原始樣式
const originalTableStyle = {
    fontSize: '16px',
    borderWidth: '1px',
    borderCollapse: 'collapse',
    cellSpacing: '0',
    backgroundColor: 'white'
};

function changeFontSize(size) {
    const table = document.getElementById('oceanTable');
    if (table) {
        table.style.fontSize = size;
    }
}

function changeBorder(width) {
    const table = document.getElementById('oceanTable');
    if (table) {
        const cells = table.querySelectorAll('td');
        cells.forEach(cell => {
            cell.style.border = width + ' solid #ddd';
        });
    }
}

function changeSpacing(spacing) {
    const table = document.getElementById('oceanTable');
    if (table) {
        table.style.borderSpacing = spacing;
        table.style.borderCollapse = 'separate';
    }
}

function changeTableBg(color) {
    const table = document.getElementById('oceanTable');
    if (table) {
        table.style.backgroundColor = color;
    }
}

function resetTable() {
    const table = document.getElementById('oceanTable');
    if (table) {
        table.style.fontSize = originalTableStyle.fontSize;
        table.style.borderCollapse = originalTableStyle.borderCollapse;
        table.style.borderSpacing = originalTableStyle.cellSpacing;
        table.style.backgroundColor = originalTableStyle.backgroundColor;
        
        const cells = table.querySelectorAll('td');
        cells.forEach(cell => {
            cell.style.border = '1px solid #ddd';
        });
    }
}

// ============================================
// 拍立得圖片切換器（展示頁面）
// ============================================

const polaroidImages = [
    'https://img.freepik.com/free-photo/beautiful-photo-sea-waves_58702-10636.jpg?semt=ais_hybrid&w=740&q=80',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBH4lUd0Uagr4WRxsktzbS3q6v06GB_PL1WEDa4-yDAFh-TYcGnAxIgh_aB5q8BmhIv48&usqp=CAU',
    'https://bohemia.tw/wp-content/uploads/2023/11/%E7%9C%8B%E6%B5%B7%E8%AA%9E%E9%8C%84.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkKzKFDcbvFIF3rfEJItZj-o376j6ynJ10LG_rUnsqgBmft8YTmyp3JPXvSV6kPNClQc&usqp=CAU',
    'https://cdn.pixabay.com/photo/2019/02/03/19/33/sea-3973349_1280.jpg'
];

let currentImageIndex = 0;

function updatePolaroidImage() {
    const img = document.getElementById('polaroidImage');
    const counter = document.getElementById('imageCounter');
    
    if (img && counter) {
        img.src = polaroidImages[currentImageIndex];
        counter.textContent = `Image ${currentImageIndex + 1} of ${polaroidImages.length}`;
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % polaroidImages.length;
    updatePolaroidImage();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + polaroidImages.length) % polaroidImages.length;
    updatePolaroidImage();
}

// 初始化拍立得圖片
window.addEventListener('load', updatePolaroidImage);