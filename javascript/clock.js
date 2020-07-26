const clockText = document.querySelector(".js-clock");

function updateTime(){
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    clockText.innerText = `${
        hour < 10 ? `0${hour}` : hour
    } : ${
        minute < 10 ? `0${minute}` : minute
    } : ${
        second < 10 ? `0${second}` : second
    }`;
}

function init(){
    updateTime();
    setInterval(updateTime, 500);
}

init();