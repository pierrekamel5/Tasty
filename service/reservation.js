const HttpError = require('../models/http-error');
const Reservation = require('../models/reservation');
const User = require('../models/user');
const TablesReserved = require('../models/reservedtables');
const tablesNumber = require('../models/tablesnumber');
var nodemailer = require('nodemailer');
const getAllReservations = async (req, res, next) => {
    let reservations;
    try {
        reservations = await Reservation.find({});
    } catch(err){
        const error = new HttpError("Something went wrong",500);
    }

    res.json({ reservation: reservations.map(reservation => reservation.toObject({ getters: true })) });
}

const addReservation = async (req, res, next) => {
 const { userId,marketName,reservationDate,numberOfPeople,otherComments,reservedBy, tableNumber, email } = req.body;

 var addingReservation = await getTableIfReserved({"marketName":marketName,"tableNumber":tableNumber, "date":reservationDate} );

 if(!addingReservation){
  const error = new HttpError("That table is reserved, please change the number of your table",500);
  return next(error);
 } else {
  await addTableToReservation({"marketName":marketName,"tableNumber":tableNumber,"date":reservationDate} )
 }
  const reservationCreated = new Reservation({
    userId,
    marketName,
    numberOfPeople,
    reservedBy,
    otherComments,
    reservationDate
    });
    User.findOneAndUpdate(
      { _id: userId },
      {
          $push: {
            reservation: {
                  userId: userId,
                  marketName: marketName,
                  numberOfPeople: numberOfPeople,
                  reservedBy: reservedBy,
                  reservationDate: reservationDate,
                  otherComments: otherComments
              }
          }
      },
      {upsert:true, returnOriginal: false},
      (err, userInfo) => {
        const createdReservation = new Reservation({
          userId,
          marketName,
          numberOfPeople,
          reservationDate,
          otherComments
        });
        async(req,res,next) => {
          try{
          await createdReservation.save();
       var reservedTables =  await getReservedTablesByRestaurantName(marketName) ;
          } catch(err){
            const error = new HttpError("Something went wrong",500);
        }
          res.status(201).json({ reservation: createdReservation });  
        }
      }
  )
  var transporter = nodemailer.createTransport({
    service: 'YAHOO',
    secure: true,
    auth: {
      user: 'pierrekamel57@yahoo.com',
      pass: 'cvemgppdbxfldxxj'
    }
  });
  var mailOptions = {
    from: 'pierrekamel57@yahoo.com',
    to: email,
    subject: 'Tasty Reservation',
    text: `
    You have made a reservation in ${marketName} restaurant in ${reservationDate}.

    Your table will have ${numberOfPeople} seats and the reservation name is ${reservedBy}
    
    Thank you for your support. `
  };
  
    try {
      await reservationCreated.save();
      transporter.sendMail(mailOptions, function(error, info){
      });
    } catch (err) {
      const error = new HttpError(
        'Reservation Failed, please try again later.',
        err
      );
      return next(error);
    }
    res.status(201).json({ reservation: reservationCreated.toObject({ getters: true }) });
}

const getReservationById =  async (req, res, next) => {
    const reservationId = req.params.pid;
    let reservations;
    try {
      reservations = await Reservation.find({"userId":reservationId});
      
    } catch(err){
        const error = new HttpError("Something went wrong",500);
        return next(error);
    }
res.json({reservation: reservations.map(res => res.toObject({ getters: true }))  });
}



const updateReservation =  async (req, res, next) =>{
    const reseravtionId = req.params.id;
    const reservation = await Reservation.findById(reseravtionId);
    if (reservation) {
        reservation.marketName = req.body.marketName || reservation.marketName;
        reservation.numberOfPeople = req.body.numberOfPeople || reservation.numberOfPeople;
        reservation.otherComments = req.body.otherComments ||reservation.otherComments;
      const UpdatedReservation = await reservation.save();
      res.send({
        _id: UpdatedReservation.id,
        userId: UpdatedReservation.userId,
        marketName: UpdatedReservation.marketName,
        numberOfPeople: UpdatedReservation.numberOfPeople,
        otherComments: UpdatedReservation.otherComments
      });
    } else {
      res.status(404).send({ message: 'Reservation Not Found' });
    }
}

const deleteReservation =  async (req, res, next) => {
    let reservation;
    const reservationId = req.params.pid;
    try {
        reservation = await Reservation.findById(reservationId);
    } catch(err) {
        const error = new HttpError(
            'Something Went Wrong',500);
            return next(error);
    }
   if(!reservation){
    const error = new HttpError(
        'Something Went Wrong',500);
        return next(error)
   }
    try{
        await reservation.remove();
    }catch(err){
        const error = new HttpError(
            'Something Went Wrong',500);
            return next(error);
    }
    res.status(200).json({message: 'Reservation Deleted.'});
    
}

const getReservationByMarketName = async (req, res, next) => {
  const marketName = req.params.marketName;
    let reservations;
    try {
      reservations = await Reservation.find({"marketName":marketName});
    } catch(err){
        const error = new HttpError("Something went wrong",500);
        return next(error);
    }
res.json({reservation: reservations.map(reservation => reservation.toObject({ getters: true }))});
}



const getReservedTablesByRestaurantName =  async (req, res, next) => {
  const restaurantName = req;
  let reservedTables;
  try {
    reservedTables = await Reservation.find({"restaurantName":restaurantName});
    
  } catch(err){
      const error = new HttpError("Something went wrong",500);
      return next(error);
  }
return res.json({reservedTables: reservedTables.map(res => res.toObject({ getters: true }))  });
}
const dateformat = require('dateformat');
const getTableIfReserved = async (req, res, next) => {
  const restaurantName = req.marketName;
  const TableNumber = req.tableNumber;
  const date = req.date;
  const dateSelect =  dateformat(date, 'dddd, mmmm dS, yyyy');
  let reservedTables;
  try {
    reservedTables = await TablesReserved.findOne({ tablenumber: TableNumber,restaurantName: restaurantName, date:dateSelect});
  
    if(reservedTables === null){
    return true;
   }
 
  } catch (err) {
    return false;
  }

}

const addTableToReservation = async(req,res, next) => {
  const restaurantName = req.marketName;
  const TableNumber = req.tableNumber;
  const date = dateformat(req.date, 'dddd, mmmm dS, yyyy');
  const createTableReservation = new TablesReserved({
    tablenumber:TableNumber
    ,restaurantName:restaurantName,
    date:date
    
  });

  try {
    await createTableReservation.save();
  } catch (err) {
    return false;
  }
  return true;
};


const getNumberOfTablesForEachRestaurant = async (req, res, next) => {
  let tables;
  const restaurantName = req.params.marketName;
  try {
    tables = await tablesNumber.find({restaurantName:restaurantName});
  } catch (err) {
    const error = new HttpError("",
      500
    );
    return next(error);
  }
  res.json({ NumberOfTables: tables});
};

exports.getAllReservations = getAllReservations;
exports.addReservation = addReservation;
exports.getReservationById = getReservationById;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;
exports.getReservationByMarketName = getReservationByMarketName;
exports.getNumberOfTablesForEachRestaurant = getNumberOfTablesForEachRestaurant;