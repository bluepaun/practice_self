const weather = document.querySelector(".weather");

const COORD_KEY = "coords";
const API_KEY = "d3266cfba0c5344764223d0179b3c0f5";

let weatherText = "default";

const getWeather = (lat, lon) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then((json) => {
            const temperature = json.main.temp;
            const place = json.name;
            const span = document.createElement("span");
            weatherText = json.weather[0].main;
            span.innerText = `${Math.round(temperature)}℃ at ${place}`;
            weather.appendChild(span);
        });
};

function saveLocation(coordsData) {
    localStorage.setItem(COORD_KEY, JSON.stringify(coordsData));
}

const handleSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsData = {
        latitude,
        longitude,
    };
    saveLocation(coordsData);
    getWeather(latitude, longitude);
};

function loadCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess);
}

const loadLocation = () => {
    const loadedCoords = localStorage.getItem(COORD_KEY);
    if (loadedCoords === null) {
        loadCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
};

function init() {
    loadLocation();
}

init();
