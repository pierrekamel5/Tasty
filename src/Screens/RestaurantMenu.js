import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Restaurants.css";
import { useDispatch, useStore } from "react-redux";
import { marketsActions } from "../redux/actions/markets";
import { ordersActions } from "../redux/actions/orders";
import { Accordion, AccordionTab } from "primereact/accordion";
import PubSub from "pubsub-js";

const RestaurantMenu = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();

  const [currentQuantityd, setQuantity] = useState(1);
  const userId = useParams().placeId;
  const store = useStore();

  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveMarkets = async () => {
      await dispatch(marketsActions.getRestaurant(userId));
      setLoadedPlaces(
        store.getState().marketReducer.RestaurantsAvailable.payload.data
          .restaurant
      );
    };
    retrieveMarkets();
  }, []);

  const addToCartHandler = (product) => {
    PubSub.publish("MYCART", "+1");
    dispatch(
      ordersActions.addtoCart(
        localStorage.getItem("user"),
        product._id,
        product.name,
        product.price,
        product.productImg,
        product.quantity
      )
    );
  };
  const currentQuantity = (product, message) => {
    if (message === "add") {
      setQuantity(product.quantity + 1);
      product.quantity = product.quantity + 1;
    } else if (message === "minus") {
      setQuantity(product.quantity - 1);
      product.quantity = product.quantity - 1;
    } else {
      setQuantity(1);
    }
  };
  return (
    <React.Fragment>
      <div style={{ paddingTop: "95px" }}>
        {loadedPlaces && (
          <div style={{ paddingTop: "15px", margin: "25px" }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              {loadedPlaces.title} Menu
            </h2>
            {loadedPlaces.collections.map((collection,index) => (
              <div
              key={index}
                style={{
                  margin: "25px",
                  boxShadow: "0 2px 11px rgba(0, 0, 0, 0.10)",
                }}
              >
                <Accordion>
                  <AccordionTab header={collection.name}>
                    <div className="row">
                      {collection.Products.map((x) => (
                        <div
                          className="col-md-3 "
                          key={x._id}
                          style={{
                            padding: "15px",
                          }}
                        >
                          <div
                            style={{
                              border: "1px solid #a8a8a8",
                              padding: 5,
                              textAlign: "center",
                            }}
                          >
                            <img
                              className="menuImage"
                              src={`http://localhost:5000/uploads/images/${x.productImg}`}
                            ></img>
                            <div >
                              <p
                                className="mytitle"
                                style={{ color: "black", fontSize: 22 }}
                              >
                                {x.name}
                              </p>
                              <p style={{ color: "black", fontSize: 17 }}>
                                {x.price} L.L
                              </p>
                              <div>
                                <button
                                  onClick={() => {
                                    x.quantity > 1
                                      ? currentQuantity(x, "minus")
                                      : currentQuantity(x, "");
                                  }}
                                  className="btn btn-secondary"
                                  style={{
                                    marginRight: 10,
                                    display: "inline-block",
                                    padding: "10px",
                                  }}
                                >
                                  -
                                </button>
                                {x.quantity}
                                <button
                                  onClick={() => currentQuantity(x, "add")}
                                  className="btn btn-secondary"
                                  style={{
                                    marginLeft: 10,
                                    display: "inline-block",
                                    padding: "10px",
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => addToCartHandler(x)}
                                className="btn btn-info"
                                style={{ marginTop: "35px" }}
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionTab>
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default RestaurantMenu;

// we are getting the products of each market and adding to the cart
