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


const ScrapSaleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  selectedItems: {
    type: [String],
 
  },
  selectedMaterials: {
    type: [String],
   
  },
  address: {
    type: String,
   
  },
  date: {
    type: Date,
   
  },
}, { timestamps: true });

const ScrapSale = mongoose.model('ScrapSale', ScrapSaleSchema);
const User = mongoose.model('User', UserSchema);
// const Purchase = mongoose.model("Purchase", PurchaseSchema);
// const Message = mongoose.model("Message", MessageSchema);

module.exports = {
  User,
  ScrapSale
  // Purchase,
  // Message
};


