const User = require('../models/user');

const addFeedback = async (req, res, next) => {
    const { userId, review, fullName, email } = req.body;
    User.findOne({ _id: userId }, (err, userInfo) => {
  
            User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        reviews: {
                            id: Math.floor(Math.random() * 10000 * 10000),
                            description: review,
                            fullName: fullName,
                            email: email,
                            date: Date.now()
                        }
                    }
                },
                {  returnOriginal: false,upsert:true  },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.reviews)
                }
            )
        
    })
}

const getFeedbacks = async (req, res, next) => {
    let review = [];
    let allreview ;
    User.find({},(err, userInfo)=>{
        allreview =   userInfo.map(x => {
            if(x.reviews.length != 0){
               return x.reviews;
            }
        })
        return res.status(200).json({Success: true, Reviews: allreview});
    })
  };

  const removeFeedback = async (req, res) => {
    const { userId, commentId} = req.body
  User.findOneAndUpdate(
      { _id: userId },
      {
          "$pull":
              { "reviews": { "id": parseInt(commentId) } }
      },
      {   returnOriginal: false},
      (err, userInfo) => {
          let review = userInfo.reviews;
          let array = review.map(item => {
              return item.id
          })
          return res.status(200).json({Success: true, Reviews: review});
      }
  )
  
}

const getFeedbacksByUserId = (req, res) => {
    const userId = req.params.pid;
  User.findOne(
      { _id: userId},
      (err, userInfo) => {
          
          let review = userInfo.reviews;
          let array = review.map(item => {
              return item.id
            
          })
          return res.status(200).json({Success: true, Reviews: review});
      }
  )
}
exports.addFeedback = addFeedback;
exports.getFeedbacks = getFeedbacks;
exports.removeFeedback = removeFeedback;
exports.getFeedbacksByUserId = getFeedbacksByUserId;