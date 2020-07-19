window.onload = function () {
    // Busca a referencia elementos da página
    const form = document.getElementById("message-form");
    const messageField = document.getElementById("message");
    const messagesList = document.getElementById("messages");
    const socketStatus = document.getElementById("status");
    const closeBtn = document.getElementById("close");

    // Cria um novo socket.
    const socket = new WebSocket("ws://echo.websocket.org/");

    // Função para tratar os erros que podem ocorrer
    socket.onerror = error => {
        console.log("WebSocket Error: ", error);
    };

    // Função chamada no momento da conexão do cliente com o servidor
    socket.onopen = event => {
        socketStatus.innerHTML = "Conectado ao servidor: " + event.currentTarget.url;
        socketStatus.className = "open";
    };

    // Função para tratar mensagens enviadas pelo servidor.
    socket.onmessage = event => {
        let message = event.data;
        messagesList.innerHTML += '<li class="received"><span>Recebido:</span>' + message + "</li>";
    };

    // Função chamada no momento da desconexão do servidor com o cliente
    socket.onclose = () => {
        socketStatus.innerHTML = "Websocket desconectado.";
        socketStatus.className = "closed";
    };

    // Função que envia mensagens para o servidor através da conexão websocket
    form.onsubmit = e => {
        e.preventDefault();

        // Pega a mensagem digitada no campo de mensagem do formulário
        let message = messageField.value;

        // Envia a mensagem através do websocket
        socket.send(message);

        // Adiciona a mensagem enviada na tela
        messagesList.innerHTML += '<li class="sent"><span>Enviado:</span>' + message + "</li>";

        // Limpa o campo de mensagem
        messageField.value = "";

        return false;
    };

    // Função que fecha a conexão websocket
    closeBtn.onclick = e => {
        e.preventDefault();
        socket.close();
        return false;
    };
};
