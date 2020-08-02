const LOCAL_POSITION_KEY = "local";
const API_KEY = "d3266cfba0c5344764223d0179b3c0f5";

const placeSpan = document.querySelector(".js-place");
const weatherIcon = document.querySelector(".js-weather-icon");
const weatherText = document.querySelector(".js-weather-text");
const weatherTemp = document.querySelector(".js-temp");

const setWeather = (weather, icon, temp, place) => {
    placeSpan.innerText = place;
    weatherText.innerText = weather;
    weatherTemp.innerText = `${temp} ℃`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.style.display = "block";
};

const getWeather = (lat, long) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    )
        .then((request) => {
            return request.json();
        })
        .then((json) => {
            const {
                main: { temp: temp },
                name: place,
                weather: weatherArray,
            } = json;
            const { main: weather, icon } = weatherArray.pop();
            setWeather(weather, icon, temp, place);
        });
};

const printWeather = (position) => {
    const pos = JSON.parse(position);
    console.log(pos);
    getWeather(pos.lat, pos.long);
};

const savePostionLocalStorage = (lat, long) => {
    localStorage.setItem(LOCAL_POSITION_KEY, JSON.stringify({ lat, long }));
};

const handleLocation = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat, long);
    savePostionLocalStorage(lat, long);
    loadCoords();
};

const getCurrentPostion = () => {
    navigator.geolocation.getCurrentPosition(handleLocation);
};

const loadCoords = () => {
    const savePosition = localStorage.getItem(LOCAL_POSITION_KEY);
    if (savePosition) {
        printWeather(savePosition);
    } else {
        getCurrentPostion();
    }
};

function init() {
    loadCoords();
}

init();
