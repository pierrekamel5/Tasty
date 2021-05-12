
import React, { useEffect,useState } from 'react';
//import { getFeedbacks, getReservations } from '../actions/actions';
import '../Styles/feedback.css';
import { Link } from 'react-router-dom';
// import Charts from './Charts';
// import { Chart } from 'react-charts'
import { useDispatch, useStore } from 'react-redux';
import { usersActions } from '../redux/actions/users';
const Feedback = () => {
    const [loadedFeedbacks, setLoadedFeedbacks] = useState();
    const [loadedReservations, setLoadedReservation] = useState();
    var myarray = [];
    const store = useStore();
    const dispatch = useDispatch()
        useEffect(() => {
     (async () => {
        await dispatch(usersActions.getFeedbacks())
        store.getState().getFeedbackReducter.users.Reviews.map(x => {
          if(x != null){
            x.map(y => {
              myarray.push(y)
            })
          }
          setLoadedFeedbacks(myarray)
        })
        })()
      }, []) 
      const MhanaSurMer = [];
      const AlSultanIbrahim = [];
      const Mounir = [];
      useEffect(() => {
  
        const getallReservations = async () => {
          await dispatch(usersActions.getReservations());
          setLoadedReservation(store.getState().getReservationsReducer.users.data.reservation)
          store.getState().getReservationsReducer.users.data.reservation.map(x => {
              if(x.marketName === "Mhana Sur Mer"){
                MhanaSurMer.push(x);
              } else if(x.marketName === "Al Sultan Ibrahim"){
                AlSultanIbrahim.push(x);
              } else if(x.marketName === "Mounir"){
                Mounir.push(x);
              } 
            })
            localStorage.setItem("MhanaSurMer",MhanaSurMer.length)
            localStorage.setItem("AlSultanIbrahim",AlSultanIbrahim.length)
            localStorage.setItem("Mounir",Mounir.length)
        };
        getallReservations();
      }, []);

      const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
      const tooltip = React.useMemo(
        () => ({
          render: () => {
            return <div style={{padding:"15px",fontWeight:"bold",letterSpacing:"2px"}}>Hello</div> 
          }
        }),
        []
      )
        return (
            <React.Fragment >
           <div  style={{
              backgroundImage:"url('https://oliverdesign.es/wp-content/uploads/2014/12/fondo-oliverdesign.jpg')",
              backgroundSize:"cover"}}>
             

            <div style={{paddingTop:"85px"}}></div>
          
            <div className="row wow fadeInDown" style={{padding:"15px"}}>
              <div className="col-md-12 text-center">
              <Link  to={`/feedbacks/reviewus`}>
                <button className="btn btn-primary ">Check your feedbacks</button>
                </Link>
              </div>
            </div>
               {loadedFeedbacks &&
     
     <div className="container" >
            <div className="row" >
             
                    {loadedFeedbacks.map(x=> {
                        return (<div className="container myfeedback" key={x.id} style={{padding:"25px",backgroundColor:"white"}}><div className="row"    > 
                        <div className="col-lg-6 col-md-6"  >
                          <div  style={{padding:"15px"}}>
                              <div className="row">
                                <div className="col-md-6 col-lg-5 col-xl-5">
                                  <div className="overlay z-depth-1 rounded mb-3 mb-md-0">
                                    {x.fullName}
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-7 col-xl-7">
                                        <h5 className="feedbackdescription">{x.description}</h5>
                                </div>
                              </div>
                          </div>
                    </div>
                    </div>
                    </div>)
           
           } )}
           {loadedFeedbacks.length === 0 &&    <div  className="col-md-12 col-sm-12 col-xs-12 section-header wow fadeInDown">
                    <h2><span className="highlight-text" style={{fontSize:"19px"}}>No feedbacks yet in the website </span></h2>
                   
                </div>}
                {/* <div className="col-md-6" >
                  <div style={{marginLeft:"45px",marginTop:"20px"}}>
                  <h5 >Numbers of reservation from our site!</h5>
                  </div>
                  <div style={{marginTop:"20px"}}>
                 
                  {!isLoading && loadedReservations && 
                   <Charts   axes={axes} tooltip={tooltip}></Charts>}
                  </div>
                 
              
               
                
                </div> */}
            </div></div>
           }
           <div style={{paddingBottom:"400px"}}></div>
           </div>
          </React.Fragment>
        );
    
}

export default Feedback;

// we are retreiving all the feedback through user id