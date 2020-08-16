const TYPE_LIST = {
    todo: "todo",
    finished: "finished",
};

function DataList(ulList, DATA_TYPE) {
    const dataList = [];
    const loadedDataList = JSON.parse(localStorage.getItem(DATA_TYPE));
    const BUTTON_TYPE = {
        done: "done",
        reload: "reload",
        delete: "delete",
    };

    const createButton = (btnType) => {
        const icon = document.createElement("i");
        switch (btnType) {
            case BUTTON_TYPE.done:
                icon.classList.add("far");
                icon.classList.add("fa-calendar-check");
                break;
            case BUTTON_TYPE.reload:
                icon.classList.add("fas");
                icon.classList.add("fa-reply");
                break;
            case BUTTON_TYPE.delete:
                icon.classList.add("fas");
                icon.classList.add("fa-trash-alt");
                break;
        }
        return icon;
    };

    const createLi = (data) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = data.string;

        let btn1;
        if (DATA_TYPE === TYPE_LIST.todo) {
            btn1 = createButton(BUTTON_TYPE.done);
        } else if (DATA_TYPE === TYPE_LIST.finished) {
            btn1 = createButton(BUTTON_TYPE.reload);
        }
        btn1.addEventListener("click", handleBtn1Click);

        const btn2 = createButton(BUTTON_TYPE.delete);
        btn2.addEventListener("click", handleBtn2Click);

        li.appendChild(span);
        li.appendChild(btn1);
        li.appendChild(btn2);
        li.id = data.id;
        li.classList.add("list-element");
        return li;
    };

    const deleteData = () => {};

    const handleBtn1Click = (event) => {
        const element = event.target;
        const data = paintRemovedData(element);
        itemHandleClick(data);
        removeDataList(data);
    };

    const handleBtn2Click = (event) => {
        const element = event.target;
        const data = paintRemovedData(element);
        removeDataList(data);
    };

    const removeDataList = (data) => {
        const removeIndex = dataList.findIndex((d) => {
            return d.id === data.id;
        });
        if (removeIndex > -1) {
            dataList.splice(removeIndex, 1);
            localStorage.setItem(DATA_TYPE, JSON.stringify(dataList));
        }
    };
    const saveDataList = (data) => {
        dataList.push(data);
        localStorage.setItem(DATA_TYPE, JSON.stringify(dataList));
    };
    const paintAddedData = (data) => {
        const newLi = createLi(data);
        ulList.appendChild(newLi);
    };

    const paintRemovedData = (element) => {
        const li = element.parentNode;
        li.style.height = "0px";
        li.style.opacity = "0";
        const data = {
            id: parseInt(li.id, 10),
            string: li.querySelector("span").innerText,
        };
        li.addEventListener("transitionend", (event) => {
            if (event.propertyName === "height") {
                ulList.removeChild(li);
            }
        });
        return data;
    };

    let itemHandleClick = () => {};
    this.addData = (text) => {
        const data = createData(text);
        paintAddedData(data);
        saveDataList(data);
    };
    this.setItemHandleClick = (func) => {
        itemHandleClick = func;
    };
    const createData = (text) => {
        return {
            id: Date.now(),
            string: text,
        };
    };
    const _init = () => {
        if (loadedDataList != null) {
            loadedDataList.forEach((data) => {
                dataList.push(data);
            });
        }

        dataList.forEach((data) => {
            paintAddedData(data);
        });
    };
    _init();
}

const toDoUl = document.querySelector(".js-toDoList");
const finishedUl = document.querySelector(".js-finishedList");
const inputForm = document.querySelector(".js-toDoInput");
const toDoList = new DataList(toDoUl, TYPE_LIST.todo);
const finishedList = new DataList(finishedUl, TYPE_LIST.finished);

function init() {
    toDoList.setItemHandleClick((data) => {
        finishedList.addData(data.string);
    });
    finishedList.setItemHandleClick((data) => {
        toDoList.addData(data.string);
    });
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const target = event.target;
        const inputElement = target.querySelector("[name = toDoText]");
        if (inputElement.value != "") {
            toDoList.addData(inputElement.value);
        }
        inputElement.value = "";
    });
}

init();
