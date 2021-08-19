import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const accountSuccess = () => {
    toast.success("Account created successfully", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  async function hundleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return (
        setError("passwords do not match"),
        (passwordRef.current.value = ""),
        (passwordConfirmRef.current.value = "")
      );
    }

    if (
      passwordRef.current.value === "" ||
      passwordConfirmRef.current.value === "" ||
      emailRef.current.value === ""
    ) {
      return setError("Somthing missing");
    }

    try {
      setError("");
      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create account, Password to weak");
    }

    setLoading(false);
    accountSuccess();
    history.push("/home");
  }

  return (
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
            type="password"
            id="password"
            class="fadeIn third"
            name="login"
            placeholder="password confirm"
            ref={passwordConfirmRef}
            required
          />
          <input
            onClick={hundleSubmit}
            type="submit"
            class="fadeIn fourth"
            value="Signup"
          />
        </form>

        <div id="formFooter">
          {error && <Alert variant="danger"> {error} </Alert>}{" "}
          <a class="underlineHover" href="#">
            <Link to="/login">Already Member?</Link>{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
