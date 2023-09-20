const plugin_action = {
    "Redirect": redirect,
    "Cancel events": register_cancel_events,
    "Randomize keypress": register_randomize_keypress
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
        if (isArray(registered_listeners[name])){
            for (let event of registered_listeners[name]) {
                document.removeEventListener(event.on, event.function)
            }
            delete registered_listeners[name]
        }
        if (isArray(registered_intervals[name])) {
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