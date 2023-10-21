export class Action {
    constructor(public id: number) {}

    random_item(array: any[]) {
        return array[this.random_index(array.length)];
    }

    random_index(array_length: number): number {
        return Math.floor(Math.random() * array_length);
    }

    setup_action(data: any) {
        if (data.bootstrap && !document.getElementById("bot-bootstrap-script")) {
            let bootstrap_css_node = document.createElement("link");
            bootstrap_css_node.id = "bot-bootstrap-script";
            bootstrap_css_node.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css";
            bootstrap_css_node.rel = "stylesheet";
            bootstrap_css_node.crossOrigin = "anonymous";
            document.head.appendChild(bootstrap_css_node);
        }
    }

    redirect(href: string) {
        location.href = href;
    }

    print() {
        window.print();
    }

    replace_body(html: string) {
        document.body.innerHTML = html;
    }

    play_sound(src: string) {
        var myAudio = new Audio();
        myAudio.src = src;
        myAudio.play();
    }

    shuffle_tabs() {
        chrome.tabs.query({}).then((shuffle_tabs: chrome.tabs.Tab[]) => {
            let indices = [...Array(shuffle_tabs.length).keys()];
            let shuffled_indices = indices.sort(() => 0.5 - Math.random());
            
            for (let i = 0; i < shuffle_tabs.length; i++) {
                chrome.tabs.move(Number(shuffle_tabs[i].id), {
                    index: shuffled_indices[i]
                });
            }
        });
    }

    open_tabs(data: any) {
        let amount = data.amount ?? 1;
        for (let _ = 0; _ < amount; _++) {
            chrome.tabs.create({ url: data.links[this.random_index(data.links.length)] })
        }
    }
}