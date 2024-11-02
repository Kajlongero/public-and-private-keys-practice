const { createServer } = require("https");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const opts = {
  cert: fs.readFileSync(path.join(__dirname, "src", "cert", "cert.pem")),
  key: fs.readFileSync(path.join(__dirname, "src", "cert", "key.pem")),
};

const httpsServer = createServer(opts, app);

httpsServer.listen(3000);
