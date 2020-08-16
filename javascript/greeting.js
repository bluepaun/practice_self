const greetingForm = document.querySelector(".greeting__input-name");
const greetingText = document.querySelector(".greeting__text");
const greetingHello = document.querySelector(".greeting__hello");
const greetingName = document.querySelector(".greeting__name");

const NAME = "name";
const HELLO_LIST = [
    "Have a nice day!",
    "What a wonderful day!",
    "How are you today?",
    "Don't worry Be happy",
    "What's up",
    "How's it going?",
    "Good to see you again!",
];
let rand = 0;
const setHelloRandom = () => {
    rand = Math.floor(Math.random() * HELLO_LIST.length);
    greetingHello.style.opacity = "0";
    greetingHello.style.width = `${getWidthPixel(HELLO_LIST[rand])}px`;
};

const getWidthPixel = (text) => {
    const newElement = document.createElement("span");
    newElement.innerText = text;
    newElement.style.opacity = 0;
    greetingText.appendChild(newElement);
    const width = newElement.clientWidth + 20;
    greetingText.removeChild(newElement);
    return width;
};

function init() {
    const loadedName = localStorage.getItem(NAME);
    greetingHello.addEventListener("transitionend", (event) => {
        if (event.propertyName === "width") {
            greetingHello.innerHTML = HELLO_LIST[rand];
            greetingHello.style.opacity = "1";
        }
    });
    if (loadedName && loadedName != "") {
        greetingName.innerText = loadedName;
        greetingText.classList.add("show-view-flex");
        greetingText.classList.remove("hide-view");
        greetingHello.style.width = `0px`;
        greetingHello.innerHTML = "";
        setInterval(setHelloRandom, 5000);
    } else {
        greetingForm.classList.remove("hide-view");
        greetingForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const target = event.target;
            const inputElement = target.querySelector("[name = greeting-name]");
            inputElement.classList.add("visiable-hide-view");
            const name = inputElement.value;
            localStorage.setItem(NAME, name);
            inputElement.addEventListener("transitionend", () => {
                greetingForm.classList.add("hide-view");
                greetingName.innerText = name;
                greetingText.classList.add("show-view-flex");
                greetingText.classList.remove("hide-view");
                greetingHello.style.width = `0px`;
                greetingHello.innerHTML = "";
                setInterval(setHelloRandom, 5000);
            });
        });
    }
}

init();
