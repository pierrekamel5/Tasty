const express = require('express');
const reservationService = require('../service/reservation');
const router = express.Router();

router.get('/', reservationService.getAllReservations);
router.post('/', reservationService.addReservation);
router.delete('/:id', reservationService.deleteReservation);
 router.get('/:pid',reservationService.getReservationById);
 router.put('/:id',reservationService.updateReservation);

 router.get('/marketName/:marketName',reservationService.getReservationByMarketName);
 router.get('/numberoftables/:marketName',reservationService.getNumberOfTablesForEachRestaurant);
module.exports = router;