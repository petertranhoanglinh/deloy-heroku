/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
class Footer extends Component {
  render() {
    return (

      <footer className="text-center text-lg-start bg-light text-muted reszeFooter">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="a" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="b" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="c" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="d" className="me-4 text-reset">
              <i classNameName="fab fa-instagram"></i>
            </a>
            <a href="e" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="f" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>

        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">

            <div className="row mt-3">

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Hoang Linh
                </h6>

                <p>
                  Design web
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Products
                </h6>
                <p>
                  <a href="#!" className="text-reset">Angular</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">React</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                <h6 className="text-uppercase fw-bold mb-4">
                  Contact
                </h6>
                <p><i className="fas fa-home me-3"></i> 860/40 Xo Viet Nge Tinh - P25 - Binh Thanh - TPHCM</p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  petertranhoanglinh@gmail.com
                </p>
                <p><i className="fas fa-phone me-3"></i> + 84 582 216 3211</p>
              </div>

            </div>

          </div>
        </section>
        <Helmet>
          <style>{'Footer { background-color: #101010;  }'}</style>
        </Helmet>
      </footer>
    )
  }
}

export default Footer;