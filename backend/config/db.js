const mongoose = require('mongoose');

  const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose Connected"))
  .catch((error) => console.log("Error while Connecting", error))
  }


module.exports = connectDB