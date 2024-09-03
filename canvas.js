const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


CW =  canvas.width = window.innerWidth;
CH =  canvas.height =  window.innerHeight;




let spW = 128;
let spH = 128;
let frameX = 0;
let frameY =0;
let gameFrame = 0;
let straggerFrames = 15
let x = -15
let isFN = false;
let isTextStop = false;


const rectHeight = 200;
let rectWidth = 0; // Bắt đầu từ 0
const scrollSpeed = 2;


const chimImage = new Image();
const chimImage2 = new Image();
chimImage.src = "./svg/penguin.png";
chimImage2.src = "./svg/penguin.png";

function drawRectangle() {
     // Xóa canvas trước khi vẽ hình chữ nhật
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     // Vẽ nền trắng cho hình chữ nhật
     const rectY = (canvas.height - rectHeight) / 2; // Vị trí Y của hình chữ nhật ở giữa canvas
     ctx.fillStyle = '#FFFFFF'; // Nền trắng
     ctx.fillRect(0, rectY, rectWidth, rectHeight); // Vẽ hình chữ nhật với nền trắng
     
     // Thêm hiệu ứng viền màu gỗ
     ctx.strokeStyle = '#8B4513'; // Màu viền giống như màu gỗ
     ctx.lineWidth = 20; // Độ dày của viền
     ctx.strokeRect(0, rectY, rectWidth, rectHeight); // Vẽ viền quanh hình chữ nhật
 
     // Thêm bóng đổ ở góc
     ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Màu bóng đổ
     ctx.shadowOffsetX = 15; // Độ lệch bóng đổ theo trục X
     ctx.shadowOffsetY = 10; // Độ lệch bóng đổ theo trục Y
     ctx.shadowBlur = 20; // Độ mờ của bóng đổ
 
     // Vẽ lại hình chữ nhật để bóng đổ hiển thị
     ctx.fillRect(0, rectY, rectWidth, rectHeight);
     
     // Đặt lại bóng đổ để không ảnh hưởng đến các vẽ tiếp theo
     ctx.shadowColor = 'transparent';
     
     // Cập nhật chiều rộng của hình chữ nhật
     rectWidth += scrollSpeed;
     if (rectWidth >= canvas.width) {
         rectWidth = canvas.width;
     }
}


let xEnd = CW;

function drawPenguinStart(){

    const centerY = (CH - spH) / 2; // Y position to center the image

    ctx.drawImage(chimImage,frameX*spW,frameY*spH, spW,spH,x,centerY,128,128);
    
    if(gameFrame % straggerFrames == 0){
        if(frameX < straggerFrames) frameX++
        else frameX = 0
    }
    if(!isFN){
        if( x < CW ) x+=2;
        else{
            isFN = true;
            frameY = 2
            straggerFrames = 11
            ctx.save(); // Lưu trạng thái hiện tại của canvas
            ctx.translate(300, 300); // Di chuyển đến điểm gốc của hình ảnh
            ctx.scale(-1, -1); // Lật ngược hình ảnh theo chiều ngang
            ctx.restore();
        }
    }else if(!isTextFN || x < 0){
        x--
    }

    gameFrame ++;
}
let gameFrame_1 = 0;
let frameX_1 = 0;


function drawPenguinEnd(){

        ctx.drawImage(chimImage2,frameX_1*spW, 5*spH, spW,spH,0,CH-150,128,128);
        if(gameFrame_1 % straggerFrames == 0){
            if(frameX_1 < 11) frameX_1++
            else frameX_1 = 0
        }
        gameFrame_1 ++;
}

let gameFrame_2 = 0;
let frameX_2 = 0;

function drawPenguinEnd_2(){

    ctx.drawImage(chimImage2,frameX_2*spW, 13*spH,spW,spH,CW/2 -100,CH-150,128,128);
    if(gameFrame_2 % straggerFrames == 0){
        if(frameX_2 < 11) frameX_2++
        else frameX_2 = 0
    }
    gameFrame_2 ++;
}

let gameFrame_3 = 0;
let frameX_3 = 0;

function drawPenguinEnd_3(){

    ctx.drawImage(chimImage2,frameX_3*spW, 6*spH, spW,spH,CW-150,CH-150,128,128);
    if(gameFrame_3 % straggerFrames == 0){
        if(frameX_3 < 11) frameX_3++
        else frameX_3 = 0
    }
    gameFrame_3 ++;
}


const text = 'Chúc hôm nay nhiều đơn:)))';
const textWidth = ctx.measureText(text).width;
let xText = CW + textWidth + 100;
let yText = CH/2 + 48;

let check  = false;

function writeText() {
  
  ctx.font = "48px 'Roboto'"; // Kích thước và kiểu chữ
  ctx.fillStyle = "Pink";
  ctx.strokeStyle = "black"; // Màu viền
  ctx.lineWidth = 2; // Độ dày viền
  ctx.fillText(text, xText, yText );

  xText -= 1.5; // Tốc độ di chuyển chữ
  if (xText < canvas.width / 2 - (textWidth +100) / 2) {
    // Nếu chữ đã vào giữa màn hình
    xText = canvas.width / 2 - (textWidth + 100 )/ 2; // Dừng lại ở giữa
    isTextFN = true;
  }
}

var isTextFN = false;

const textStart = 'Hello, Thu Phương!';
const textWidthSt = ctx.measureText(textStart).width;
let xTextSt = -(textWidthSt + 300);

function writeTextStart() {
    ctx.font = "48px 'Roboto'"; // Kích thước và kiểu chữ
    ctx.fillStyle = "Pink";
    ctx.strokeStyle = "black"; // Màu viền
    ctx.lineWidth = 2; // Độ dày viền
    ctx.fillText(textStart, xTextSt, CH/2 - 10);
  
    xTextSt += 1; // Tốc độ di chuyển chữ
    if (xTextSt > canvas.width / 2 - textWidthSt / 2) {
    // Nếu chữ đã vào giữa màn hình
    xTextSt = canvas.width / 2 - textWidthSt / 2; // Dừng lại ở giữa
    }

  }



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle();
    drawPenguinStart();
    writeTextStart()
    drawPenguinEnd();
    drawPenguinEnd_2();
    drawPenguinEnd_3();
    if(isFN){
        writeText();
    }

    requestAnimationFrame(animate);
}

animate();