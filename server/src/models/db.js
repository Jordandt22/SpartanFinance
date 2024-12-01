const mongoose = require("mongoose");

const connect = mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.htm2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

// Check if database connected
connect
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Database cannot be connected.", error);
  });

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  uid: {
    type: String,
  },
  bankID: {
    type: String,
  },
  financialInfo: {
    monthlyIncome: Number,
    monthlySpending: Number,
    monthlySavings: Number,
  },
});

// Collection part
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
