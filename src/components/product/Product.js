import React, { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import { db } from "../../firebase.js";
import "./Product.css";
import { FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

export default function Product(props) {
  const { product, cartItems, addToGuestCart, currentUser, index } = props;
  const [addToCart, setAddToCart] = useState(false);

  const exist = cartItems.find((x) => x.id === product.id);
  toast.configure();

  const notifyAdded = () => {
    toast.success("product added to the basket", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    if (currentUser && addToCart) {
      if (exist) {
        console.log(exist);
        db.collection("basket")
          .doc(exist.docid)
          .update({ quantity: exist.quantity + 1 });
        notifyAdded();
      } else {
        db.collection("basket").add({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: 1,
          uid: currentUser.uid,
        });
        notifyAdded();
      }
    }
    if (!currentUser && addToCart) {
      addToGuestCart(product);
    }
    setAddToCart(false);
  }, [addToCart]);

  return (
    <>
      <div className="product-body">
        <div class="d-flex justify-content-center container-fluid mt-5">
          <div class="card p-3 bg-white">
            <div class="about-product text-center mt-2">
              <img
                src={product?.image}
                style={{ height: "300px", width: "300px" }}
              />
              <div className="pt-3">
                <h4>{product?.name}</h4>
              </div>
            </div>
            <div class="stats mt-2">
              <div class="d-flex justify-content-between p-price">
                <span>price per kg</span>
                <span>{product?.price}₪</span>
              </div>
            </div>
            <div class="d-flex justify-content-between total font-weight-bold mt-4">
              <span> Add to cart </span>
              <span
                onClick={() => {
                  setAddToCart(true);
                }}
              >
                <FaCartPlus style={{ height: "25px", width: "25px" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
