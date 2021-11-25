import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";

export default function NavbarSignUp() {
  return (
    <>
      <footer>
        <div className="row">
          <div className="col-md-6">
            {/* Content left */}
            <div className="footer-left">
              <div className="row">
                <div className="col-md-1">
                  <Image
                    src="/images/panda-coffee.png"
                    width={30}
                    height={33}
                  />
                </div>
                <div className="col-md-6">
                  <p>Panda Coffee Shop</p>
                </div>
              </div>
              <div className="description">
                <p>
                  Coffee Shop is a store that sells some good meals, and
                  especially coffee. We provide high quality beans
                </p>
              </div>
              <div className="button-footer">
                <button
                  type="button"
                  className="footer-auth-button btn btn-warning rounded-circle"
                >
                  <i className="bi bi-facebook"></i>
                </button>
                <button
                  type="button"
                  className="footer-auth-button btn btn-warning rounded-circle"
                >
                  <i className="bi bi-twitter"></i>
                </button>
                <button
                  type="button"
                  className="footer-auth-button btn btn-warning rounded-circle"
                >
                  <i className="bi bi-instagram"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div className="product-footer">
                  <h4>Product</h4>
                  <a>Download</a>
                  <br />
                  <a>Princing</a>
                  <br />
                  <a>Location</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="engage-footer">
                  <h4>Engage</h4>
                  <a>Panda Coffe Shop</a>
                  <br />
                  <a>Faq</a>
                  <br />
                  <a>About Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
