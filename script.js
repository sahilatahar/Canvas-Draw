const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll(".color");
const customColor = document.getElementById('custom-color');
const strokeWidth = document.getElementById('stroke-width');
const clear = document.getElementById('clear');
const reset = document.getElementById('reset');
const save = document.getElementById('save');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;
let strokeColor;


strokeWidth.addEventListener('change', () => {
    lineWidth = strokeWidth.value;
})

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}
canvas.addEventListener('mousemove', draw);


colors.forEach(color => {
    color.addEventListener('click', () => {
        let rs = getComputedStyle(color);
        strokeColor = rs.getPropertyValue('--color');
    });
});

customColor.addEventListener('change', () => {
    strokeColor = customColor.value;
});

clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

reset.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokeColor = "black";
    lineWidth = 5;
    strokeWidth.value = 5;
});

save.addEventListener('click', () => {
    let imageUrl = canvas.toDataURL("image/jpg");
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = "image.jpg";
    a.click();
});
