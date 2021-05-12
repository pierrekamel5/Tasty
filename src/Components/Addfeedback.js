import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../configurations/auth-context";
import "../Styles/feedback.css";
import { useDispatch, useStore } from "react-redux";
import { usersActions } from "../redux/actions/users";
function Addfeedback() {
  const auth = useContext(AuthContext);
  const [myloadedFeedbacks, setLoadedFeedback] = useState();
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    const fetchComments = async () => {
      await dispatch(
        usersActions.getFeedbackByUserId(localStorage.getItem("user"))
      );
      setLoadedFeedback(
        store.getState().getFeedbackByUserId.userInfo.payload.data.Reviews
      );
    };
    fetchComments();
  }, []);

  const removeFeedback = (cart) => {
    try {
      dispatch(
        usersActions.removeFeedback({
          userId: auth.userId,
          commentId: cart.id,
        })
      );
      const newList = myloadedFeedbacks.filter((x) => x.id != cart.id);
      setLoadedFeedback(newList);
    } catch {}
  };
  return (
    <div>
      <div style={{ paddingTop: "95px" }}></div>
      <div style={{ padding: "40px" }}>
        <h2
          className="section-title text-center wow fadeInDown"
          style={{ color: "black" }}
        >
          Your reviews
        </h2>
        {myloadedFeedbacks && myloadedFeedbacks.length === 0 && (
          <h4
            className="section-title text-center wow fadeInDown"
            style={{ color: "gray" }}
          >
            No Reviews
          </h4>
        )}
        {myloadedFeedbacks &&
          myloadedFeedbacks.length > 0 &&
          myloadedFeedbacks.map((feedbacks) => {
            return (
              <div className="container myfeedback" key={feedbacks.id}>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="mb-12" style={{ padding: "15px" }}>
                      <div className="row">
                        <div className="col-md-4 col-lg-3 col-xl-3">
                          <div className="overlay z-depth-1 rounded mb-3 mb-md-0">
                            <img
                              src="https://www.staffsprep.com/software/flat_faces_icons/png/flat_faces_icons_circle/flat-faces-icons-circle-3.png"
                              alt="Sample"
                              style={{ height: "60px", width: "70px" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-8 col-lg-9 col-xl-9">
                          <h5 className="feedbackdescription">
                            {feedbacks.description}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFeedback(feedbacks)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div style={{ padding: "100px" }}></div>
      <div className="support">We Appreciate your support for us!</div>
    </div>
  );
}

export default Addfeedback;
