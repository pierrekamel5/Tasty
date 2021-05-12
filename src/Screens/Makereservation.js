import React, { Component, useEffect, useState, useContext } from "react";
import { AuthContext } from "../configurations/auth-context";
import Button from "../Components/Shared/Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "react-bootstrap";
import "../Styles/Makereservation.css";
import { usersActions } from "../redux/actions/users";
import { marketsActions } from "../redux/actions/markets";
import { useDispatch, useStore } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
const Makereservation = () => {
  const auth = useContext(AuthContext);
  const [ReservationDate, setReservationDate] = useState(new Date());
  const [tablePosition, setTablePosition] = useState();
  const [showTables, setShowTables] = useState(false);
  const [loadedMarkets, setLoadedMarkets] = useState();
  const [loadedReservations, setLoadedReservations] = useState();
  const [numberOfTables, setNumberOfTables] = useState();

  const formik = useFormik({
    initialValues: {
      reservedBy: "",
      marketName: "",
      numberOfPeople: "",
      otherComments: "",
      tableNumber: "",
    },
    validationSchema: Yup.object().shape({
      reservedBy: Yup.string().required("Required"),
      marketName: Yup.string().required("Required"),
      numberOfPeople: Yup.string().required("Required"),
      tableNumber: Yup.string().required("Required")
    }),
    async onSubmit(data) {
      dispatch(
        usersActions.makereservation({
          userId: auth.userId,
          reservedBy: data.reservedBy,
          marketName: data.marketName,
          reservationDate: ReservationDate,
          numberOfPeople: data.numberOfPeople,
          otherComments: data.otherComments,
          tableNumber: data.tableNumber,
          email: localStorage.getItem("email"),
        })
      );
    },
  });

  var myarray = [];

  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    const retrieveMarkets = async () => {
      await dispatch(marketsActions.getRestaurants());
      store
        .getState()
        .marketsReducer.RestaurantsAvailable.payload.data.data.restaurant.map(
          (x) => {
            myarray.push(x.title);
          }
        );
      setLoadedMarkets(myarray);
    };
    retrieveMarkets();
  }, []);

  useEffect(() => {
    const getAllReservations = async () => {
      await dispatch(
        usersActions.getReservationById(localStorage.getItem("user"))
      );
      setLoadedReservations(
        store.getState().getReservationByUserIdReducer.userInfo.payload.data
          .reservation
      );
    };
    getAllReservations();
  }, []);

  const handleChange = async (e) => {
    var SelectedMarket = e.target.value;

    await dispatch(marketsActions.getNumberOfTables(SelectedMarket));

    formik.values.marketName = SelectedMarket;
    setNumberOfTables(
      store.getState().numberOfTablesReducer.NumberOfTables.payload.data
        .NumberOfTables
    );
  };

  const handleTableNumberChange = async (e) => {
    formik.values.tableNumber = e.target.value;
  };

  const reservationTable = [
    { title: "Restaurant Name" },
    { title: "Reserved By" },
    { title: "Nb of People" },
    { title: "Date of reservation" },
    { title: "Other comments" },
  ];
  return (
    <div className="reservationPage ">
      <div style={{ paddingTop: "75px" }}></div>
      <div className="row">
        <div
          className=" col-md-6 "
          style={{ marginTop: "25px", marginLeft: "15px" }}
        >
          <form className="baseForm" onSubmit={formik.handleSubmit}>
            <div className="card card-body">
              <div className="form-group">
                <label>Restaurant Name</label>
                {loadedMarkets && (
                  <select
                    style={{ border: "1px solid gray" }}
                    onChange={handleChange}
                    style={{ padding: "6px", width: "100%" }}
                  >
                    <option hidden>Pict a restaurant</option>
                    {loadedMarkets.map((x) => {
                      return (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              <input
                type="text"
                placeholder="Reserved By"
                name="reservedBy"
                id="reservedBy"
                className="email formField form-control"
                value={formik.values.reservedBy}
                onChange={formik.handleChange}
              />
              <input
                type="text"
                name="numberOfPeople"
                placeholder="Number Of People"
                id="numberOfPeople"
                className="form-control email formField"
                value={formik.values.numberOfPeople}
                onChange={formik.handleChange}
              />
              <div className="form-group">
                <label>Pick your table</label>
                <br />
                <div className="row">
                  <div className="col-md-1"></div>
                  {numberOfTables &&
                    numberOfTables.map((x) => (
                      <div
                        className="col-md-5 pickTable"
                        onClick={() => {
                          setTablePosition(x);
                          setShowTables(true);
                        }}
                      >
                        <h4>{x.description}</h4>

                        <img
                          height="120"
                          width="100%"
                          src={`http://localhost:5000/uploads/images/${x.image}`}
                        ></img>
                        {tablePosition && x === tablePosition && (
                          <div style={{ textAlign: "center" }}>
                            <i
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="pi pi-check "
                            ></i>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div style={{ marginTop: "32px" }}>
                  {showTables && (
                    <select
                      style={{ border: "1px solid gray" }}
                      onChange={handleTableNumberChange}
                      style={{ padding: "6px", width: "100%" }}
                    >
                      <option hidden>Table Number</option>
                      {tablePosition.numberOfTables.map((x) => {
                        return (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>

              <DatePicker
                selected={ReservationDate}
                onChange={(val) => {
                  setReservationDate(val);
                }}
                label="Reservation Date"
                className="form-control"
                placeholderText="pick a date"
              />

              <input
                type="text"
                placeholder="Other Comments"
                name="otherComments"
                id="otherComments"
                className="email formField form-control"
                value={formik.values.otherComments}
                onChange={formik.handleChange}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
        <div className="col-md-1"></div>
        <div className=" col-md-4 " style={{ marginTop: "25px" }}>
          {loadedReservations && (
            <SharedTable
              titleData={reservationTable.map((x) => {
                return <th>{x.title}</th>;
              })}
              itemData={loadedReservations.map((x) => {
                return (
                  <tr key={x._id}>
                    <td style={{ width: "106px " }}>{x.marketName}</td>
                    <td style={{ width: "106px " }}>{x.reservedBy}</td>
                    <td style={{ width: "106px" }}>{x.numberOfPeople}</td>
                    <td style={{ width: "106px " }}>{x.reservationDate}</td>
                    <td style={{ width: "106px " }}>{x.otherComments}</td>
                  </tr>
                );
              })}
            ></SharedTable>
          )}
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="support">We Appreciate your support for us!</div>
    </div>
  );
};

export default Makereservation;

class SharedTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let titleData = this.props.titleData;
    let itemData = this.props.itemData;
    return (
      <Table striped bordered hover style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th style={{ width: "35px", textAlign: "center" }}>{titleData}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{itemData}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
