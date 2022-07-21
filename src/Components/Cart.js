import { Fragment, useState } from "react";
import "../App.css";
import { GrMail, GrLocation, GrFacebookOption } from "react-icons/gr";
import { GiSmartphone } from "react-icons/gi";
import { TiLocation } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineSearch, AiFillCamera, AiFillHome } from "react-icons/ai";
import {
  BsFillTelephoneFill,
  BsHeart,
  BsFillCartCheckFill,
  BsLaptop,
  BsCart,
} from "react-icons/bs";
import axios from "axios";
import {
  SpinnerCircularFixed,
  SpinnerCircular,
  FadeLoader,
} from "spinners-react";
import { FaHotTub, FaShopify } from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [totalCartItems, setTotalCartItems] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  const [orderLink, setOrderLink] = useState("");

  const [loading, setLoading] = useState(false);

  const [removeCartLoading, setRemoveCartLoading] = useState(false)

  const [selectedTab,setSelectedTab] = useState(undefined);

  const handleLogOut = () => {
    localStorage.setItem("AuthToken", "");
    localStorage.setItem("cartId", "");
    localStorage.setItem("username", "");
    navigate("/LogIn");
  };

  const loadCart = () => {
    const cartID = localStorage.getItem("cartId");
    setLoading(true);
    axios({
      url: `https://api.chec.io/v1/carts/${cartID}`,
      method: "GET",
      headers: {
        "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
      },
    })
      .then((res) => {
        //console.log(res.data.line_items)
        setCartItems(res.data.line_items);
        setTotalCartItems(res.data.total_items);
        setTotalAmount(res.data.subtotal.formatted);
        setOrderLink(res.data.hosted_checkout_url);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeProduct = (itemId,index) => {
    const cartId = localStorage.getItem("cartId");

    setSelectedTab(index);

    setRemoveCartLoading(true);

    axios({
      url: `https://api.chec.io/v1/carts/${cartId}/items/${itemId}`,
      method: "DELETE",
      headers: {
        "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
      },
    })
      .then((res) => {
        loadCart();
        setRemoveCartLoading(false);
        toast.success("Product Successfully Removed From Cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      })
      .catch((err) => {
        setRemoveCartLoading(false);
        console.log(err);
      });
  };

  const placeAnOrder = () => {
    window.open(orderLink, "_blank");
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
                Search
              </button>
            </div>
            <div className="col-md-4 mt-5 cart">
              <div className="cart">
                <p className="userName mb-4">
                  Hello!{" "}
                  <span style={{ color: "orange" }}>
                    {localStorage.getItem("username")}
                  </span>
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
                <a href="/Products/Feed/Fashion" className="nav-link">
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
                <a
                  href="/Products/Feed/cart"
                  className="nav-link"
                  style={{ borderBottom: "3px solid red", color: "red" }}
                >
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
      <section className="cart-body">
        
        <div className="container table-data">
        {loading ? (
                <SpinnerCircular
                  size={50}
                  thickness={100}
                  speed={100}
                  color="#36ad47"
                  secondaryColor="rgba(0, 0, 0, 0.44)"
                />
              ) : (
                false
              )}
              <table class="table table-hover mt-3 w-auto">
                <tr className="ml-3">
                  <th scope="col">S.No</th>
                  {/* <th scope="col">Image</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        {/* <td>
                          <img
                            src={item.media.source}
                            className="img-fluid img-thumbnail"
                            // className='cart-img'
                            // height={180}
                            // width={200}
                          />
                        </td> */}
                        <td>
                          <b>{item.name}</b>
                        </td>
                        <td>{item.quantity}</td>
                        <td>&#8377; {item.price.formatted * item.quantity}</td>
                        <td>
                          <button
                            id="cart-remove-btn"
                            onClick={() => {
                              removeProduct(item.id, index);
                            }}
                          >
                            {selectedTab == index ? (
                              removeCartLoading ? (
                                <SpinnerCircularFixed
                                  size={50}
                                  thickness={100}
                                  speed={100}
                                  color="rgba(57, 172, 140, 1)"
                                  secondaryColor="rgba(0, 0, 0, 0.44)"
                                />
                              ) : (
                                <b>Remove</b>
                              )
                            ) : (
                              <b>Remove</b>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <td colSpan={7} style={{ fontSize: 40, textAlign: "center" }}>
                    Cart is Empty
                  </td>
                )}
                <tr>
                  <td colSpan={3}></td>
                  <td style={{ fontSize: 30 }}>
                    <b>&#8377; {totalAmount}</b>
                  </td>
                  <td>
                    {cartItems.length > 0 ? (
                      <button id="place-order-btn" onClick={placeAnOrder}>
                        Place Order
                      </button>
                    ) : null}
                  </td>
                </tr>
              </table>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default Cart;