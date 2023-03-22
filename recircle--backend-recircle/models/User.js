const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  profileImage: { type: String },
  role: {
    type: String,
    enum: ['User', 'Buyer', 'Admin'],
    default: "User",
    required: true
  },
  loginType: {
    type: String,
    enum: ['email', 'sso'],
    default: "email",
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
}, { timestamps: true });



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



const User = mongoose.model('User', UserSchema);
// const Scrap = mongoose.model("Scrap", ScrapSchema);
// const Purchase = mongoose.model("Purchase", PurchaseSchema);
// const Message = mongoose.model("Message", MessageSchema);

module.exports = {
  User,
  // Scrap,
  // Purchase,
  // Message
};


