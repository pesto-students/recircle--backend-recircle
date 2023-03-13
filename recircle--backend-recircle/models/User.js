const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema ({
  name: { type: String},
  email: { type: String},
  designation: { type: String},
  phone: { type: String},
  age: {type: String},
  branch: {type: String}
})


//Define schema
const ScrapSchema = new Schema({
  User: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String,required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


// // Define schema
// const PurchaseSchema = new Schema({
//   buyer: {
//     type: Schema.Types.ObjectId, ref: 'Buyer', required: true},
//   scrap: {
//     type: Schema.Types.ObjectId, ref: 'Scrap', required: true},
//     quantity: { type: Number, required: true},
//     totalPrice: { type: Number, required: true},
//   createdAt: { type: Date, default: Date.now }
// });

// const MessageSchema = new mongoose.Schema({
//   messageSenderId: { type: String, trim: true, },
//   messageReceiverId: { type: String, trim: true,},
//   message: { type: String, trim: true, maxlength: [500, 'Message can not be more than 500 characters'], },
//   isRead: { type: Boolean, default: false, },
//   timeStamp: {
//     type: Date, default: Date.now,},
// });


const User = mongoose.model('User', userSchema);
// const Scrap = mongoose.model("Scrap", ScrapSchema);
// const Purchase = mongoose.model("Purchase", PurchaseSchema);
// const Message = mongoose.model("Message", MessageSchema);

module.exports = {
  User,
  // Scrap,
  // Purchase,
  // Message
};


// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String },
//   profileImage: { type: String },
//   role: {
//     type: String,
//     enum: ['User', 'Buyer', 'Admin'],
//     default: "User",
//     required: true
//   },
//   loginType: {
//     type: String,
//     enum: ['email', 'sso'],
//     default: "email",
//     required: true
//   },
//   active: {
//     type: Boolean,
//     default: true,
//     select: false
//   },
//   ScrapOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scrap" }],
// }, { timestamps: true });
