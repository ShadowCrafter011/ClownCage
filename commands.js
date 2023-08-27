function handle_command(message) {
    console.log(message);
    let data = message.data;

    if (data.visible && document.hidden) return;
    if (data.focused && !document.hasFocus()) return;

    switch (message.name) {
        case "Alert":
            if (data.force?.alert_type && data.force?.message) {
                switch (data.force.alert_type) {
                    case "alert":
                        alert(data.force.message);
                        break;
                    case "confirm":
                        confirm(data.force.message);
                        break;
                    case "prompt":
                        prompt(data.force.message);
                        break;
                    default:
                        break;
                }
            } else {
                switch (random_index(3)) {
                    case 0:
                        alert(data.alert[random_index(data.alert.length)]);
                        break;
                    case 1:
                        confirm(data.confirm[random_index(data.confirm.length)]);
                        break;
                    case 2:
                        prompt(data.prompt[random_index(data.prompt.length)]);
                        break;
                    default:
                        break;
                }
            }
            break;

        default:
            break;
    }
}

function random_index(array_length) {
    return Math.floor(Math.random() * array_length);
}