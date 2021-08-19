import React, { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import { db } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "./Basket.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";

export default function Basket(props) {
  const { guestCartItems, addToGuestCart, removeFromGuestCart } = props;
  const [cartItems, setCartItems] = useState([]);
  const [index, setIndex] = useState();
  const [remove, setRemove] = useState(false);
  const [add, setAdd] = useState(false);
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const GuestItemsPrice = guestCartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );
  const totalPrice = itemsPrice;
  const { currentUser } = useAuth();
  toast.configure();

  const notifyRemoved = () => {
    toast.warning("product removed from basket", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    if (currentUser && cartItems) {
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

  useEffect(() => {
    if (remove) {
      if (cartItems[index].quantity === 1) {
        db.collection("basket").doc(cartItems[index].docid).delete();
        notifyRemoved();
      } else {
        db.collection("basket")
          .doc(cartItems[index].docid)
          .update({ quantity: cartItems[index].quantity - 1 });
      }
    }
    setRemove(false);
  }, [remove]);

  useEffect(() => {
    if (add) {
      db.collection("basket")
        .doc(cartItems[index].docid)
        .update({ quantity: cartItems[index].quantity + 1 });

      setAdd(false);
    }
  }, [add]);

  return (
    <>
      {currentUser ? (
        <>
          {cartItems.length === 0 && <div>Cart is empty</div>}
          {cartItems && (
            <>
              {cartItems.length !== 0 && (
                <>
                  <div class="container table-responsive py-5 text-center">
                    <table class="table table-bordered table-hover">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Action</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>
                              <IoAddCircleSharp
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  color: "#54d400",
                                }}
                                onClick={() => {
                                  setIndex(index);
                                  setAdd(true);
                                }}
                              />
                              <IoIosRemoveCircle
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  color: "red",
                                }}
                                onClick={() => {
                                  setIndex(index);
                                  setRemove(true);
                                }}
                              />
                            </td>
                            <th>{item.quantity}</th>
                            <td>
                              {item.name}
                              <img
                                src={item.image}
                                style={{ width: "25px", height: "25px" }}
                              />
                            </td>
                            <td> ₪{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <strong>total price: ₪{totalPrice} </strong>
                    <div style={{ paddingTop: "10px" }}>
                      <a href="/checkout" class="btn btn-md red">
                        CHECKOUT
                      </a>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {guestCartItems.length === 0 && <div>Cart is empty</div>}

          {guestCartItems && (
            <>
              {guestCartItems.length !== 0 && (
                <>
                  <div class="container table-responsive py-5 text-center">
                    <table class="table table-bordered table-hover">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Action</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guestCartItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>
                              <IoAddCircleSharp
                                onClick={() => addToGuestCart(item)}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  color: "#54d400",
                                }}
                              />
                              <IoIosRemoveCircle
                                onClick={() => removeFromGuestCart(item)}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  color: "red",
                                }}
                              />
                            </td>
                            <th>{item.quantity}</th>
                            <td>
                              {item.name}
                              <img
                                src={item.image}
                                style={{ width: "25px", height: "25px" }}
                              />
                            </td>
                            <td> ₪{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <strong>total price: ₪{GuestItemsPrice} </strong>
                    <div style={{ paddingTop: "10px" }}>
                      <a href="/checkout" class="btn btn-md red">
                        CHECKOUT
                      </a>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
