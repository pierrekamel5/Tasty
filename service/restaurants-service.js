
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Restaurant = require('../models/restaurants');

const getRestaurantById = async (req, res, next) => {
  const placeId = req.params.pid;

  let restaurant;
  try {
    restaurant = await Restaurant.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a restaurant.',
      500
    );
    return next(error);
  }

  if (!restaurant) {
    const error = new HttpError(
      'Could not find restaurant for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ restaurant: restaurant.toObject({ getters: true }) });
};

const getRestaurants = async (req, res, next) => {

  let restaurant;
  try {
    restaurant = await Restaurant.find({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a restaurant.',
      500
    );
    return next(error);
  }

  if (!restaurant) {
    const error = new HttpError(
      'Could not find restaurant for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ restaurant: restaurant.map(restaurant=>restaurant.toObject({ getters: true }))  });
};

const createRestaurant = async (req, res, next) => {
  
  const { title, openTime,location, TelNumber, KnownFor,latitude,longtitude } = req.body;
  const createdMarket = new Restaurant({
    title,
    collections : [],
    restaurantImages:  [],
    openTime: openTime,
    location : location,
    TelNumber : TelNumber,
    KnownFor: KnownFor,
    logoImage:req.file.filename,
    profileImage:req.file.filename,
    latitude: latitude,
    longtitude: longtitude
  });

  try {
    await createdMarket.save(); 
  } catch (err) {
    const error = new HttpError(
      'Creating restaurant failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ restaurant: createdMarket });
};

const deleteRestaurant = async (req, res, next) => {
  const restaurantId = req.params.pid;

  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete restaurant.',
      500
    );
    return next(error);
  }

  if (!restaurant) {
    const error = new HttpError('Could not find restaurant for this id.', 404);
    return next(error);
  }

  try {
    await restaurant.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete restaurant.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Deleted restaurant.' });
};

const updateRestaurant = async (req, res, next) => {
  
  const { pid, location, KnownFor, openTime,TelNumber} = req.body;
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    restaurant.location = location
    restaurant.KnownFor = KnownFor
    restaurant.openTime = openTime
    restaurant.TelNumber = parseInt(TelNumber)
  } catch (err) {
      const error = new HttpError(
        'Something went wrong. please try again',
        500
      );
     return false;
  }
  try {
    await restaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update restaurant.',
      500
    );
    return false;
  }
  return true;
};

const updateImage = async (req, res, next) => {
  const { pid, image } = req.body;
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    if(image == "profile"){
      restaurant.profileImage = req.file.filename;
    } else if (image == "logo"){
      restaurant.logoImage = req.file.filename;
    }
  } catch (err) {
      const error = new HttpError(
        'Something went wrong. please try again',
        500
      );
     return false;
  }
  try {
    await restaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update restaurant.',
      500
    );
    return false;
  }
  return true;
};

const deleteProductFromMenu = async (req, res, next) => {
  const { pid, collectionId, productId} = req.params
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    if(restaurant){
      restaurant.collections.forEach(element => {
        if(element._id == collectionId){
          element.Products.forEach(async product => {
            if(product._id == productId){
             await product.remove();
            }
          })
       
        }
      });
    }
 
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete restaurant.',
      500
    );
    return next(error);
  }
  try {
    await restaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete restaurant.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Product Deleted' });
}

const updateProduct = async (req, res, next) => {
  const  pid = req.params.pid
  const {productId,collectionId,productName, productPrice} = req.body
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    if(restaurant){
      restaurant.collections.forEach(element => {
        if(element._id == collectionId){
          element.Products.forEach(async product => {
            if(product._id == productId){
              product.name = productName;
              product.price = productPrice;
              if(req.file){
                product.productImg = req.file.filename;
              } 
            }
          })
        }
      });
    }
 
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete restaurant.',
      500
    );
    return next(error);
  }
  try {
    await restaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete restaurant.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Product Deleted' });
}

const addProduct = async (req, res, next) => {
  const  pid = req.params.pid
  const {collectionId,productName, productPrice} = req.body
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    if(restaurant){
      restaurant.collections.forEach(element => {
        if(element._id == collectionId){
          element.Products.push({
            price: productPrice,
            quantity: 1,
            name: productName,
            productImg: req.file.filename
          })
        }
      });
    }
 
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not add restaurant.',
      500
    );
    return next(error);
  }
  try {
    await restaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not add restaurant.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Product Add' });
}

const addCollection = async (req, res, next) => {
  const  pid = req.params.pid
  const {collectionName} = req.body
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    if(restaurant){
      restaurant.collections.push({
        name:collectionName,
        Products:[]
      })
    }
 
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not add collection.',
      500
    );
    return next(error);
  }
  try {
    await restaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not add collection.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Collection Added' });
}

const deleteCollection = async (req, res, next) => {
  const  pid = req.params.pid
  const collectionId = req.params.collectionId
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    if(restaurant && restaurant.collections.length > 0){
      
      restaurant.collections.forEach(element => {
        if(element._id == collectionId){
          restaurant.collections.pop(element)
        }
      });
    }
 
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not DELETE collection.',
      500
    );
    return next(error);
  }
  try {
    await restaurant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not DELETE collection.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Collection DELETED' });
}

const updateRestaurantPhoto = async (req, res, next) => {
  const { pid, image, index } = req.body;
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    restaurant.restaurantImages[index] = req.file.filename
  } catch (err) {
      const error = new HttpError(
        'Something went wrong. please try again',
        500
      );
     return false;
  }
  try {
    await Restaurant.update(
      { "title": restaurant.title },
      {
          "$set": {
              "restaurantImages": restaurant.restaurantImages
          }
      }
  );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update photo in restaurant.',
      500
    );
    return false;
  }
  return true;
};
const addRestaurantPhoto = async (req, res, next) => {
  const { pid, image } = req.body;
  let restaurant;
  try {
    restaurant = await Restaurant.findById(pid);
    restaurant.restaurantImages.push(req.file.filename)
  } catch (err) {
      const error = new HttpError(
        'Something went wrong. please try again',
        500
      );
     return false;
  }
  try {
    await Restaurant.update(
      { "title": restaurant.title },
      {
          "$set": {
              "restaurantImages": restaurant.restaurantImages
          }
      }
  );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update photo in restaurant.',
      500
    );
    return false;
  }
  return true;
};
exports.getRestaurantById = getRestaurantById
exports.createRestaurant = createRestaurant
exports.deleteRestaurant = deleteRestaurant
exports.getRestaurants = getRestaurants
exports.updateRestaurant = updateRestaurant
exports.updateImage = updateImage
exports.deleteProductFromMenu = deleteProductFromMenu
exports.updateProduct = updateProduct
exports.addProduct = addProduct
exports.addCollection = addCollection
exports.deleteCollection = deleteCollection
exports.updateRestaurantPhoto = updateRestaurantPhoto
exports.addRestaurantPhoto = addRestaurantPhoto