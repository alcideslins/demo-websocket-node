const calc = require('./internal-module/calc');
const express = require('express');
const port = 3000;
const app = express();

let static_middleware = express.static("websocket-client");

app.use(static_middleware);
app.listen(port, () => console.log(`Running at http://localhost:${port}`));
