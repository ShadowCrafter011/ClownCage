import { Plugin } from "./plugin";

export class ImageExchangePlugin extends Plugin {
    constructor() {
        super(1003);
    }

    register(data: {
        images: {key: string[]}
        interval: number
        probability: number
        amount: number
        allow_visible: boolean
    }): boolean {
        var exchange_data: {
            self: ImageExchangePlugin
            image_urls: any[]
            probability: number
            amount: number
            allow_visible: boolean
        } = {
            self: this,
            image_urls: [],
            probability: data.probability,
            amount: data.amount,
            allow_visible: data.allow_visible
        }

        exchange_data.image_urls = this.filter_object_by_href(data.images);

        var self = this;
        let interval_id = setInterval(function() { self.image_exchange(exchange_data) }, data.interval);
        this.registered_intervals.push(interval_id);
        return true
    }

    image_exchange(data: {
        self: ImageExchangePlugin
        image_urls: any[]
        probability: number
        amount: number
        allow_visible: boolean
    }) {
        const isInViewport = function(element: HTMLImageElement) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= -rect.height &&
                rect.left >= -rect.width &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width
            );
        }

        if (Math.random() > data.probability) return;

        let images = [];
        for (let image of document.getElementsByTagName("img")) {
            if ((!isInViewport(image) || data.allow_visible) && !data.image_urls.includes(image.getAttribute("src"))) {
                images.push(image);
            }
        }
        
        if (images.length == 0) return;

        images = images.sort((a, b) => Math.random());

        for (let i = 0; i < data.amount; i++) {
            let image_url = data.image_urls[data.self.random_index(data.image_urls.length)];

            if (images[i].dataset.image_exchanged) continue;

            // TODO: Handle srcset
            images[i].setAttribute("src", image_url);
            images[i].setAttribute("srcset", image_url);
        }
    }
}