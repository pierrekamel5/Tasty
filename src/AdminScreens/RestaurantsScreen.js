import React, { useEffect, useState, useRef } from 'react';
import { createRestaurant, getRestaurants, deleteRestaurant } from '../actions/actions'
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import '../Styles/Restaurants.css';
import Card from '../Components/Shared/Card/Card';
import { Link } from 'react-router-dom';
import { loadGoogleMapScript } from '../configurations/GoogleMap';
import GMap from "../Components/GMap";
import PubSub from 'pubsub-js'
 const RestaurantsScreen = () => {
  const [loadedRestaurants, setRestaurants] = useState();
  const [show, setShow] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();
  const [file, setFile] = useState();
  const filePickerRef = useRef();
  const formik = useFormik({
    initialValues: {
      title:"", openTime:"",location:"", TelNumber:"", KnownFor:"",latitude:"",longtitude:""
    },
  });

  const handleModal = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false);
  };

  const [loadMap, setLoadMap] = useState(false);
  var mySubscriber = function (msg, data) {
    formik.setValues({
      latitude:data.lat(),
      longtitude:data.lng()
    })
};
 useEffect(() => {
  PubSub.subscribe('RestaurantPosition', mySubscriber);
 const retrieveRestaurants = async () => {
   await getRestaurants().then(res => {
    setRestaurants(res.data.restaurant);
    });
  }

  retrieveRestaurants();
 }, [loadedRestaurants]) 

 useEffect(() => {
  loadGoogleMapScript(() => {
    setLoadMap(true);
  });
}, []);

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

 const addRestaurant = async () => {
   if(file == undefined){
     alert("Add Restaurant Image")
   } else {
    let formData = new FormData();
    formData.append("title", formik.values.title);
    formData.append("openTime", formik.values.openTime);
    formData.append("location", formik.values.location);
    formData.append("TelNumber", formik.values.TelNumber);
    formData.append("KnownFor", formik.values.KnownFor);
    formData.append("latitude", formik.values.latitude);
    formData.append("longtitude", formik.values.longtitude);
    formData.append("image", file);
    await createRestaurant(formData)
    setShow(false)
   }
 
 }

 const pickedHandler = async (event) => {
  let pickedFile;

  if (event.target.files && event.target.files.length === 1) {
    pickedFile = event.target.files[0];

    setFile(pickedFile);
  } else {
  }
};
  return (
    <React.Fragment>
        <button className="btn btn-success" style={{position:"absolute",top:"20%",right:"2%"}}
        onClick={handleModal}>Add Restaurant</button>
      { loadedRestaurants && <RestaurantsList items={loadedRestaurants} />}
      <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton> Add Restaurant</Modal.Header>
<Modal.Body>
  <h4>Restaurant Image</h4>
  {previewUrl && (
    <img
      style={{ width: "300px", height: "350px" }}
      src={previewUrl}
      alt="Preview"
    />
  )}
  <input
    id="image"
    ref={filePickerRef}
    type="file"
    accept=".jpg,.png,.jpeg"
    onChange={pickedHandler}
  />
</Modal.Body>
<Modal.Body>
  <input
    type="text"
    name="title"
    placeholder="Title"
    id="title"
    className="form-control"
    value={formik.values.title}
    onChange={formik.handleChange}
    style={{ margin: "15px" }}
  />
  <input
    type="text"
    name="openTime"
    placeholder="Open Time"
    id="openTime"
    className="form-control"
    value={formik.values.openTime}
    onChange={formik.handleChange}
    style={{ margin: "15px" }}
  />
    <input
    type="text"
    name="location"
    placeholder="Location"
    id="location"
    className="form-control"
    value={formik.values.location}
    onChange={formik.handleChange}
    style={{ margin: "15px" }}
  />
    <input
    type="text"
    name="TelNumber"
    placeholder="Phone Number"
    id="TelNumber"
    className="form-control"
    value={formik.values.TelNumber}
    onChange={formik.handleChange}
    style={{ margin: "15px" }}
  />
    <input
    type="text"
    name="KnownFor"
    placeholder="Known For"
    id="KnownFor"
    className="form-control"
    value={formik.values.KnownFor}
    onChange={formik.handleChange}
    style={{ margin: "15px" }}
  />
   <div className="App wow fadeInDown">
        {!loadMap ? <div>Loading...</div> : <GMap />}
      </div>
    <button
      className="btn btn-info"
      style={{ margin: "15px" }}
      onClick={() => addRestaurant()}
    >
      Add Restaurant
    </button>
</Modal.Body>
</Modal>
    </React.Fragment>
  );
};
export default RestaurantsScreen;
const RestaurantsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No restaurants found.</h2>
        </Card>
      </div>
    );
  }
  const deleteRes = async (restaurantId) => {
   await deleteRestaurant(restaurantId)
  }
  return (
    <div>
     
   <ul className="users-list" >
      
        <div className="row">
        
      {props.items.map(restaurant => (
        <div key={restaurant.id} className="col-md-4 wow fadeInDown" style={{padding:"25px"}}>
         
  <div  className="card-banner card-custom">
              <Link to={`/restaurant/${restaurant.id}`}>
                <div
                  className="row"
                >
                  <div className="col-md-12">
                    <img style={{height:"300px",width:"100%"}}
                    src={`http://localhost:5000/uploads/images/${restaurant.logoImage}`}
                    ></img>
                  </div>
                </div>
              </Link>
              <i              onClick={()=>deleteRes(restaurant.id)}
                              style={{ fontWeight: "bold", fontSize: "16px", position:"absolute",top:"5px",right:0 }}
                              className="pi pi-times deleteicon"
                            ></i>
            </div>
      </div>
      
             
      ))}
        </div>
    </ul>
   
    </div>
 
  );
};
