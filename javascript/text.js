const text = document.querySelector(".input-text");
const p = document.querySelector("p");
const texts = ["t", "test", "aaaaaaaaaa", "bb", "aaaaaaaaaaaaaaaaaa"];
const body = document.querySelector("body");

let cnt = 0;
function change() {
    cnt++;
    if (cnt >= texts.length) {
        cnt = 0;
    }
    text.style.width = `${6 * texts[cnt].length}px`;
    text.innerText = texts[cnt];
}

const toDoList = document.querySelector(".js-toDoList");
const finishedList = document.querySelector(".js-finishedList");

const toDoDatas = ["aaaa", "bbbb", "cccc", "dddd", "eeee", "fffff"];
const finishedDatas = [];

function handleClick(event) {
    const element = event.target;
    element.style.height = "0px";
    element.style.opacity = "0";
    element.addEventListener("transitionend", (event) => {
        if (event.propertyName === "height") {
            const element = event.target;
            const ulList = element.parentNode;
            ulList.removeChild(element);
            finishedList.appendChild(element);
            element.style.height = "30px";
            element.style.opacity = "1";
        }
    });
}
function createToDoLi(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.classList.add("list-element");
    li.addEventListener("click", handleClick);
    return li;
}

function loadToDoList() {
    toDoDatas.forEach((element) => {
        const list = createToDoLi(element);
        toDoList.appendChild(list);
    });
}

function init() {
    change();
    setInterval(change, 4000);
    loadToDoList();
}

init();
