import React, { useState,  useContext } from 'react';
import { getUsers, signUp } from '../actions/actions';
import Card from '../Components/Shared/Card/Card';
import Button from '../Components/Shared/Button/Button';
import '../Styles/Auth.css';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useStore } from 'react-redux';
import { usersActions } from '../redux/actions/users';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../configurations/auth-context';
import PubSub from 'pubsub-js'
import {useFormik} from 'formik';
import * as Yup from 'yup' 

const Login = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [role, setRole]=useState(2);
  const store = useStore();
  const history = useHistory();
    
  const formik = useFormik({
    initialValues: {
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
      if(data.email == "admin@tasty.com"){
        setRole(1)
        localStorage.setItem("role","1")
       } else {
         setRole(2)
        localStorage.setItem("role","2")
       }
       PubSub.publish("userrole",role)
        await  dispatch(usersActions.login_User({email:data.email, password:data.password}))
          if(store.getState().userLoginReducer.isLoggedIn === true){
            auth.login(store.getState().userLoginReducer.userInfo.payload.user.id)
           localStorage.setItem("user",store.getState().userLoginReducer.userInfo.payload.user.id)
           localStorage.setItem('email',data.email )
           history.push('/')
          } else {
            alert("Wrong Username or Password")
          }
    }
  });

  const responseGoogle = async (response) => {
    await getUsers().then(res => {

   const findUser =   res.data.users.find(el => el.email === response.profileObj.email )
  if(findUser === undefined){
   const signUpgoogleUser = async () => {
      try{
        const signUser = await signUp({
          name: response.profileObj.name,
          email: response.profileObj.email,
          password: ( Math.floor(Math.random() * 10000 * 10000).toString())
        })
        auth.login(signUser.user.id)
        localStorage.setItem('email',signUser.user.email )
        auth.email(signUser.user.email)
        localStorage.setItem('user', signUser.user.id);
      } catch (err) {
        alert("Wrong Username or Password");
      }
     
    }
    signUpgoogleUser();
  } else {
    auth.login(findUser.id)
    localStorage.setItem('email',findUser.email )
    localStorage.setItem('user',findUser.id)
  }
 })
    
  }
 const handleLogoutFailure = () => {
    alert('Failed to log out')
    
  }

  return (
    <React.Fragment>
        <div style={{padding:"65px"}}></div>
      <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form className="baseForm" onSubmit={formik.handleSubmit} >
            <input type="email" placeholder="Email" name="email" id="email" className="email formField form-control"
              value={formik.values.email}  onChange={formik.handleChange}
              />
                  {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
                 <input type="password" name="password" placeholder="Password" id="passowrd"  className="form-control email formField"
              value={formik.values.password}  onChange={formik.handleChange} 
              />
                   {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
               <Button type="submit" >Submit
          </Button>
        </form>
        <p>Don't Have An Account? 
          <Link to="/register" style={{color:"blue"}}> Register
          </Link>
        </p>
        <div style={{marginTop:"25px"}}>
        <GoogleLogin
          clientId="429530707904-8mmug3cbgg971qdmq6p4el5jnk75oh28.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={handleLogoutFailure}
          cookiePolicy={'single_host_origin'}
         className="googleLoginButton"
        />,
      </div>
      </Card>
      <div style={{padding:"85px"}}></div>
     
    </React.Fragment>
  );
};

export default Login;
