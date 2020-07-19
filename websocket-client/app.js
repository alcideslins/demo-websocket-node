window.onload = function () {
    // Bind elements form html
    const form = document.getElementById("message-form");
    const messageField = document.getElementById("message");
    const messagesList = document.getElementById("messages");
    const socketStatus = document.getElementById("status");
    const closeBtn = document.getElementById("close");

    // Create a websocket server
    const websocketServer = "ws://localhost:3000/";
    const socket = new WebSocket(websocketServer);

    // ========== Websocket functions =================//
    // Handle errors on websocket
    socket.onerror = error => {
        console.log("WebSocket Error: ", error);
    };

    // Handle events during the connection between server and client
    socket.onopen = event => {
        socketStatus.innerHTML = "Connected to server: " + event.currentTarget.url;
        socketStatus.className = "open";
    };

    // Handle messages sent by server
    socket.onmessage = event => {
        let message = event.data;
        messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + "</li>";
    };

    // Handle events during server disconnection with the client
    socket.onclose = () => {
        socketStatus.innerHTML = "Websocket disconnected.";
        socketStatus.className = "closed";
    };


    //============== Form functions ====================================//

    // Function to send messages to server using websocket connection
    form.onsubmit = e => {
        e.preventDefault();

        let message = messageField.value;
        socket.send(message);

        messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + "</li>";
        messageField.value = "";
        return false;
    };

    // Function to close websocket connection
    closeBtn.onclick = e => {
        e.preventDefault();
        socket.close();
        return false;
    };
};
