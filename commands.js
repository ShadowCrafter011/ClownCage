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
            break;
        
        case "Print":
            window.print();    
            break;

        default:
            break;
    }
}