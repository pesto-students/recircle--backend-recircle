const express = require("express");
const {
    selectItems,
    selectMaterials,
    addressdate,
    confirm,
    updateOrder,
    deleteOrder,
    GetAllOrders,
    UserOrderHistory
} = require("../controller/scrapController");

const router = express.Router();

router.route("/selectItems").post(selectItems);
router.route("/selectMaterials").post(selectMaterials);
router.route("/addressdate").post(addressdate);
router.route("/confirm").post(confirm);
router.route("/updateOrder/:scrapID").put(updateOrder);
router.route("/deleteOrder").delete(deleteOrder);
router.route("/GetAllOrders").get(GetAllOrders);
router.route("/GetUserOrders/:userID").get(UserOrderHistory);


module.exports = router;