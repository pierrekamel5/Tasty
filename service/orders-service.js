const { validationResult } = require('express-validator');
const User = require('../models/user');
const Payment = require('../models/order');
const HttpError = require('../models/http-error');
const addToCart = async (req, res, next) => {
    const { userId, productId, productName, productPrice, productImg, quantity } = req.body;
    User.findOne({ _id: userId }, (err, userInfo) => {
     
        let duplicate = false;
  
        userInfo.cart.forEach((item) => {
            if (item.id === productId) {
                duplicate = true;
            }
        })
  
  
        if (duplicate) {
           userInfo.cart.forEach((item)=>{
            });
            User.findOneAndUpdate(
                { _id:userId, "cart.id": productId },
                { $inc: { "cart.$.quantity": 1, "cart.$.totalprice":productPrice } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        cart: {
                            id: productId,
                            productName: productName,
                            productPrice: productPrice,
                            quantity: quantity,
                            productImg: productImg,
                            totalprice:  productPrice,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
}

const removeFromCart = async (req, res) => {
    const { userId, productId} = req.body
  User.findOneAndUpdate(
      { _id: userId },
      {
          "$pull":
              { "cart": { "id": productId } }
      },
      {  returnOriginal: false,upsert:true },
      (err, userInfo) => {
          let cart = userInfo.cart;
          let array = cart.map(item => {
              return item.id
          })
          return res.status(200).json({Success: true, Cart: cart});
      }
  )
  
}

const getUserCartInfo = (req, res) => {
    const userId = req.params.pid;

  User.findOne(
      { _id: userId},
      (err, userInfo) => {
          let cart = userInfo.cart;
          let array = cart.map(item => {
              return item.id
            
          })
          return res.status(200).json({Success: true, Cart: cart});
      }
  )
}

const paymentCreated = async ( req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
   const { userId,fullname,phoneNumber,address,cardNumber,monthExpiration,yearExpiration,cvv,cart } = req.body;
    const paymentCreated = new Payment({
       userId,fullname,phoneNumber,address,cardNumber,monthExpiration,yearExpiration,cvv,cart
      });
      cart.map(x => {
        User.findOneAndUpdate(
          { _id: userId},
          {
              "$pull":
                  { "cart": { "id": x.id } }
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ err });
        });
    })
      try {
        await paymentCreated.save();
      } catch (err) {
        const error = new HttpError(
          'Payment Failed, please try again later.',
          err
        );
        return next(error);
      }
      res.status(201).json({ payment: paymentCreated.toObject({ getters: true }) });
}
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.getUserCartInfo = getUserCartInfo;
exports.paymentCreated = paymentCreated;