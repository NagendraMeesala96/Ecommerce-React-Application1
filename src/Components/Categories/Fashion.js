import { Fragment, useState } from "react";
import { GrMail, GrLocation, GrFacebookOption } from "react-icons/gr";
import { GiSmartphone } from "react-icons/gi";
import { TiLocation } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineSearch,
  AiOutlineWhatsApp,
  AiFillCamera,
  AiFillHome,
} from "react-icons/ai";
import {
  BsFillTelephoneFill,
  BsHeart,
  BsFillCartCheckFill,
  BsLaptop,
  BsCart,
} from "react-icons/bs";
import axios from "axios";
import { FaHotTub, FaShopify } from "react-icons/fa";
function Fashion() {
  //const [totalCartItems, setTotalCartItems] = useState(0);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.setItem("AuthToken", "");
    localStorage.setItem("cartId", "");
    localStorage.setItem("username", "");
    navigate("/LogIn");
  };

  return (
    <Fragment>
      <header>
        <div className="first-header">
          <div className="container contact-header">
            <p className="contact-details">
              <span style={{ color: "red" }}>
                <BsFillTelephoneFill />{" "}
              </span>{" "}
              +919989966207
            </p>
            <p className="contact-details">
              <span style={{ color: "red" }}>
                {" "}
                <GrMail />
              </span>{" "}
              Nagendra@gmail.com
            </p>
            <p className="contact-details">
              <span style={{ color: "red" }}>
                <TiLocation />
              </span>{" "}
              Bangalore
            </p>
          </div>
        </div>
        <div className="second-header">
          <div className="row">
            <div className="col-md-4 mt-3">
              <h1 style={{ fontSize: 70 }}>
                <span style={{ color: "red" }}>.</span>VENOM
              </h1>
            </div>
            <div className="col-md-4 mt-3 search">
              <select className="form-select" id="category-dropdown">
                <option>All Categories</option>
                <option>Category 1</option>
              </select>
              <input
                className="form-control"
                type="text"
                placeholder="Search Here"
              />
              <button className="search-btn">
                <AiOutlineSearch />
                Searchgit
              </button>
            </div>
            <div className="col-md-4 mt-5 cart">
              <div className="cart">
                <p className="userName">
                  Hello! <span style={{color:'orange'}}>{localStorage.getItem("username")}</span>
                </p>

                {/* <p className="log-out" onClick={handleLogOut} >
                  <AiOutlineLogout /> Log out
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className="navbar bg-dark navbar-dark navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#links"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="links">
            <ul className="navbar-nav ml">
              <li className="nav-item">
                <a href="/Products/Feed" className="nav-link">
                  <AiFillHome /> Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/Products/Feed/hotDeals" className="nav-link">
                  <FaHotTub /> Hot Deals
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/Products/Feed/Fashion"
                  className="nav-link"
                  style={{ borderBottom: "3px solid red", color: "red" }}
                >
                  <FaShopify /> Fashion
                </a>
              </li>
              <li className="nav-item">
                <a href="/Products/Feed/Laptops" className="nav-link">
                  <BsLaptop /> Laptops
                </a>
              </li>
              <li className="nav-item">
                <a href="/Products/Feed/SmartPhones" className="nav-link">
                  <GiSmartphone /> Smartphones
                </a>
              </li>
              <li className="nav-item">
                <a href="/Products/Feed/Cameras" className="nav-link">
                  <AiFillCamera /> Cameras
                </a>
              </li>
              <li className="nav-item">
                <a href="/Products/Feed/cart" className="nav-link">
                  <BsCart /> Go To Cart
                </a>
              </li>
              <li className="nav-item" id="log-out" style={{ float: "right" }}>
                <a href="#" className="nav-link" onClick={handleLogOut}>
                  <AiOutlineLogout /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="deals-body">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>Welcome To Fashion Page</h3>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>ABOUT US</h4>
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut.
              </p>
              <p>
                <span style={{ color: "red" }}>
                  <BsFillTelephoneFill />
                </span>{" "}
                +919989966207
              </p>
              <p>
                <span style={{ color: "red" }}>
                  <GrMail />
                </span>{" "}
                Nagendra@gmail.com
              </p>
              <p>
                <span style={{ color: "red" }}>
                  <TiLocation />
                </span>{" "}
                Bangalore
              </p>
            </div>
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>CATEGORIES</h4>
              <a href="/Products/Feed/hotDeals" className="links">
                Hot deals
              </a>
              <a href="/Products/Feed/Laptops" className="links">
                Laptops
              </a>
              <a href="/Products/Feed/SmartPhones" className="links">
                Smartphones
              </a>
              <a href="/Products/Feed/Cameras" className="links">
                Cameras
              </a>
              <a href="/Products/Feed/Fashion" className="links">
                Fashion
              </a>
            </div>
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>INFORMATION</h4>
              <a href="#" className="links">
                About Us
              </a>
              <a href="#" className="links">
                Contact Us
              </a>
              <a href="#" className="links">
                Privacy Policy
              </a>
              <a href="#" className="links">
                Orders and Returns
              </a>
              <a href="#" className="links">
                Terms & Conditions
              </a>
            </div>
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>SERVICE</h4>
              <a href="#" className="links">
                My Account
              </a>
              <a href="/Products/Feed/cart" className="links">
                View Cart
              </a>
              <a href="#" className="links">
                Wishlist
              </a>
              <a href="#" className="links">
                Track My Order
              </a>
              <a href="#" className="links">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="second-footer">
        <p>
          Copyright ©2022 All rights reserved | This template is made by Rock
          Nagendra
        </p>
      </div>
    </Fragment>
  );
}

export default Fashion;
