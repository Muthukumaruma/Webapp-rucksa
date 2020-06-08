const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 80;

app.prepare().then(() => {
  const server = express();
  server.set("trust proxy", true);
  server.set("x-powered-by", false);

  server.get("/", (req, res) => {
    return app.render(req, res, "/", {});
  });

  server.get("/admin", (req, res) => {
    return app.render(req, res, "/admin", {});
  });

  server.all("*", (req, res) => {
    console.log("Requesting.........");
    console.log(req.path);
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
