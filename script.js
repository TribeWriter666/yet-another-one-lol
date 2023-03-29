const input = document.querySelector("#emoji-input");
const animateButton = document.querySelector("#animate-button");
const addButton = document.querySelector("#add-button");
const screenshotButton = document.querySelector("#screenshot-button");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const slowDownButton = document.querySelector("#slow-down-button");
const speedUpButton = document.querySelector("#speed-up-button");
const backgroundColorSelect = document.querySelector("#background-color");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

let speed = 2;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;
let emojiArray = [];

const setBackgroundColor = () => {
  canvas.style.backgroundColor = backgroundColorSelect.value;
};

const slowDown = () => {
  speed /= 2;
  for (let i = 0; i < emojiArray.length; i++) {
    emojiArray[i].dx /= 2;
    emojiArray[i].dy /= 2;
  }
};

const speedUp = () => {
  speed *= 2;
  for (let i = 0; i < emojiArray.length; i++) {
    emojiArray[i].dx *= 2;
    emojiArray[i].dy *= 2;
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < emojiArray.length; i++) {
    const emoji = emojiArray[i];
    ctx.font = "64px Arial";
    ctx.fillText(emoji.value, emoji.x, emoji.y);

    if (emoji.x + emoji.dx > canvas.width || emoji.x + emoji.dx < 0) {
      emoji.dx = -emoji.dx;
    }

    if (emoji.y + emoji.dy > canvas.height || emoji.y + emoji.dy < 0) {
      emoji.dy = -emoji.dy;
    }

    emoji.x += emoji.dx;
    emoji.y += emoji.dy;
  }
  requestAnimationFrame(animate);
};

const addEmoji = () => {
  emojiArray.push({
    value: input.value,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: 2,
    dy: 2
  });
};

backgroundColorSelect.addEventListener("change", setBackgroundColor);
animateButton.addEventListener("click", animate);
addButton.addEventListener("click", addEmoji);
slowDownButton.addEventListener("click", slowDown);
speedUpButton.addEventListener("click", speedUp);

screenshotButton.addEventListener("click", () => {
  const screenshotCanvas = document.createElement("canvas");
  screenshotCanvas.width = canvas.width;
  screenshotCanvas.height = canvas.height;

  const screenshotCtx = screenshotCanvas.getContext("2d");
  screenshotCtx.fillStyle = backgroundColorSelect.value;
  screenshotCtx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < emojiArray.length; i++) {
    const emoji = emojiArray[i];
    screenshotCtx.font = "64px Arial";
    screenshotCtx.fillText(emoji.value, emoji.x, emoji.y);
  }

  const screenshot = screenshotCanvas.toDataURL();
  const link = document.createElement("a");
  link.href = screenshot;
  link.download = "screenshot.png";
  link.click();
});

darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }
});

window.addEventListener("load", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.9;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.9;
});
