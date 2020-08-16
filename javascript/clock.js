const containerDate = document.querySelector(".container-date");
const spanDateList = containerDate.querySelectorAll("span");
const yearSpan = spanDateList[0];
const monthSpan = spanDateList[1];
const daySpan = spanDateList[2];

const containerClock = document.querySelector(".container-clock");
const spanClockList = containerClock.querySelectorAll("span");
const hourSpan = spanClockList[0];
const minuteSpan = spanClockList[1];
const secondSpan = spanClockList[2];

const updateTime = () => {
    const date = new Date();
    yearSpan.innerText = date.getFullYear();
    monthSpan.innerText = date.getMonth() + 1;
    daySpan.innerText = date.getDate();
    hourSpan.innerText = date.getHours();
    minuteSpan.innerText = date.getMinutes();
    secondSpan.innerText = date.getSeconds();
};

function init() {
    updateTime();
    setInterval(updateTime, 500);
}

init();
