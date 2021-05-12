import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import {
  addCollectionInMenu,
  addProductInMenu,
  deleteCollectionFromMenu,
  deleteProductFromMenu,
  getRestaurant,
  updateProductInMenu,
} from "../actions/actions";
const MenuScreen = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const restaurantId = useParams().id;
  const [show, setShow] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  var [collectionName, setCollectionName] = useState("");
  const [isAddingProduct, setProductIsAdding] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();
  const [file, setFile] = useState();

  const filePickerRef = useRef();

  const handleClose = () => {
    setPreviewUrl(null);
    setShow(false);
  };

  const handleCloseCollectionModal = () => {
    setShowCollectionModal(false)
  }
 




  const handleShow = (collection, product) => {
    if (product == null) {
      setProductIsAdding(true);
    } else {
      setProductIsAdding(false);
    }
    setShow(true);
    formik.setValues({
      productId: product?._id,
      collectionId: collection._id,
      productName: product?.name,
      productPrice: product?.price,
      productImage: product?.productImg,
    });
  };

  const handleShowCollectionModal = () => {
    setShowCollectionModal(true)
  }
  
  const formik = useFormik({
    initialValues: {
      productId: "",
      collectionId: "",
      productName: "",
      productPrice: "",
      productImage: "",
    },
  });

  useEffect(() => {
    const retrieveMarkets = async () => {
      await getRestaurant(restaurantId).then((x) => {
        setLoadedPlaces(x.restaurant);
      });
    };
    retrieveMarkets();
  }, [loadedPlaces]);

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

  const deleteProduct = async (collectionId, productId) => {
    await deleteProductFromMenu(
      restaurantId,
      collectionId,
      productId
    ).then((x) => {});
  };

  const updateProduct = async () => {
    let formData = new FormData();
    formData.append("productId", formik.values.productId);
    formData.append("collectionId", formik.values.collectionId);
    formData.append("productName", formik.values.productName);
    formData.append("productPrice", formik.values.productPrice);
    formData.append("image", file);

    await updateProductInMenu(restaurantId, formData).then((x) => {
      setPreviewUrl(null);
      setShow(false);
    });
  };

  const addProduct = async () => {
    if (
      formik.values.productName == "" ||
      formik.values.productPrice == "" ||
      file == undefined
    ) {
      alert("Fields Missings");
      return "";
    }
    let formData = new FormData();
    formData.append("collectionId", formik.values.collectionId);
    formData.append("productName", formik.values.productName);
    formData.append("productPrice", formik.values.productPrice);
    formData.append("image", file);
    await addProductInMenu(restaurantId, formData).then((x) => {
      setPreviewUrl(null);
      setShow(false);
    });
  };
 
  const addCollection = async () => {
    if (collectionName == "") {
      alert("Fields Missings");
      return "";
    }
    await addCollectionInMenu(restaurantId, {
      collectionName: collectionName,
    }).then((x) => {
      setShowCollectionModal(false)
    });
  };

  const deleteCollection = async (collectionId) => {
    await deleteCollectionFromMenu(restaurantId, collectionId);
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
      <div style={{ textAlign: "right", marginTop: 15, marginRight: 15 }}>
        <button className="btn btn-success" onClick={handleShowCollectionModal}>Add Collection</button>
      </div>

      <div>
        {loadedPlaces && (
          <div style={{ paddingTop: "15px", margin: "25px" }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              {loadedPlaces.title} Menu
            </h2>
            {loadedPlaces.collections.map((collection, index) => (
              <div
                key={index}
                style={{
                  margin: "25px",
                  boxShadow: "0 2px 11px rgba(0, 0, 0, 0.10)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                 
                  <h3>{collection.name}</h3>
                  <button className="btn btn-danger" style={{position:"absolute",right:"5%"}}
                  onClick={()=>deleteCollection(collection._id)}>Delete Collection</button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleShow(collection, null)}
                  >
                    {" "}
                    Add Product{" "}
                  </button>
                 
                </div>
                <div className="row">
                  {collection.Products.map((x) => (
                    <div
                      className="col-md-3"
                      key={x._id}
                      style={{
                        padding: "25px",
                      }}
                    >
                      <img
                        style={{ height: "200px", width: "400px" }}
                        src={`http://localhost:5000/uploads/images/${x.productImg}`}
                      ></img>

                      <p className="form-control">{x.name}</p>
                      <p className="form-control">{x.price}</p>
                      <button
                        onClick={() => handleShow(collection, x)}
                        className="btn btn-info"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(collection._id, x._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Modal show={show} onHide={handleClose}>

              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                {previewUrl && (
                  <img
                    style={{ width: "300px", height: "350px" }}
                    src={previewUrl}
                    alt="Preview"
                  />
                )}
                {!previewUrl && formik.values.productImage && (
                  <img
                    style={{ width: "300px", height: "350px" }}
                    src={`http://localhost:5000/uploads/images/${formik.values.productImage}`}
                  ></img>
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
                  name="productName"
                  placeholder="Name"
                  id="productName"
                  className="form-control"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  style={{ margin: "15px" }}
                />
                <input
                  type="text"
                  name="productPrice"
                  placeholder="Price"
                  id="productPrice"
                  className="form-control"
                  value={formik.values.productPrice}
                  onChange={formik.handleChange}
                  style={{ margin: "15px" }}
                />
                {isAddingProduct && (
                  <button
                    className="btn btn-info"
                    style={{ margin: "15px" }}
                    onClick={() => addProduct()}
                  >
                    Add Product
                  </button>
                )}
                {!isAddingProduct && (
                  <button
                    className="btn btn-info"
                    style={{ margin: "15px" }}
                    onClick={() => updateProduct()}
                  >
                    Update Product
                  </button>
                )}
              </Modal.Body>
            </Modal>
            <Modal show={showCollectionModal} onHide={handleCloseCollectionModal}>

              <Modal.Header closeButton>
                Add Collection
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  placeholder="name"
                  className="form-control"
                  onChange={(e) => setCollectionName(e.target.value)}
                  style={{ margin: "15px" }}
                />
                  <button
                    className="btn btn-info"
                    style={{ margin: "15px" }}
                    onClick={() => addCollection()}
                  >
                    Add Collection
                  </button>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MenuScreen;
