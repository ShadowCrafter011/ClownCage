import { Plugin } from "./plugin";

export class RandomizeKeypressPlugin extends Plugin {
    constructor() {
        super(3);
    }

    register(data: any): boolean {
        var self = this;
        const f = function(e: Event) { self.randomize_keypress(e, data.probability, data.keydata) }
        this.registered_listeners.push({on: "keydown", function: f});
        document.addEventListener("keydown", f);
        return true
    }

    randomize_keypress(e: any, probability: number, keydata: {[key: string]: string}) {
        let element = e.target;
        for (let keydatum of Object.entries(keydata)) {
            if (keydatum[0].split("").includes(e.key) && Math.random() < probability) {
                let replacements = keydatum[1].split("");
                let new_key = replacements[this.random_index(replacements.length)];
                
                e.preventDefault();

                let value_array = element.value.split("");
                let new_start = element.selectionStart + 1;
                
                element.value = [
                    ...value_array.slice(0, element.selectionStart),
                    new_key,
                    ...value_array.slice(element.selectionEnd)
                ].join("")
                element.selectionStart = new_start;
                element.selectionEnd = new_start;
            }
        }
    }
}