const mongoose = require("mongoose");
const initData = require ("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
   .then(() => {
    console.log("connected to DB");
   })
   .catch((err) => {
    console.log(err);
   })

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner: "668bc2f158dab414d48726a2"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}

initDB();

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// async function main() {
//     try {
//         await mongoose.connect(MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to DB");
//     } catch (err) {
//         console.error("Error connecting to the database", err);
//         process.exit(1); // Exit the process with a failure code
//     }
// }

// const initDB = async () => {
//     try {
//         await Listing.deleteMany({});
//         initData.data = initData.data.map((obj) => ({
//             ...obj,
//             owner: "668bc2f158dab414d48726a2",
//         }));
//         await Listing.insertMany(initData.data);
//         console.log("Data was initialized");
//     } catch (err) {
//         console.error("Error initializing the database", err);
//     }
// }

// main().then(initDB);
