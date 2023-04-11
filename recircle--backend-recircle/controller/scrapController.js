const express = require('express');
const bodyParser = require('body-parser');
const { ScrapSale } = require("../models/User");

const app = express();
app.use(bodyParser.json());
const { User } = require("../models/User");

// Post api to select Items 
const selectItems = async (req, res) => {
  try {
    const { userID, selectedItems } = req.body;
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).send('User not found');
    }
    const scrapSale = new ScrapSale({
      selectedItems,
      user: user._id,
      createdBy: user._id
    });
    await scrapSale.save();
    res.send(scrapSale);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// POst API to select moterial
  const selectMaterials = async (req, res) => {
  try {
    const { id, selectedMaterials } = req.body;
    const scrapSale = await ScrapSale.findById(id);
    if (!scrapSale) {
      res.status(404).send('Scrap sale not found');
    }
    scrapSale.selectedMaterials = selectedMaterials;
    await scrapSale.save();
    res.send(scrapSale);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Post api to select date and address
  const addressdate = async (req, res) => {
  try {
    const { id, address, date } = req.body;
    const scrapSale = await ScrapSale.findById(id);
    if (!scrapSale) {
      res.status(404).send('Scrap sale not found');
    }
    scrapSale.address = address;
    scrapSale.date = date;
    await scrapSale.save();
    res.send(scrapSale);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Post api to confirm order
  const confirm = async (req, res) => {
  try {
    const { id } = req.body;
    const scrapSale = await ScrapSale.findById(id);
    if (!scrapSale) {
      res.status(404).send('Scrap sale not found');
    }
    scrapSale.status = 'Your order has been placed';
    await scrapSale.save();
    // res.send(scrapSale);
    res.json({
      success: true,
      data: scrapSale,
      message: "Your order has been placed",
      // data: {
      //     _id: user._id,
      // }
  });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// PUT request to update a scrap sale order by ID
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedItems, selectedMaterials, address, date } = req.body;

    const updatedOrder = await ScrapSale.findByIdAndUpdate(id, {
      selectedItems,
      selectedMaterials,
      address,
      date,
    }, { new: true });

    if (!updatedOrder) {
      res.status(404).send('Scrap sale order not found');
    }

    res.send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// DELETE request to delete a scrap sale order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await ScrapSale.findByIdAndDelete(id);

    if (!deletedOrder) {
      res.status(404).send('Scrap sale order not found');
    }

    res.send(`Scrap sale order with ID ${id} deleted successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


// GET request to retrieve all scrap sale orders
const GetAllOrders = async (req, res) => {
  try {
    const scrapSales = await ScrapSale.find().populate('user');
    if (!scrapSales) {
      res.status(404).send('Scrap sales not found');
    }
    const data = scrapSales.map((scrapSale) => ({
      selectedMaterials: scrapSale.selectedMaterials,
      address: scrapSale.address,
      date: scrapSale.date,
      userName: scrapSale.user ? scrapSale.user.name : '',
      phoneNumber: scrapSale.user ? scrapSale.user.phoneNumber : ''
    }));
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
//Get all orders of a single user
// router.get('/orders/:userId', async (req, res) => {
  const UserOrderHistory = async (req, res) => {  
  try {
    const orders = await ScrapSale.find({ selectedItems: { $in: [req.params.userId] } });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  selectItems,
  selectMaterials,
  addressdate,
  confirm,
  updateOrder,
  deleteOrder,
  GetAllOrders,
  UserOrderHistory
}

 