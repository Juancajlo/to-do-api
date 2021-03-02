const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

class Server {
  apiPaths = {
    auth: "/api/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.auth, require("./routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

module.exports = Server;
