const links = [
    "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg", // monkey
]

function randInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const reload = () => {
    let images = document.getElementsByTagName("img");

    for (let image of images) {
        if (image.getAttribute("src") in links) {
            continue;
        }

        if (Math.random() < 0.001) {
            image.setAttribute("src", links[randInt(0, links.length)]);
        }
    }
};

reload();
setInterval(reload, 100);