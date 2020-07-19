const calc = require('./internal-module/calc');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');

const app = express();
const port = 3000;

const invalidMessage = "Invalid pattern for message, the message should be like 5 * 9";

//Starts a HTTP server , managed by expressjs
const server = http.createServer(app);

//Starts a websocket from http
const wss = new WebSocket.Server({server})
wss.on("connection", (ws) => {

    ws.on("message", (message) => {
        console.log("Received: ", message);
        let result = calculate(message);
        ws.send(result);
    });

});

//Configure the websocket client
let static_middleware = express.static("websocket-client");
app.use(static_middleware);

server.listen(port, () => console.log(`Running at http://localhost:${port}`));


function calculate(message) {
    try {
        let split = message.trim().split(" ");

        if (split.length !== 3) {
            return invalidMessage;
        }

        switch (split[1]) {
            case "+":
                return calc.addition(split[0], split[2]);
            case "-":
                return calc.subtraction(split[0], split[2]);
            case "/":
                return calc.division(split[0], split[2]);
            case "*":
                return calc.multiplication(split[0], split[2]);
            default:
                return invalidMessage;
        }
    } catch (e) {
        return e.toString();
    }
}
