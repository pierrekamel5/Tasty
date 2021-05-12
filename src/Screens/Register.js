import React from 'react';
import Card from '../Components/Shared/Card/Card';
import Button from '../Components/Shared/Button/Button';
import '../Styles/Auth.css';
import { useDispatch } from 'react-redux';
import { usersActions } from '../redux/actions/users';
import {  useHistory } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup' 

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName:"",
      lastName:"",
      phoneNumber:"",
      Address:"",
      email: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(6, "Must be more than 6 characters")
        .required("Required")
    }),
    async onSubmit(data) {
         dispatch(usersActions.registerUser({
           name:data.firstName,
         email:data.email,
         password:data.password}));

         alert("Account Registered Successfull!")
         history.push('/auth');
    }
  });

  return (
    <React.Fragment>
        <div style={{padding:"65px"}}></div>
      <Card className="authentication">
        <span>
        <i style={{float:"left",fontSize:"25px",padding:"15px",letterSpacing:"6px"}}
          className="pi pi-arrow-left p-mr-2 backicon" onClick={() => history.goBack()}></i>
             <h2 >Register</h2>
        </span>
      
     
        <hr />
        <form className="baseForm" onSubmit={formik.handleSubmit} >
            <input type="text" placeholder="First Name" name="firstName" id="firstName" className="email formField form-control"
              value={formik.values.firstName}  onChange={formik.handleChange}
              />
                 <input type="text" name="lastName" placeholder="Last Name" id="lastName"  className="form-control email formField"
              value={formik.values.lastName}  onChange={formik.handleChange} 
              />

              <input type="number" placeholder="Phone Number"  name="phoneNumber" 
              id="phoneNumber" className="email formField form-control"
              value={formik.values.phoneNumber}  onChange={formik.handleChange}
              />
                 <input type="text" name="address" id="address" placeholder="Address"  className="form-control email formField"
              value={formik.values.address}  onChange={formik.handleChange} 
              />

             <input type="email" name="email" id="email" placeholder="Email" className="email formField form-control"
              value={formik.values.email}  onChange={formik.handleChange}
              />
                  {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
                 <input type="password" name="password" id="passowrd" placeholder="Password"  className="form-control email formField"
              value={formik.values.password}  onChange={formik.handleChange} 
              />
                   {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
               <Button type="submit" >Submit
          </Button>
        </form>
      </Card>
      <div style={{padding:"85px"}}></div>
     
    </React.Fragment>
  );
};

export default Register;
