const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await (mongoose.connect('mongodb+srv://divij:divij123@cluster0.87sbvjj.mongodb.net/test'));

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
