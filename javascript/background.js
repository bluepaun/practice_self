const image = document.querySelector(".bgImage");
const cover = document.querySelector(".bgImage--cover");

const IMG_NUMBER = 3;
const BG_OFF = "1";
const BG_ON = "0.2";
const WEATHER_LIST = [
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
];

const reloadBackground = () => {
    cover.style.opacity = BG_OFF;
};

const setImage = () => {
    const randomNum = Math.floor(Math.random() * IMG_NUMBER);
    if (WEATHER_LIST.includes(weatherText)) {
        image.src = `resource/${weatherText}/${randomNum}.jpg`;
    } else {
        image.src = `resource/default/${randomNum}.jpg`;
    }
};

function init() {
    setImage();
    cover.style.opacity = BG_ON;
    cover.addEventListener("transitionend", (event) => {
        if (event.target.style.opacity === BG_OFF) {
            setImage();
            cover.style.opacity = BG_ON;
        }
    });
    setInterval(reloadBackground, 10000);
}

init();
