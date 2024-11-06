const Orders = require("../models/OrderModel");
const Product = require("../models/ProductModel");

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({ user: req.user._id });
    res.status(200).json({
      length: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order_details = await Orders.findById(req.params.id).populate(
      "user",
      "-pass -isadmin -__v "
    );
    res.status(200).json({
      order_details,
    });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { orderTotal, cartItems, paymentMethod } = req.body;
    if (!(orderTotal && cartItems)) {
      return res.send("orderTotal and cartItems are required");
    }
    let ids = cartItems.map((item) => {
      return item.productid;
    });
    let quant = cartItems.map((item) => {
      return Number(item.quantity);
    });

    await Product.find({ _id: { $in: ids } }).then((products) =>
      products.forEach(function (product, index) {
        product.sales += quant[index];
        product.save();
      })
    );

    const order = new Orders({
      user: req.user._id,
      orderTotal,
      cartItems,
      paymentMethod,
    });
    await order.save();
    res.status(201).json({
      order,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id).orFail();
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
    res.status(200).json({
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({})
      .populate("user", "-pass -isadmin -__v ")
      .sort({ paymentMethod: 1 });
    res.status(200).json({
      len: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrderForAnalysis = async (req, res, next) => {
  try {
    const startDates = new Date(req.params.date);
    startDates.setHours(0, 0, 0, 0);
    const endDates = new Date(req.params.date);
    endDates.setHours(23, 59, 59, 999);
    const orders = await Orders.find({
      createdAt: { $gte: startDates, $lte: endDates },
    });
    res.status(200).json({
      len: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id).orFail();
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(200).json({
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteorder = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id).orFail();
    await order.deleteOne();
    res.send("done deleting order");
  } catch (err) {
    next(err);
  }
};
