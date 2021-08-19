import React, { useState, useEffect } from "react";
import Product from "../product/Product";
import { db } from "../../firebase.js";
import { useAuth } from "../contexts/AuthContext";

export default function Main(props) {
  const { products, addToGuestCart } = props;
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();

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

  return (
    <div className="container-fluid " style={{ background: "#eee" }}>
      <div className="row d-flex justify-content-center">
        {products.map((product, index) => (
          <Product
            key={product.id}
            product={product}
            cartItems={cartItems}
            index={index}
            addToGuestCart={addToGuestCart}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
