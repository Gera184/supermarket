import React, { useState, useEffect } from "react";
import "./PopUp.css";
import { db } from "../../firebase.js";
import { MdDone } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

export default function PopUp(props) {
  const { name, cvv, creditCardNumber, query, totalPrice, cartItems } = props;
  const [confirm, setConfirm] = useState(false);
  toast.configure();

  const notifyConfirm = () => {
    toast.info("you forgot to fill all your details.. ", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const notifySuccess = () => {
    toast.success("thanks for purchaseing at our super app !", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    if (confirm) {
      if (name && cvv && creditCardNumber) {
        for (let index = 0; index < cartItems.length; index++) {
          db.collection("basket").doc(cartItems[index].docid).delete();
        }
        notifySuccess();
      } else {
        notifyConfirm();
      }
    }
    setConfirm(false);
  }, [confirm]);

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-confirm" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div class="icon-box">
                <i class="material-icons">
                  <MdDone />
                </i>
              </div>
            </div>
            <div class="modal-body text-center">
              <div class="row">
                <div class="col">
                  <p>Thanks {name} for using our supermanrket app.</p>
                </div>
              </div>
              <div class="row">
                <>
                  <div class="container table-responsive  text-center">
                    <table class="table table-bordered table-hover">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>

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
                  </div>
                </>
              </div>
            </div>
            <div class="modal-footer">
              <button
                onClick={() => {
                  setConfirm(true);
                }}
                class="btn btn-success btn-block"
                data-dismiss="modal"
              >
                purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
