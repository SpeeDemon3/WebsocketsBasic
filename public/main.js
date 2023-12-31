import { connect } from "socket.io-client";

const socket = connect("http://localhost:8080", { forceNew: true });

socket.on("messages", function(data) {
    console.log(data);
    render(data);
});

function render(data) {
    
    const html = data.map(function (elem, index) {

        return `<div>
                    <strong>${elem.author}</strong> :
                    <em>${elem.text}</em>
                </div>`;

    }).join(" ");

    document.getElementById("messages").innerHTML = html;

}

function addMessage(e) {
    
    const message = {
        author : document.getElementById("username").value,
        text : document.getElementById("text").value
    };

    socket.emit("new-message", message);

    return false;

}