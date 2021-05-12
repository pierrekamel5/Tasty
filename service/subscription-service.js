
const HttpError = require('../models/http-error');
const Subcription = require('../models/subscriptioncode');
const userService = require('./users-service');
const User = require('../models/user');
var nodemailer = require('nodemailer');

const addSubscription = async(req,res, next) => {
  
    const code = req.body.code;
    const pourcentage = req.body.pourcentage;
    const creatingSubscription = new Subcription({
      "Code":code,
      "Pourcentage": pourcentage
      
    });
  
    try {
      await creatingSubscription.save();
    } catch (err) {
      return res.json(true);
    }
    return res.json(true);
  };

const checkIfUserIsSubscribed = async (req, res, next) => {
    var isUserSubscribed = await userService.getUserByEmail(req.params.email);
    if( isUserSubscribed != undefined && isUserSubscribed.isSubscribed){
      return res.json(true);
    }
    return res.json(false);
  }

const sendSubscriptionCodeToUser = async(req,res, next) => {
  const {subscriptionName, subscriptionEmail, paymentId} = req.body;
  var user = await userService.getUserByEmail(subscriptionEmail);
  var getCode = await getSubscription(paymentId);
    var transporter = nodemailer.createTransport({
        service: 'YAHOO',
        secure: true,
        auth: {
          user: 'pierrekamel57@yahoo.com',
          pass: 'cvemgppdbxfldxxj'
        }
      });
     var benefit;
      if(paymentId === 1){
        benefit = '15%'
      } else if (paymentId === 2){
        benefit = '20%'
      } else if (paymentId === 3){
        benefit = '25%'
      }
var mailOptions = {
    from: 'pierrekamel57@yahoo.com',
    to: subscriptionEmail,
    subject: 'Subscription Code',
    text: `
    Hello ${subscriptionName},

    Thank you for your subscription to Tasty app 

    You will benefit from ${benefit} discount for every order you take.
    
    Your Discount Code : ${getCode.Code}
    
    Please enter that code before you make the order 
    
    Thank you for your support. `
  };
  try {

    transporter.sendMail(mailOptions, function(error, info){

        res.json("Email Sent to user")
      });

   await User.findOneAndUpdate(
        { _id: user._id},
        {"isSubscribed": true },
        { new: true, upsert: true });
  } catch(err){
        res.json("Error Sending the email to user")
  }
     
  };

const getSubscriptionByCode = async (req, res, next) => {
  const subcriptionCode = req.params.subscriptioncode;

  let sub;
  try {
    sub = await Subcription.findOne({"Code": subcriptionCode});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a subscription.',
      500
    );
    return next(error);
  }

  if (!sub) {
    const error = new HttpError(
      'Could not find subscription for the provided code.',
      404
    );
    return next(error);
  }

  res.json({ subscription: sub.toObject({ getters: true }) });
  };
 
const getSubscription = async (req, res, next) => {
    var paymentId = req;
    let sub;
    try {
      sub = await Subcription.findOne({PaymentId: paymentId});
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a subscription.',
        500
      );
      return next(error);
    }
   return sub;
  };

exports.getSubscriptionByCode = getSubscriptionByCode;
exports.addSubscription = addSubscription;
exports.sendSubscriptionCodeToUser = sendSubscriptionCodeToUser;
exports.checkIfUserIsSubscribed = checkIfUserIsSubscribed;