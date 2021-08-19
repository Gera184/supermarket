import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Checkout.css";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../../firebase.js";
import { ImPointDown } from "react-icons/im";
import PopUp from "../pop-up/PopUp";

export default function Checkout() {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState();
  const [cvv, setCvv] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creditCard, setCreditCard] = useState([]);
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (loading) {
      axios
        .request(`https://lookup.binlist.net/${query}`)
        .then(function (response) {
          setCreditCard(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    setCreditCard("");
  }, [query]);

  useEffect(() => {
    if (cartItems) {
      db.collection("basket")
        .where("uid", "==", currentUser.uid)
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            docid: doc.id,
            // "..." marge the id above with all the data //
            ...doc.data(),
          }));
          setCartItems(data);
        });
    }
  }, [db]);

  return (
    <>
      <form>
        <div
          className="container-fluid  text-center"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <div className="row">
            <div className="col">
              <h2>
                Make A PAYMENT NOW <ImPointDown />
              </h2>
            </div>
          </div>
        </div>
        <div className="container pb-5">
          <div className="row">
            <div
              className="col-md-5 card1"
              style={{ backgroundColor: "#263238", color: "whitesmoke" }}
            >
              <div className="row pt-3">
                <div className="col text-center">
                  <input
                    required
                    className="card-number-input  text-center"
                    type="number"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col text-muted text-center">
                  <small>
                    Enter the first digits of a card number (BIN/IIN)
                  </small>
                </div>
              </div>
              <div className="row pt-2 text-center">
                <div className="col text-muted">
                  <small>SCHEME / NETWORK</small>
                </div>
                <div className="col text-muted">
                  <small>TYPE</small>
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <label>{creditCard.scheme ? creditCard.scheme : "?"}</label>
                </div>
                <div className="col">
                  <label>{creditCard.type ? creditCard.type : "?"}</label>
                </div>
              </div>
              <div className="row pt-2 text-center">
                <div className="col text-muted">
                  <small>BRAND</small>
                </div>
                <div className="col text-muted">
                  <small>PREPAID</small>
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <label>{creditCard.brand ? creditCard.brand : "?"}</label>
                </div>
                <div className="col">
                  {creditCard.prepaid ? <label>Yes</label> : <label>No</label>}
                </div>
              </div>
              <div className="row pt-2 text-center">
                <div className="col text-muted">
                  <small>BANK</small>
                </div>
                <div className="col text-muted">
                  <small>COUNTRY</small>
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <label>{creditCard.bank ? creditCard.bank.name : "?"}</label>
                  <label>{creditCard.bank ? creditCard.bank.city : null}</label>
                  <label>
                    {creditCard.bank ? creditCard.bank.phone : null}
                  </label>
                  <label>{creditCard.bank ? creditCard.bank.url : null}</label>
                </div>
                <div className="col">
                  <label>
                    {creditCard.bank ? creditCard.country.name : "?"}
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-7 card2">
              <div className="row">
                <div className="col text-muted">
                  <img
                    src="https://juicelifestyleshop.com/wp-content/uploads/2019/09/payment_icon_collection_222.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Name on Card</label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      opacity: "100%",
                      borderRadius: "5px",
                      borderBottom: "2px solid gray",
                    }}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col">
                  <label>Card Number</label>
                </div>
                <div className="col">
                  <label>CVV</label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    required
                    type="number"
                    value={creditCardNumber}
                    onChange={(e) => {
                      setCreditCardNumber(e.target.value);
                    }}
                    placeholder="0000-0000-0000-0000"
                    style={{
                      width: "100%",
                      opacity: "80%",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="col">
                  <input
                    required
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value);
                    }}
                    type="number"
                    placeholder="***"
                    style={{
                      width: "100%",
                      opacity: "80%",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col">
                  <label>Expiration Date</label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    required
                    type="date"
                    style={{
                      width: "100%",
                      opacity: "80%",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
              <div class="row pt-5">
                <div className="col text-center">
                  <a
                    onClick={() => {
                      setLoading(true);
                    }}
                    data-toggle="modal"
                    data-target="#exampleModal"
                    style={{ color: "white" }}
                    className="btn btn-lg red"
                  >
                    MAKE A PAYMENT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {loading && (
        <PopUp
          name={name}
          query={query}
          creditCardNumber={creditCardNumber}
          cvv={cvv}
          cartItems={cartItems}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
}
