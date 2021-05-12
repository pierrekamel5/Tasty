import React, { useEffect,useState, useRef } from 'react';
import "../Styles/Restaurants.css";
import { addRestaurantPhoto, getRestaurant, updateRestaurantPhoto } from '../actions/actions';
import { useParams } from "react-router-dom";
const RestaurantPhotosScreen = () => {
  const [loadedRestaurant, setLoadedRestaurant] = useState();
  const restaurantId = useParams().id;
  const filePickerRef = useRef();
  const [file, setFile] = useState();

  useEffect(() => {
    const retrieveRestaurant = async () => {
      await getRestaurant(restaurantId).then((x) => {
        setLoadedRestaurant(x.restaurant);
      });
    };
    retrieveRestaurant();
  }, [loadedRestaurant]); 

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = async (event,index = -1) => {
    let pickedFile;
   
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
       setFile(pickedFile);
       let formData = new FormData();
       formData.append('pid', restaurantId);
       formData.append('image',pickedFile);
       if(index == -1){
           await addRestaurantPhoto(formData)
           setFile(null)
       } else {
        formData.append('index', index)
        await updateRestaurantPhoto(formData)
       }
    
    }
  };
  return (
    <React.Fragment>

    <div style={{padding:"75px", backgroundImage:"url('https://www.xmple.com/wallpaper/blue-gradient-white-linear-1920x1080-c2-fffaf0-add8e6-a-150-f-14.svg')",
              backgroundSize:"cover"}} >
             {loadedRestaurant && loadedRestaurant.restaurantImages.length < 6 &&
              <div style={{textAlign:"right",marginTop:"15px"}}>
              <input
               id="image"
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={(e) => pickedHandler(e)}
      />
              </div> }    
   
    {loadedRestaurant &&  <div key={loadedRestaurant.id} className="container">
      
      
  
        <div className="row " style={{margin:"35px",}}>
          {loadedRestaurant.restaurantImages.map((x,index) =>(
              <div key={index} className="col-md-6" style={{padding:0}}>
              
           <img
            style={{width:"100%",height:"300px"}}
            src={`http://localhost:5000/uploads/images/${x}`}
            ></img>
   <input
               id="image"
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={(e) => pickedHandler(e,index)}
      />
              </div>
        ))}
        
      </div>
       </div>
    }
    </div>
    
  </React.Fragment>
  );
};

export default RestaurantPhotosScreen;

