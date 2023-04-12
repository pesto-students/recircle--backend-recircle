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
  country: {
    type: String,
    default: true
  },
  gender: {
    type: String,
    default: true
  },
  dateofbirth: {
    type: String,
    default: true
  },
}, { timestamps: true });



const ScrapSaleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// const ScrapSale = mongoose.model('ScrapSale', ScrapSaleSchema);

const EventSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  description: {type: String, required: true},
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    required: true,
  },
}, { timestamps: true });


const eventRegistrationSchema = new mongoose.Schema({
  eventName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});


const ScrapSale = mongoose.model('ScrapSale', ScrapSaleSchema);
const User = mongoose.model('User', UserSchema);
const Event = mongoose.model('Event', EventSchema);
const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);
// const Purchase = mongoose.model("Purchase", PurchaseSchema);
// const Message = mongoose.model("Message", MessageSchema);

module.exports = {
  User,
  ScrapSale,
  Event,
  EventRegistration
  // Purchase,
  // Message
};


