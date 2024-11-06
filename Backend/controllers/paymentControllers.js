const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const Order = require("../models/orderModel");

exports.createPaymentIntent = catchAsync(async (req, res) => {
  const { orderId, paymentId } = req.body;

  // Fetch the order details
  const order = await Order.findById(orderId)
    .populate({
      path: "products.product",
      select: "title_AR price file"
    })
    .exec();

  if (!order) {
    return res.status(404).json({
      status: "fail",
      message: "No order found with that ID"
    });
  }

  // Prepare the payment confirmation request data
  const paymentRequestData = {
    id: paymentId,
    amount: order.totalPrice,
    currency: "SAR",
    description: `${order.products.map(p => p.product.title_AR).join(", ")}`,
    callback_url: "http://localhost:3000/ar"
  };
  // Moyasar API key
  const apiKey = process.env.MOYASAR_API_KEY;

  try {
    const response = await axios.post(
      "https://api.moyasar.com/v1/payments",

      paymentRequestData,

      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Handle the response from Moyasar
    res.status(200).json({
      status: "success",
      data: response.data
    });
  } catch (error) {
    console.error(
      "Payment intent creation failed:",
      error.response ? error.response.data : error.message
    );

    // Handle errors from the request
    res.status(error.response ? error.response.status : 500).json({
      status: "fail",
      message: "Payment intent creation failed"
    });
  }
});
