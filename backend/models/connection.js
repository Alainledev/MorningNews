const mongoose = require("mongoose")

const connectionString = 'mongodb+srv://lealain:9Abcdef3@lacapsulealain.mmby6vu.mongodb.net/morningnews';

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Successfully connected to the Tablée Database 🥳 !"))
  .catch((errorMessage) => console.error(errorMessage))