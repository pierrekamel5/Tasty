const express = require('express');
const { check } = require('express-validator');

const restaurantsControllers = require('../service/restaurants-service');

const router = express.Router();

const multer = require("multer");
const fileUpload = require('../middleware/file-upload');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
let maxSize = 1000000 * 1000;
let upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
});

router.get('/:pid', restaurantsControllers.getRestaurantById);

router.get('/', restaurantsControllers.getRestaurants);

router.post(
  '/',fileUpload.single("image"),
  restaurantsControllers.createRestaurant
);

router.delete('/:pid', restaurantsControllers.deleteRestaurant);

router.delete('/:pid/:collectionId/:productId', restaurantsControllers.deleteProductFromMenu);

router.patch(
  '/:pid', 
  restaurantsControllers.updateRestaurant
);
router.patch(
  '/upload/:pid', fileUpload.single("image"),
  restaurantsControllers.updateImage
);
router.patch(
  '/upload/:pid/restaurantphoto', fileUpload.single("image"),
  restaurantsControllers.updateRestaurantPhoto
);
router.post(
  '/upload/:pid/restaurantphoto', fileUpload.single("image"),
  restaurantsControllers.addRestaurantPhoto
);
router.patch('/:pid/product',fileUpload.single("image"),restaurantsControllers.updateProduct);

router.post('/:pid',fileUpload.single("image"),
  restaurantsControllers.addProduct
);

router.post('/:pid/collection',fileUpload.single("image"),
  restaurantsControllers.addCollection
);

router.delete('/:pid/:collectionId',
  restaurantsControllers.deleteCollection
);


module.exports = router;
