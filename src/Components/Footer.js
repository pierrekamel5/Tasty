import React, { Component } from "react";
import "../Styles/footer.css";
class Footer extends Component {
  render() {
    return (
      <footer >
        <div className="container">
          <div className="footer-containertent">
            <div className="col-md-12 text-center">
              <p
                className="logo"
                id="logo"
                style={{
                  fontSize: "50px",
                  color: "white",
                  fontWeight: "bold",
                  color: "#ff5252",
                }}
              >
                Tasty{" "}
              </p>
            </div>
            <h4 style={{ marginBottom: "25px", color:"white" }}> Follow Us</h4>
            <ul className="footer-social-info">
              <li>
                <a href={"http://facebook.com"}>
                  <i className="fa fa-facebook socialMedia"></i>
                </a>
              </li>
              <li >
                <a href={"http://twitter.com"}>
                  <i className="fa fa-twitter socialMedia"></i>
                </a>
              </li>
              <li>
                <a href={"http://instagram.com"}>
                  <i className="fa fa-instagram socialMedia"></i>
                </a>
              </li>
            </ul>

            <p style={{ marginTop: "20px" }}>
              Copyright © 2021. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
