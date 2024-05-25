const studentsController = require("./students");

function route(app) {
  app.use("/students", studentsController);
}

module.exports = route;
