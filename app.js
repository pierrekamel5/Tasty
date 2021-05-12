const express            = require('express');
const bodyParser         = require('body-parser');
const marketsRoutes      = require('./routes/restaurants-routes');
const usersRoutes        = require('./routes/users-routes');
const ordersRoutes       = require('./routes/orders-routes');
const feedbackRoutes     = require('./routes/feedback-routes');
const reservationRoutes  = require('./routes/reservation-routes');
const subscriptionRoutes = require('./routes/subscription-routes');
const HttpError = require('./models/http-error');

const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

let db;
 db  = require("./database/mongodb");
 app.use(bodyParser.json());

 app.use('/uploads/images', express.static(path.join('uploads', 'images')));
 
 app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   );
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
 
   next();
 });
app.use('/api/places', marketsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/subscriptions',subscriptionRoutes );
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// app.use((error, req, res, next) => {
//   if (req.file) {
//     fs.unlink(req.file.path, err => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || 'An unknown error occurred!' });
// });
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});