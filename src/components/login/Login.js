import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
export default function Login() {
  toast.configure();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const loginSuccess = () => {
    toast.success("Logged in successfully", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  async function hundleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      loginSuccess();
      history.push("/home");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first">
            <img
              src="https://ak.picdn.net/shutterstock/videos/27903601/thumb/1.jpg"
              id="icon"
              alt="User Icon"
            />
          </div>

          <form>
            <input
              type="text"
              id="login"
              class="fadeIn second"
              name="login"
              placeholder="Email"
              ref={emailRef}
              required
            />
            <input
              type="password"
              id="password"
              class="fadeIn third"
              name="login"
              placeholder="password"
              ref={passwordRef}
              required
            />
            <input
              onClick={hundleSubmit}
              type="submit"
              class="fadeIn fourth"
              value="Log In"
            />
          </form>

          <div id="formFooter">
            {error && <Alert variant="danger"> {error} </Alert>}{" "}
            <div>
              <a class="underlineHover" href="/register">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
