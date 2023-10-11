class Command extends Action {
    constructor() {
        super();
    }

    setup(data) {
        if (data.visible && document.hidden) return false;
        if (data.focused && !document.hasFocus()) return false;
    
        if (data.bootstrap && !document.getElementById("bot-bootstrap-script")) {
            let bootstrap_css_node = document.createElement("link");
            bootstrap_css_node.id = "bot-bootstrap-script";
            bootstrap_css_node.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css";
            bootstrap_css_node.rel = "stylesheet";
            bootstrap_css_node.crossorigin = "anonymous";
            document.head.appendChild(bootstrap_css_node);
        }

        return true;
    }
}