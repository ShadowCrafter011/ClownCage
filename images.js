const data = [
    "https://salbot.ch/images/1.jpeg",
    "https://salbot.ch/images/2.jpeg",
    "https://salbot.ch/images/3.jpeg",
    "https://salbot.ch/images/4.jpeg",
    "https://salbot.ch/images/5.jpeg",
    "https://salbot.ch/images/6.jpeg"
]

function randInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const reload = () => {
    let images = document.getElementsByTagName("img");

    for (let image of images) {
        if (image.getAttribute("src") in data) {
            continue;
        }

        if (Math.random() < 0.0001) {
            image.setAttribute("src", data[randInt(0, data.length - 1)]);
        }
    }
};

reload();
setInterval(reload, 60 * 1000);