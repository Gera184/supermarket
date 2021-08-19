import React, { useState } from "react";
import { Redirect, Route } from "react-router";
import { Alert } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  const error = () => {
    toast.warning("you are not logged in", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <>
            {error()}
            <Redirect to="/login" />
          </>
        );
      }}
    ></Route>
  );
}
