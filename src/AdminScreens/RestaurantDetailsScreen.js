import React, { useEffect, useState, useRef } from "react";
import "../Styles/LeftSidebar.css";
import { getRestaurant, updateImage, updateRestaurant } from "../actions/actions";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../Styles/Restaurants.css'
import {useFormik} from 'formik';
const RestaurantDetailsScreen = () => {
  const [loadedRestaurant, setRestaurant] = useState();
  const restaurantId = useParams().id;
  const filePickerRef = useRef();

  const formik = useFormik({
    initialValues: {
      title: "",
      location: "",
      KnownFor:"",
      openTime:"",
      TelNumber:"",
      profileImage: "",
      logoImage:""
    },
    async onSubmit() {
      try {
        await updateRestaurant({
          "pid":restaurantId,
          "location":formik.values.location,
          "KnownFor":formik.values.KnownFor,
          "openTime":formik.values.openTime,
          "TelNumber":formik.values.TelNumber
        },restaurantId).then(x=>{
        });
      } catch (error) {
      }
    }
  });

  useEffect(() => {
    const retrieveRestaurant = async () => {
      await getRestaurant(restaurantId).then((x) => {
        setRestaurant(x.restaurant);
        formik.setValues({
          title:x.restaurant.title,
          location:x.restaurant.location,
          KnownFor:x.restaurant.KnownFor,
          openTime:x.restaurant.openTime,
          TelNumber:x.restaurant.TelNumber,
          profileImage: x.restaurant.profileImage,
          logoImage: x.restaurant.logoImage
        })
      });
    };
    retrieveRestaurant();
  }, []);
  const [file, setFile] = useState();
  const [logofile, setlogoFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [previewlogoUrl, setPreviewlogoUrl] = useState();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  useEffect(() => {
    if (!logofile) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewlogoUrl(fileReader.result);
    };
    fileReader.readAsDataURL(logofile);
  }, [logofile]);
  const pickedHandler = async event => {
    let pickedFile;
   
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      let formData = new FormData();
      formData.append('pid', restaurantId);
      if(event.target.id == "profileimage"){
      setFile(pickedFile);
      formData.append('image', "profile");
      } else {
        setlogoFile(pickedFile)
        formData.append('image', "logo");
      }
      formData.append('image',pickedFile);
      await updateImage(formData,restaurantId)
    } else {
    }
  };
  return (
<React.Fragment>
      {loadedRestaurant && (
        <div className="restaurantdetails">
         
            <form    className="baseForm" onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <p className="labels">Profile Image</p>
                <div  style={{display:"inline-block"}}>
          {previewUrl && <img style={{ width: "300px", height: "350px" }} src={previewUrl} alt="Preview" />}
          {!previewUrl &&  <img
              style={{ width: "300px", height: "350px" }}
              src={`http://localhost:5000/uploads/images/${formik.values.profileImage}`}
            ></img>}
        </div>
               <input
               id="profileimage"
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
                </div>
                <div className="col-md-6">
                <div  style={{display:"inline-block"}}>
                  <p className="labels">Logo Image</p>
          {previewlogoUrl && <img style={{ width: "300px", height: "350px" }} src={previewlogoUrl} alt="Preview" />}
          {!previewlogoUrl &&  <img
              style={{ width: "300px", height: "350px" }}
              src={`http://localhost:5000/uploads/images/${formik.values.logoImage}`}
            ></img>}
        </div>
               <input
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
                </div>
              </div>
           
     
          <div className="row">
            <div className="col-md-5">
              <h3>{formik.values.title}</h3>
              <Link to={`/restaurant/${loadedRestaurant.id}/menu`} style={{marginRight:"10px"}}>
                <button className="btn btn-dark" >View Menu</button>
              </Link>
              <Link to={`/restaurant/${loadedRestaurant.id}/photos`}>
              <button className="btn btn-dark" >View Photos</button>
              </Link>
            </div>
            
           
          </div>
            <p className="labels">
              Location: 
            </p>
            <input type="text" placeholder="Location" name="location" id="location" className="form-control"
              value={formik.values.location}  onChange={formik.handleChange}
              />
            <p className="labels">
              Description: 
            </p>
            <input type="text" placeholder="Known for" name="KnownFor" id="KnownFor" className="form-control"
              value={formik.values.KnownFor}  onChange={formik.handleChange}
              />
            <p className="labels">
             Open Time:
            </p>
            <input type="text" placeholder="Time open" name="openTime" id="openTime" className="form-control"
              value={formik.values.openTime}  onChange={formik.handleChange}
              />
            <p className="labels">
             Telephone number:
            </p>
            <input type="number" placeholder="Telephone Number" name="TelNumber" id="TelNumber" className="form-control"
              value={formik.values.TelNumber}  onChange={formik.handleChange}
              />
                <button style={{marginTop:"10px",padding:" 10px 25px"}} className="btn btn-info" type="submit"  >Update</button>
              </form>
      
        </div>
      )}
</React.Fragment>
  );
};
export default RestaurantDetailsScreen;
