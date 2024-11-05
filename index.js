const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.get("/route", (req, res) => {
  res.send("Should be working with https");
});

const opts = {
  cert: fs.readFileSync(path.join(__dirname, "cert", "selfsigned.crt")),
  key: fs.readFileSync(path.join(__dirname, "cert", "selfsigned.key")),
  rejectUnauthorized: false,
};

const httpsServer = https.createServer(opts, app);

httpsServer
  .listen(3000, () => {
    console.log("Servidor HTTPS corriendo en el puerto 3000");
  })
  .on("error", (err) => {
    console.error("Error al iniciar el servidor HTTPS:", err);
  });
