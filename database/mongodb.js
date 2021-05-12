var moongoose = require('mongoose');
var config = require('../config/config').config;
const HttpError = require('../models/http-error');
const marketData = require('./data');
var dbName = config.DB;
var url = "mongodb://"+config.HOST+":"+config.PORT+"/" ;
moongoose.connect(url + dbName,
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,useFindAndModify: false} )
       
moongoose.connection.on('open', function (ref) {
            console.log('Connected to mongo server.');
            moongoose.connection.db.listCollections().toArray(function (err, names) {
                if(names.length <= 1){
                    try {
                         marketData.AlSultanIbrahim.save(); 
                         marketData.Mounir.save();
                         marketData.MhanaSurMer.save();
                         marketData.DiscountCode.save();
                         marketData.DiscountCode2.save();
                         marketData.DiscountCode3.save();
                         marketData.Admin.save();
                        setTimeout(()=> {
                          marketData.MhanaSurMerInTables.save();
                          marketData.AlSultanIbrahimInTables.save();
                          marketData.MounirInTables.save();
                          marketData.MhanaSurMerOutTables.save();
                          marketData.MounirOutTables.save();
                          marketData.AlSultanIbrahimOutTables.save();
                        },3000)
                      } catch (err) {
                        const error = new HttpError(
                          'Error occured, please try again.',
                          500
                        );
                        return next(error);
                    }
                }
                module.exports.Collection = names;
            });
        })


 
  