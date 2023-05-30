const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



// Register a User
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  try{
    const {name,amount,email} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount*100),
        currency: 'INR',
        description: name,
        payment_method_types: ['card'],
        receipt_email: email,
        metadata: {
          company: "JalaunCodingCoching",
        },
    });

    const clientSecret = paymentIntent.client_secret;
    res.json({message: "Payment Successful", clientSecret});

  }catch(err){
    console.log(err);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
});

