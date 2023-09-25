
const { instance } = require('../../server.js')

const { Payment } = require("../../model/paymentModel.js");
const crypto = require('crypto');


const checkOut = async (req, res) => {
  const options = {
    amount: Number(req.body.TotalAmount * 100),
    currency: "INR"
  };


  const order = await instance.orders.create(options);
  // console.log(order);
  res.status(200).json({ success: true, order });
}


const paymentVerification = async (req, res) => {
  // console.log(req.body);
  //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //       req.body;

  //     const body = razorpay_order_id + "|" + razorpay_payment_id;
  //   console.log(body);
  //     const expectedSignature = crypto
  //       .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
  //       .update(body.toString())
  //       .digest("hex");


  //     const isAuthentic = expectedSignature === razorpay_signature;
  //   console.log(isAuthentic);
  //     if (isAuthentic) {
  //       // Database comes here

  //       await Payment.create({
  //         razorpay_order_id,
  //         razorpay_payment_id,
  //         razorpay_signature,
  //       });

  res.redirect(
    `https://tasteonway.onrender.com/paymentsuccess`
  );
  // } else {
  //   res.status(400).json({
  //     success: false,
  //   });
  // }
};


module.exports = { checkOut, paymentVerification };