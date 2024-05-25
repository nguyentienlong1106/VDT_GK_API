const app = require("./app");
const config = require("../config");

app.listen(8000, () => {
  console.log(config.app_name + " Started on Port 8000");
});
