const init = () => {
    randomizeHeader();
}

const randomizeHeader = () => {
    const num = Math.floor(Math.random() * 8) + 1;
    document.querySelector("header").querySelector("div").style.backgroundImage = `url("static/media/img/header_0${num}.jpg")`;
}

window.addEventListener("load", init);