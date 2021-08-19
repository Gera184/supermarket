import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { ToastContainer, toast } from "react-toastify";
import "./Header.css";

export default function Header() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory;

  const logoutSeccess = () => {
    toast.warning("logged out successfully", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/home");
      logoutSeccess();
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <div className="header-body">
      <div class="fixed-top">
        <header class="topbar">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <ul class="social-network">
                  <li>
                    <a class="waves-effect waves-dark" href="/">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark" href="/">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark" href="/">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark" href="/">
                      <i class="fa fa-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark" href="/">
                      <i class="fa fa-google-plus"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <nav class="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
          <div class="container">
            <a
              class="navbar-brand"
              rel="nofollow"
              target="_blank"
              href="/home"
              style={{ textTransform: "uppercase" }}
            >
              {" "}
              ramin levin
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                {currentUser ? (
                  <>
                    <li class="nav-item active">
                      <a class="nav-link" href="/home">
                        Home
                      </a>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link" href="/basket">
                        Basket
                      </a>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link" href="/home" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                    <li class="nav-item">
                      <strong
                        style={{ color: "whitesmoke", fontSize: "medium" }}
                        class="nav-link"
                      >
                        {currentUser && currentUser.email}
                      </strong>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="nav-item active">
                      <a class="nav-link" href="/home">
                        Home
                      </a>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link" href="/basket">
                        Basket
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/register">
                        Register
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/login">
                        Login
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
