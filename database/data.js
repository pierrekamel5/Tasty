const Restaurant = require('../models/restaurants');
const tablesNumber = require('../models/tablesnumber');
const discountCode = require('../models/subscriptioncode');
const user = require('../models/user');
const MhanaSurMer = new Restaurant({
    "title":"Mhana Sur Mer",
    "collections":[
      {"name":"Hot Appetizers","Products":[
        {"name": "Foul medamas", "price": "13500", "productImg":"Ful_medames.jpg"},
        {"name": "Lamb eggs", "price": "23000", "productImg":"Greek-Baked-Eggs-with-Lamb-and-Mushrooms-3006.jpg"},
        {"name": "Sausage ", "price": "33000","productImg":"sausage.jfif"},
        {"name": "Hot Sausage ", "price": "23500","productImg":"Grilled-Sausage-and-Peppers-Recipe.jpg"},
        {"name": "Homos with pine ", "price": "23500", "productImg":"A9oAs6RCMAAzCRU.jpg"},
        {"name": "Homos mtamam ", "price": "30000", "productImg":"image333s.jfif"},
        {"name": "Homos with meat ", "price": "13500", "productImg":"mawwal-restaurant.jpg"},
        {"name": "Fish Kebbeh ", "price": "28000", "productImg":"img_4041-1024x7121.jpg"},
        {"name": "French Fries ", "price": "13500", "productImg":"imagesfries.jfif"},
        {"name": "Meat sambousik ", "price": "40000", "productImg":"d713e472-1bf2-4c08-94b7-a3b391558214.jpg"},
          {"name": "Cheese rolls ", "price": "13000", "productImg":"2b3d793fc5b226d43287410e7b446caa.jpg"},
          {"name": "Kebbeh Halabieh ", "price": "18000", "productImg":"kibbeh_ri_albasha_brussels_0012.png"},
          {"name": "Spinach Fatayer ", "price": "18000", "productImg":"Fatayer-33-500x500.jpg"},
          {"name": "Grilled Halloum", "price": "21000", "productImg":"grilled-halloumi-111-2021.jpg"},
          {"name": "Fish bezreh", "price": "26000", "productImg":"23d4c27a4dba2f779d73a5ae3859d5e7.jpg"}
      ]},
      {"name":"Cold Appetizers","Products":[
        {"name": "Fresh Vegetable platter", "price": "33000","productImg":"20120618-vegetable-platter-5.jpg"},
        {"name": "Fresh Vegetable platte", "price": "22000", "productImg":"20120618-vegetable-platter-4.jpg"},
        {"name": "Olives", "price": "12000", "productImg":"imagessad.jfif"},
        {"name": "Mixed pickles plate ", "price": "15000","productImg":"syrian-mixed-pickle-8634438.jpg"},
       {"name": "Moutabal", "price": "13500", "productImg":"2-400x381.jpg"},
        {"name": "Stuffed vine leaves", "price": "13500", "productImg":"imaasdasdages.jfif"},
        {"name": "Goat Labneh", "price": "22000", "productImg":"Labneh-7.webp"},
        {"name": "Labneh ", "price": "15000", "productImg":"imasdages.jfif"},
        {"name": "Labneh with garlic", "price": "21000", "productImg":"imagesss.jfif"},
        {"name": "Makdous", "price": "14000", "productImg":"imageadadawds.jfif"},
        {"name": "Roasted potatoes", "price": "14000", "productImg":"rosemary-roasted-potatoes-recipe.jpg"},
        {"name": "Grilled potatoes", "price": "14000", "productImg":"0809-GO-DS23021-cp.jpg"},
        {"name": "Mouhamara", "price": "15500", "productImg":"shutterstock_186138152.jpg"},
        {"name": "Chanklish", "price": "15500", "productImg":"a65485226ccd6eb46e66886b24d1c179.jpg"},
        {"name": "Local white cheese", "price": "18500", "productImg":"jebne.jfif"},
         {"name": "Batrakh", "price": "95000", "productImg":"bottarga-f4110ebe-fafe-4127-97ba-3ff0324878a-resize-750.jpeg"},
        {"name": "Fish tagen", "price": "28000", "productImg":"2dasxssada.jfif"},
        {"name": "Tabouleh", "price": "13500", "productImg":"imasadwges.jfif"},
        {"name": "Fatoush", "price": "13500", "productImg":"c38ec748d283bee8dd5da429f4729da1.jpg"},
        {"name": "Fresh green rocca", "price": "9000", "productImg":"roccasalad.jfif"},
        {"name": "Beets", "price": "28000", "productImg":"ewd2e2dc.jfif"},
        {"name": "Oriental Salad", "price": "13500", "productImg":"Oriental-Salad-AKA-Broccoli-Slaw-013-2-735x871.jpg"},
        {"name": "Salad Crab", "price": "39000", "productImg":"saladcrab.jfif"},
        {"name": "Concombre", "price": "5500", "productImg":"sadw2cdacaae.jfif"},
        {"name": "Tomate", "price": "5500", "productImg":"awdx3dcc.jfif"},
        {"name": "Hommos Shrimp", "price": "39000", "productImg":"imagdrrfcwes.jfif"},
        {"name": "Raheb", "price": "16250", "productImg":"imddawdawdawaages.jfif"}
      ]},
      {"name":"Raw Meat","Products":[
        {"name": "Raw lamb liver", "price": "32000","productImg":"8410gcsC6yvmQ9g4gu57cfsdI6XLKZYvTdCmdUluO5o.jpg"},
        {"name": "Raw labm tenderlion", "price": "32000", "productImg":"awdwadacaw.jfif"},
        {"name": "Raw kafta", "price": "32000", "productImg":"adaeteat34fc.jfif"},
        {"name": "Raw Kebbeh", "price": "32000","productImg":"asdasdwaada.jfif"},
        {"name": "Raw habra", "price": "32000","productImg":"sawda.jfif"},
        {"name": "Kebbeh (namousheh)", "price": "32000", "productImg":"kibbeh-nayyeh-1-FP.jpg"},
        {"name": "Kebbeh (frakeh)", "price": "32000", "productImg":"asdwdaxws.jfif"},
       ]},
       {"name":"Sea Food","Products":[
        {"name": "Raw fish", "price": "44000","productImg":"asdwaxa.jfif"},
        {"name": "Raw fish kebbeh", "price": "35000", "productImg":"RSP_9627.jpg"},
        {"name": "Shrimp provincial", "price": "42000","productImg":"imasdasdwages.jfif"},
        {"name": "Sea food rolls", "price": "36250", "productImg":"asdwdawdwd.jfif"},
       {"name": "Calamari provencial", "price": "30000", "productImg":"aasdasdasda.jfif"},
        {"name": "Fish Shawarma", "price": "35000", "productImg":"imageaaads.jfif"},
        {"name": "Fried fish in soya", "price": "35000", "productImg":"imagsssses.jfif"},
        {"name": "Grilled Calamari", "price": "32000","productImg":"Calamari-steak-copy-855x570.jpg"},
        {"name": "Shrimps panne's", "price": "39000","productImg":"35fveedc22.jfif"},
        {"name": "Grilled Octopus", "price": "44000", "productImg":"321dadacea2s.jfif"},
        {"name": "Shrimps Fatteh", "price": "43000", "productImg":"asd2xcr4s.jfif"},
     
      ]},
      {"name":"Exotic Fruit","Products":[
        {"name": "Pineapple", "price": "40000","productImg":"imadax2sages.jfif"},
        {"name": "Mango", "price": "34000", "productImg":"asd2xsa.jfif"},
        {"name": "Kiwi", "price": "13000", "productImg":"2dxdh3.jfif"},
 ]},
 {"name":"Sweets","Products":[
  {"name": "Osmalieh", "price": "18500","productImg":"2d2dxaws.jfif"},
  {"name": "Katayef", "price": "17000", "productImg":"be3b098ec1d259d47990dc93a9e3b384.jpg"},
  {"name": "Ashta with honey", "price": "21000", "productImg":"imaaw2wwxasages.jfif"},
  {"name": "Special home ice cream", "price": "16000","productImg":"Strawberry-Ice-Cream-No-Churn_3b.jpg"},
  {"name": "Fresh fruits cocktail", "price": "9500","productImg":"0b791756fa69849d1509a1ffb85e3d16.jpg"},
  {"name": "Halawit el jeben", "price": "18000", "productImg":"imaSSAWXWges.jfif"},
  {"name": "Karabij", "price": "18500", "productImg":"asxwaxX.jfif"},
  {"name": "Mhalabiyeh", "price": "13000", "productImg":"asdasdawda.jfif"},
 ]},
 {"name":"Hot Beverage","Products":[
  {"name": "Coffee", "price": "8000","productImg":"800px-A_small_cup_of_coffee.jfif"},
  {"name": "Tea", "price": "8000", "productImg":"iDECEWages.jfif"},
  {"name": "Zhourat", "price": "8000", "productImg":"SADWDXS.jfif"},
  {"name": "Nescafe", "price": "8000","productImg":"imagesdwxXXAs.jfif"},
  {"name": "Cafe blanc", "price": "8000","productImg":"asxwximaxawges.jfif"},
 ]}
  ],
    "restaurantImages":['mhanasurmerImage1.png','mhanasurmerImage3.png','mhanasurmerImage2.png','mhanasurmerImage4.png',
  'mhanasurmerImage5.png','mhanasurmerImage6.png'],
    "openTime": "12noon – 11:30pm",
    "location": "Antelias",
    "TelNumber": 9614403636,
    "KnownFor":"Serving traditional Lebanese cuisine with high quality ingredients",
    "logoImage":"mhanalogo.jpg",
    "profileImage":"mhanalogo.jpg",
    "latitude":33.85643000571267,
    "longtitude": 35.89341259783581
  });

  const Mounir = new Restaurant({
    "title":"Mounir",
    "collections":[
      {"name":"Appetizers","Products":[
        {"name": "Vegetable platter", "price": "35000","productImg":"Vegetableplatter.jfif"},
        {"name": "Mixed Pickles", "price": "13000", "productImg":"MixedPickles.jfif"},
        {"name": "Tabouleh", "price": "20000", "productImg":"Tabouleh-Rezept-Klassisch-2020-3.jpg"},
        {"name": "Fatoush", "price": "20000","productImg":"Fatoush.jfif"},
        {"name": "Hommos", "price": "15000","productImg":"Hommos.jfif"},
        {"name": "Moutabal", "price": "15000", "productImg":"Moutabal.jfif"},
        {"name": "Foul", "price": "14500", "productImg":"Foul.jfif"},
        {"name": "Labneh", "price": "14000", "productImg":"Labnehasdww.jfif"},
        {"name": "White cheese", "price": "18000", "productImg":"Whiteheese.jfif"},
        {"name": "Green Beans", "price": "14000", "productImg":"garlic-green-beans-3-700x586.jpg"},
        {"name": "Artichoke", "price": "15000", "productImg":"Artichoke.jfif"},
        {"name": "Hindbeh", "price": "17000", "productImg":"Hindbeh.jfif"},
        {"name": "Lentil", "price": "16000", "productImg":"Lentil.jfif"},
        {"name": "Rocca", "price": "11000", "productImg":"3-min-29-405x381.jpg"},
        {"name": "Shanklish", "price": "17000", "productImg":"blog-sala.jpg"},
        {"name": "Stuffed spleen", "price": "18000", "productImg":"DSC05761.jpg"},
        {"name": "Seasonal Salad", "price": "15000", "productImg":"salad.jpg"},
        {"name": "Palmito Salad", "price": "20000", "productImg":"brazillian-hearts-of-palm-salad.jpg"},
        {"name": "Asparagus Salad", "price": "16000", "productImg":"asparagus-salad-with-sweet-balsamic-vinegar.jpg"},
        {"name": "Eggplant Salad", "price": "17000", "productImg":"Chickpea-and-Eggplant-Salad.jpg"},
        {"name": "Moujadara", "price": "18000", "productImg":"mujadaravideo-videoSixteenByNine390.jpg"},
      ]},
      {"name":"Hot Mezze","Products":[
        {"name": "Hommos with Shawarma", "price": "23000","productImg":"HommoShawarma.jfif"},
        {"name": "Makanek Sausages", "price": "28000", "productImg":"b0b6e1c7da5d075dd5a0fe05dc9ef620.jpg"},
        {"name": "Chicken liver", "price": "28000","productImg":"liver-750x750.jpg"},
        {"name": "Lamb Amourette", "price": "33000","productImg":"rognonnade-de-veau.jpg"},
        {"name": "Sanbousik", "price": "8000", "productImg":"Sanbousik.jfif"},
        {"name": "Fried Kebbeh", "price": "8000", "productImg":"easy-beginner-kibbeh-recipe-2355367-Hero-5b7b259ec9e77c00505a8eaa.jpg"},
        {"name": "Chesse rolls", "price": "8000", "productImg":"cheeserolls-14.jpg"},
        {"name": "Meat Pie", "price": "8000", "productImg":"MeatxPie.jfif"},
        {"name": "Grilled Cheese Pita", "price": "19000", "productImg":"Caramelized-Onion-Sundried-Tomato-Grilled-Cheese-Pita-3.jpg"},
       {"name": "Fried eggplant", "price": "14000","productImg":"hot-aubergine-2.jpg"},
       {"name": "Spicy Potatoes a la provencale", "price": "18000","productImg":"Spicotatoeprovencale.jfif"},
       {"name": "Grilled Halloumi cheese", "price": "28000", "productImg":"Grilled-Halloumi-4.jpg"},
      
      ]},
      {"name":"On the grill","Products":[
        {"name": "Grilled whole chicken", "price": "38000","productImg":"Grilledchicken.jfif"},
        {"name": "Shish Tawouk", "price": "30000", "productImg":"Shish-Tawook-8-2-500x500.jpg"},
      {"name": "Chicken wings", "price": "26000","productImg":"Baked-Chicken-Wings-3.jpg"},
        {"name": "Shawarma", "price": "27000", "productImg":"Shawarma-Poutine-blog-3.jpg"},
        {"name": "Lamb chops", "price": "48000", "productImg":"1372365446074.jpeg"},
        {"name": "Grilled lamb", "price": "38000", "productImg":"Rosemary-Garlic-Marinated-Lamb-Chops-5.jpg"},
        {"name": "Kafta", "price": "35000","productImg":"Kafta-Kebabs-23.jpg"},
        {"name": "Stuffed kebbeh", "price": "20000", "productImg":"_DSC6387.jpg"},
      ]},
   
      {"name":"Fruits","Products":[
        {"name": "Mixed Fruits", "price": "12000","productImg":"73101569-fresh-fruits-mixed-fruits-background-healthy-eating-dieting-love-fruits.jpg"},
        {"name": "Your choice of 4 fruits", "price": "10000", "productImg":"assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg"},
        {"name": "Your choice of 2 fruits", "price": "8500", "productImg":"assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg"},
        {"name": "Pineapple", "price": "26000","productImg":"PD19-Pineapple-01.jpg"},
        {"name": "Mango", "price": "22000","productImg":"mango-pulp_620x350_61526031033.jpg"},
        {"name": "Watermelon", "price": "7500", "productImg":"Watermelo_slice-e1594407047257-936x1024.jpg"},
    
      ]},
      {"name":"Desserts","Products":[
        {"name": "Ice cream", "price": "17000","productImg":"no-churn-roasted-strawberry-ice-cream-photo.jpg"},
        {"name": "Ashta with honey", "price": "20000", "productImg":"20dc74a10e984c79abdfbba76f1ec42f.jpg"},
        {"name": "Halewet el jeben", "price": "20000", "productImg":"e8d17a77502b979ea7c748ae1694f949.jpg"},
        {"name": "Katayef", "price": "17000","productImg":"atayef-3.jpg"},
        {"name": "Karabij", "price": "18000", "productImg":"unnamed.jpg"},
        {"name": "Osmaliyyeh", "price": "16000", "productImg":"Osmalieh-Kunafa-With-Cream.jpg"},
        {"name": "Mouhalabieh", "price": "16000", "productImg":"asdWW@SWXA.jpg"},

      ]},
  ],
  "restaurantImages":['mounirImage1.png','mounirImage2.png','mounirImage3.png','mounirImage4.png','mounirImage5.png',
'mounirImage6.png'],
  "openTime": "12noon – 12midnight ",
"location": "Broumana",
"KnownFor":"A unique city view surrounded by greenery",
"TelNumber": 9614873900,
    "logoImage":"mounirlogo.png",
    "profileImage":"MounirProfileImage.png",
    "latitude":33.874276828095034,
    "longtitude":  35.60928779783618
  })
  
  const AlSultanIbrahim = new Restaurant({
    "title":"Al Sultan Ibrahim",
    "collections":[
      {"name":"Cold Mezzes","Products":[
        {"name": "Spicy Olives", "price": "7000","productImg":"moroccan_spicy_olives_shutterstock_193054685.jpg"},
        {"name": "Mixed Pickles", "price": "4500", "productImg":"1200px-Mixed_Pickles_(9370-72).jpg"},
        {"name": "Batenjen makdous", "price": "7500", "productImg":"makdous-18.jpg"},
        {"name": "Artichoke", "price": "7500","productImg":"Artichoke.jfif"},
        {"name": "Warak Inab", "price": "8500","productImg":"1371584147751.jpeg"},
        {"name": "Hindbeih bil zeit", "price": "7500", "productImg":"Hinbeh-Bi-Zeit-Lebanese-Chicory-Recipe-Thumbnail-1024x1024.jpg"},
        {"name": "Moutabal Batenjan", "price": "7000", "productImg":"moutabal-batinjan-automatic.jpg"},
        {"name": "Raheb Batenjan", "price": "8000", "productImg":"Batenjen-El Raheb-Recipe.jpg"},
        {"name": "Hommos Al-Sultan", "price": "15000", "productImg":"d9c567402a244ca9929b80093a1777dc.jpg"},
        {"name": "Hommos Akkary", "price": "9500", "productImg":"IMG_6359.JPG"},
        {"name": "Hommos with meat", "price": "15000", "productImg":"Hummus-with-Ground-Beef-4.jpg"},
        {"name": "Hommos with Pines", "price": "15000", "productImg":"Hummus-with-Ground-Lamb-and-Pine-Nuts-a-Middle-Eastern-Specialty.jpg"},
        {"name": "Hommos Awarma", "price": "7000", "productImg":"aIMG_6386fsq-58adb9615f9b58a3c9bf2e5f.jpg"},
        {"name": "Tripoli's Harra", "price": "7000", "productImg":"l15131453.jpg"},
        {"name": "Balila", "price": "12000", "productImg":"balila-recipe-main-photo.jpg"},
        {"name": "Foul Mdammas", "price": "85000", "productImg":"thumbnail_foul.jpg"},
        {"name": "Shanklish", "price": "7000", "productImg":"blog-sala.jpg"},
        {"name": "Batrakh", "price": "42000", "productImg":"batrakh.jpg"},
        {"name": "Botarga Salad", "price": "42000", "productImg":"49576ee1-7b7d-405b-b192-985b546040fd--IMG_1464.jpg"},
     
      ]},
      {"name":"Salads","Products":[
        {"name": "Tabouleh", "price": "12500","productImg":"Tabouleh-Rezept-Klassisch-2020-3.jpg"},
        {"name": "Fatoush", "price": "12500", "productImg":"c38ec748d283bee8dd5da429f4729da1.jpg"},
        {"name": "Oriental Salad", "price": "12500","productImg":"3bd6568c-7b94-4e15-baa3-3de0c336da12--ff66b256-b5f7-4d35-b0bc-07ceddbfbd87.jpg"},
        {"name": "Seasonal Salad", "price": "12500","productImg":"latest-strawberry-salad-hp.jpg"},
        {"name": "Crab Salad", "price": "12500", "productImg":"C3-1024x768.jpg"},
        {"name": "Rocca", "price": "12500", "productImg":"55c30bacd250c49d_Mazaher_-_Rocca_Salad_with_Grilled_Halloumi.jpg"},
        {"name": "Fresh Vegetable Platter", "price": "12500", "productImg":"19e0c1bdac8889638c0814900988eec4.jpg"},
      ]},
      {"name":"Seafood Specialties","Products":[
        {"name": "Samak Ras", "price": "24000","productImg":"IMG_20160829_204408.jpg"},
        {"name": "Breaded Calamari", "price": "24000", "productImg":"calamri.jfif"},
        {"name": "Grilled Calamari", "price": "24000", "productImg":"GrilledCalamari.jfif"},
        {"name": "Fish Makanek", "price": "24000", "productImg":"A60296.jpg"},
        {"name": "Seafood Rolls", "price": "3500","productImg":"Vietnamese-Mayo-Seafood-Spring-Rolls-Nem-hai-san-6.jpg"},
        {"name": "Crab Rolls", "price": "3500", "productImg":"downloaasdaAAd.jfif"},
        {"name": "Fish Kibbeh", "price": "3500", "productImg":"kibbeh-31877-1.jpeg"},
     ]},
     {"name":"Hot Mezzes Specialties","Products":[
      {"name": "Frensh Fries", "price": "6500","productImg":"051044-french-fries-thumb1x1.jpg"},
      {"name": "Potatoes with Summak", "price": "8000", "productImg":"roasted-sumac-potatoes.jpg"},
      {"name": "Spicy Potatoes a la provencale", "price": "8000", "productImg":"Spncale.jfif"},
      {"name": "Grilled Potato", "price": "6500","productImg":"delish-grilled-potatoes-jpg-1526061594.jpg"},
      {"name": "Cheese Rolls", "price": "2000","productImg":"mozzarella-cheese-rolls-recipe-main-photo.jpg"},
    ]},
    {"name":"Shrimps Selection","Products":[
      {"name": "Shrimps a la Jillo", "price": "45000","productImg":"ShrimpJillo.jfif"},
      {"name": "Creamy Loza Gambas", "price": "35000", "productImg":"Vertical-Closer-Low-Angle-Gallery-f5.6-111.jpg"},
      {"name": "Breaded Shrimps", "price": "35000", "productImg":"delish-keto-breaded-shrimp-still002-1532006293.jpg"},
      {"name": "Tempura Shrimps", "price": "35000","productImg":"105124-9023-mx.jpg"},
    ]},
  ],
  "restaurantImages":['sultanIbrahimImage1.png',
  'sultanIbrahimImage2.png','sultanIbrahimImage3.png','sultanIbrahimImage4.png',
'sultanIbrahimImage5.png','sultanIbrahimImage6.png'],
  "openTime": "12noon – 12midnight ",
"location": "Antelias",
"TelNumber": 9614414474,
"KnownFor":"An upscale Lebanese fish restaurant, which has been operating for over 40 years",
    "logoImage":"sultanIbrahimlogo.jfif",
    "profileImage":"sultanIbrahimProfileImage.png",
    "latitude":33.90129184976733,
    "longtitude": 35.505077913183406

  })
  const Admin = new user({
    name: "admin",
    email: "admin@tasty.com",
    password: "admin123",
    role: 1
  })
  const MhanaSurMerOutTables = new tablesNumber({
    restaurantName:"Mhana Sur Mer",
    image: "MhanaOut.png",
    description: "Out door",
    numberOfTables: [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  })
  const MhanaSurMerInTables = new tablesNumber({
    restaurantName:"Mhana Sur Mer",
    image: "MhanaIn.png",
    description: "In door",
    numberOfTables: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  })
  const MounirInTables = new tablesNumber({
    restaurantName:"Mounir",
    image: "MounirIn.PNG",
    description: "In door",
    numberOfTables: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  })
  const MounirOutTables = new tablesNumber({
    restaurantName:"Mounir",
    image: "MounirOuter.png",
    description: "Out door",
    numberOfTables: [16,17,18,19,20,21,22,23,24]
  })
  const AlSultanIbrahimOutTables = new tablesNumber({
    restaurantName:"Al Sultan Ibrahim",
    image: "SultanIbrahimOut.PNG",
    description: "Out door",
    numberOfTables: [17,18,19,20,21,22,23,24,25,26,27,28,29]
  })
  const AlSultanIbrahimInTables = new tablesNumber({
    restaurantName:"Al Sultan Ibrahim",
    image: "SultanIbrahimIn.PNG",
    description: "In door",
    numberOfTables: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  })

  const DiscountCode = new discountCode({
    Code: "SINX64SD",
    Pourcentage: 15,
    PaymentId: 1
  })
  const DiscountCode2 = new discountCode({
    Code: "XTGHRCB",
    Pourcentage: 20,
    PaymentId: 2
  })
  const DiscountCode3 = new discountCode({
    Code: "JNGRRSQU",
    Pourcentage: 25,
    PaymentId: 3
  })
  exports.Admin = Admin;
  exports.MhanaSurMer = MhanaSurMer;
  exports.Mounir = Mounir;
  exports.AlSultanIbrahim = AlSultanIbrahim;
  exports.DiscountCode = DiscountCode;
  exports.DiscountCode2 = DiscountCode2;
  exports.DiscountCode3 = DiscountCode3;
  exports.MhanaSurMerInTables = MhanaSurMerInTables;
  exports.MhanaSurMerOutTables = MhanaSurMerOutTables;
  exports.MounirInTables = MounirInTables;
  exports.MounirOutTables = MounirOutTables;
  exports.AlSultanIbrahimInTables = AlSultanIbrahimInTables;
  exports.AlSultanIbrahimOutTables = AlSultanIbrahimOutTables;