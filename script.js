const btn = document.querySelector(".movingBtn");
const btnContainer = document.querySelector(".btn-container");
const ninja = document.querySelector(".movingBtn>img");
let isTransitioning = false;
let count = 0;
let timer;

// event listeners
btnContainer.onmousemove = (e) => {
  if (!validateForm()) moveButton(e.clientX, e.clientY);
};

// function to generate random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// function to check if mouse is near the button
function checkNear(mousex, mousey) {
  const btnRect = btn.getBoundingClientRect();
  const left = btnRect.x;
  const right = btnRect.x + btnRect.width;
  const bottom = btnRect.y;
  const top = btnRect.y + btnRect.height;
  if (
    mousex < right + 10 &&
    mousex > left - 10 &&
    mousey < top + 10 &&
    mousey > bottom - 10
  ) {
    return true;
  }
  return false;
}

// function to move the button
function moveButton(mousex, mousey) {
  if (isTransitioning) return;

  const containerMid =
    btnContainer.getBoundingClientRect().x +
    btnContainer.getBoundingClientRect().width / 2;
  const contianerWidth = btnContainer.getBoundingClientRect().width;
  const btnWidth = btn.getBoundingClientRect().width;
  const padding = randomNumber(0, btnWidth / 2);
  const left = contianerWidth - 20 - btnWidth - padding - padding;
  const right = 0 - padding;

  if (mousex < containerMid && checkNear(mousex, mousey)) {
    showRunning(true);
    btn.style.transform = `translateX(${right}px)`;
  } else if (mousex > containerMid && checkNear(mousex, mousey)) {
    showRunning(false);
    btn.style.transform = `translateX(${-left}px)`;
  }
}

// function to enable running animation
function showRunning(btnLeft) {
  isTransitioning = true;
  if (!btnLeft) {
    ninja.style.transform = `scaleX(-1)`;
  } else {
    ninja.style.transform = `scaleX(1)`;
  }

  ninja.setAttribute("src", "assets/running.gif");
  return setTimeout(() => {
    counter();
    isTransitioning = false;
    ninja.setAttribute("src", "assets/idle.gif");
  }, 500);
}

// function to validate the form
function validateForm() {
  const btn = document.querySelector(".pure-button");
  const inputName = document.querySelector("#aligned-name").value;
  const inputEmail = document.querySelector("#aligned-email").value;
  const emailValid = document.querySelector("#aligned-email").validity.valid;
  const inputPassword = document.querySelector("#aligned-password").value;
  const checkBox = document.querySelector("#aligned-cb").checked;

  if (inputName && inputEmail && inputPassword && checkBox && emailValid) {
    btn.removeAttribute("disabled");
    btn.classList.remove("disabled");
    ninja.style.opacity = 0;
    return true;
  } else {
    btn.setAttribute("disabled", true);
    btn.classList.add("disabled");
    ninja.style.opacity = 1;
    return false;
  }
}

// function to count the number of times the mouse is near the button
function counter() {
  if (count == 0) {
    timer = setTimeout(() => {
      count = 0;
    }, 5000);
  }
  count += 1;
  // console.log(count);
  if (count > 8) {
    // console.log("You are a bot", count);
    showToast();
    count = 0;
    clearTimeout(timer);
  }
}

// function to show toast message
function showToast() {
  Toastify({
    text: "You are a bot",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    style: {
      background: "brown",
      color: "white",
      userSelect: "none",
    },
    // onClick: function () {}, // Callback after click
  }).showToast();
}
