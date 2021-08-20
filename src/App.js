import React, { useEffect, useState } from "react";
import Basket from "./components/basket/Basket";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import data from "./data.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { AuthProvider } from "./components/contexts/AuthContext";
import Checkout from "./components/checkout/Checkout";
import PrivateRoute from "./components/contexts/PrivateRoute";

export default () => {
  const [guestCartItems, setGuestCartItems] = useState([]);
  toast.configure();

  const notifyRemoved = () => {
    toast.warning("product removed from basket", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const notifyAdded = () => {
    toast.success("product added to the basket", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const addToGuestCart = (product) => {
    const exist = guestCartItems.find((x) => x.id === product.id);
    if (exist) {
      setGuestCartItems(
        guestCartItems.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
      notifyAdded();
    } else {
      setGuestCartItems([...guestCartItems, { ...product, quantity: 1 }]);

      notifyAdded();
    }
  };

  const removeFromGuestCart = (product) => {
    const exist = guestCartItems.find((x) => x.id === product.id);
    if (exist.quantity === 1) {
      setGuestCartItems(guestCartItems.filter((x) => x.id !== product.id));
      notifyRemoved();
    } else {
      setGuestCartItems(
        guestCartItems.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  return (
    <>
      <AuthProvider>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/basket">
              <Basket
                removeFromGuestCart={removeFromGuestCart}
                addToGuestCart={addToGuestCart}
                guestCartItems={guestCartItems}
              />
            </Route>
            <Route exact path="/home">
              <Basket
                removeFromGuestCart={removeFromGuestCart}
                guestCartItems={guestCartItems}
                addToGuestCart={addToGuestCart}
              />
              <Main addToGuestCart={addToGuestCart} products={data} />
            </Route>
            <Route exact path="/">
              <Basket
                removeFromGuestCart={removeFromGuestCart}
                guestCartItems={guestCartItems}
                addToGuestCart={addToGuestCart}
              />
              <Main addToGuestCart={addToGuestCart} products={data} />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
};
