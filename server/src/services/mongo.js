const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://hamzakhandev1446:g3KmoKEuq7GgeUg5@nasacluster.t3e9ych.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => {
  console.log("MongoDB Connection ready!!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
};
