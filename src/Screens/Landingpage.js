import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import RestaurantsAvailable from "./RestaurantsAvailable";
import { useDispatch } from "react-redux";
import { sendSubscriptionCodeToUser } from "../actions/actions";
import "../Styles/landingpage.css";
import { checkIfUserIsSubscribed } from "../actions/actions";
import { AuthContext } from "../configurations/auth-context";
import GMap from "../Components/GMap";
import LeftSidebar from "../Components/LeftSidebar";
import { usersActions } from "../redux/actions/users";
import Select from "react-select";
import { loadGoogleMapScript } from "../configurations/GoogleMap";
import { SubscribptionData, WeLoveFeedback, WhatWeOffer } from "../configurations/Constants";
import {useFormik} from 'formik';
import * as Yup from 'yup' 
import { Link } from "react-router-dom";
const Landingpage = () => {
  var [subscriptionEmail, setSubscriptionEmail] = useState(null);
  var [subscriptionName, setSubscriptionName] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [show, setShow] = useState(false);
  const [loadMap, setLoadMap] = useState(false);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: ""
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Required"),
        email: Yup.string()
        .required("Required"),
        description: Yup.string()
        .required("Required")
    }),
    async onSubmit(data) {
      dispatch(
        usersActions.addFeedback({
          userId: auth.userId,
          review: data.description,
          fullName: data.name,
          email: data.email,
        })
      );
      alert("We Thank you for your support!");
    }
  });
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  const handleChange = (e) => {
    setSelectedOption(e);
  };

  useEffect(() => {
    if (
      localStorage.getItem("email") != null &&
      localStorage.getItem("email") != undefined
    ) {
      (async () => {
        var checkUserIfSubscribed = await checkIfUserIsSubscribed(
          localStorage.getItem("email")
        ).then((result) => {
          if (!result) {
            setTimeout(() => {
              //  handleShow()
            }, 5000);
          }
        });
      })();
    }
  }, []);
  const subcribe = async () => {
    if (
      subscriptionName === null ||
      selectedOption === null ||
      subscriptionEmail === null
    ) {
      alert("Fields Missing");
      return "";
    }
    await sendSubscriptionCodeToUser({
      subscriptionName: subscriptionName,
      paymentId: selectedOption.paymentId,
      subscriptionEmail: subscriptionEmail,
    });
    handleClose();
  };
  return (
    <div>
      <LeftSidebar />
      <img
        src={`http://localhost:5000/uploads/images/slider-img-1.jpg`}
        style={{ height: "100%" }}
      ></img>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            className="logo"
            style={{ fontSize: "50px", color: "black", fontWeight: "bold" }}
          >
            {" "}
            Tasty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="logo"
          style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
        >
          {" "}
          Subscribe to benefit from the sales
        </Modal.Body>
        <Modal.Body>
          <input
            className="form-control"
            placeholder="Enter your name"
            onChange={(val) => setSubscriptionName(val.target.value)}
          ></input>
          <input
            className="form-control"
            placeholder="Enter your email"
            onChange={(val) => setSubscriptionEmail(val.target.value)}
          ></input>
          <Select
            placeholder="Select Payment Option"
            value={selectedOption}
            options={SubscribptionData}
            onChange={handleChange}
          />
        </Modal.Body>

        <Modal.Body>
          <button className="btn btn-primary" onClick={subcribe}>
            Subscribe
          </button>
        </Modal.Body>
      </Modal>

      <RestaurantsAvailable></RestaurantsAvailable>

      <div className="section-header">
        <h2 className="section-title text-center wow fadeInDown">Locations</h2>
      </div>
      <div className="App wow fadeInDown">
        {!loadMap ? <div>Loading...</div> : <GMap />}
      </div>
      <section id="services">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`http://localhost:5000/uploads/images/WhatWeoffer.PNG`}
                height="450"
              ></img>
            </div>
            <div className="col-md-6">
              <div className="section-header">
                <h1 className="section-title text-center wow fadeInDown">
                  What We Offer
                </h1>
                <p
                  className="text-center wow fadeInDown"
                  style={{ fontSize: "20px" }}
                >
                 {WhatWeOffer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="section-wrapper contact-section"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="">
            <div className="contact-details">
              <div className="contact-form wow bounceInRight">
                  <form className="baseForm" onSubmit={formik.handleSubmit} >
                  <div className="col-md-12 col-sm-12 col-xs-12 section-header wow fadeInDown">
                      <h2>
                        <span className="highlight-text">Contact Us</span>
                      </h2>

                      <p className="col-md-12 col-sm-10 col-xs-12 col-md-offset-2 col-sm-offset-1">
                        {WeLoveFeedback}
                      </p>
                    </div>{" "}
                    <div className="row">
                      <div className="col-md-6">
            <input type="text" placeholder="Full Name" name="name" id="name" className="email formField form-control"
              value={formik.values.name}  onChange={formik.handleChange}
              />
                  {formik.errors.name && formik.touched.name && (
            <p style={{color:"red"}}>Please enter your name</p>
          )}</div><div className="col-md-6">
  <input type="email" name="email" placeholder="Email" id="email"  className="form-control email formField"
              value={formik.values.email}  onChange={formik.handleChange} 
              />
                   {formik.errors.email && formik.touched.email && (
            <p style={{color:"red"}}> Please enter your email</p>
          )}
          </div>
               
              
               <textarea  rows="10"
                          cols="100" type="text" name="description" placeholder="your comments..." id="description"  className="form-control email formField"
              value={formik.values.description}  onChange={formik.handleChange} 
              />
                   {formik.errors.description && formik.touched.description && (
          <p style={{color:"red"}}> Please enter your comment</p>
          )}
                 <button className="btn btn-primary" type="submit">Submit</button>
                 </div>
        </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ textAlign: "center", padding: "25px" }}>
        <Link
          to="privacypolicy"
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            color: "gray",
          }}
        >
          Privacy & Policy
        </Link>
      </div>
    </div>
  );
};

export default Landingpage;
