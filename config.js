require("dotenv").config();

const config = {
  app_name: process.env.APP_NAME,
  port: process.env.PORT || 8000,
  db_uri: process.env.DB_URI,
  db_test: process.env.DB_MONGOCLOUDTEST,
  db_options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

module.exports = config;
