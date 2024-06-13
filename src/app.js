const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("../config.js");
const Student = require("./models/Student.js");
const route = require("./routes");
const rateLimit = require("express-rate-limit");

const connectToDB = async () => {
    try {
        await mongoose.connect(config.db_uri, {});
    } catch (e) {
        console.log(e);
        // process.exit(1);
    }
};

const app = express();
app.use(cors());

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const seedDatabase = async () => {
    const filePath = path.join(__dirname, "./api/src/data.json");
    let data;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } else {
        // If the file doesn't exist, create mock data
        data = [
            // Insert your mock data here
            {
                name: "Lê Minh Việt Anh",
                email: "anh.lmv.bkhn@gmail.com",
                phone: "0394305264",
                sex: "Nam",
                university: "Đại học Bách Khoa Hà Nội",
                country: "Việt Nam",
            },
            {
                name: "Phạm Quang Bách",
                email: "blu11235@gmail.com",
                phone: "0866859929",
                sex: "Nam",
                university: "VinUniversity",
                country: "Việt Nam",
            },
            {
                name: "Hoàng Bá Bảo",
                year: 2004,
                email: "bachdtm169@gmail.com",
                phone: "0983155487",
                sex: "Nam",
                university: "Đại học Bách Khoa Hà Nội",
                country: "Việt Nam",
            },
            {
                name: "Phạm Minh Cường",
                email: "20020098@vnu.edu.vn",
                phone: "0967809494",
                sex: "Nam",
                university: "Đại học Công nghệ - Đại học country Hà Nội",
                country: "Việt Nam",
            },
            {
                name: "Trương Văn Độ",
                year: 2002,
                email: "truongvando1910@gmail.com",
                phone: "0963047046",
                sex: "Nam",
                university: "Đại học Công nghệ - Đại học country Hà Nội",
                country: "Việt Nam",
            },
        ];
    }

    // Save data to MongoDB
    await Student.insertMany(data);
    console.log("Database seeded with initial data");
};
//ratelimit
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});
// Apply the rate limiting middleware to all requests.
app.use(limiter);

route(app);

connectToDB().then(() => seedDatabase());

module.exports = app;
