import React, { useContext, useEffect, useState } from "react";
import { TicketContext } from "../context/TicketDetailsContext";
import { bookTicketAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { BookingDetails, setBookingDetails } = useContext(TicketContext);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("");

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading("paying");
    setTimeout(() => {
      setBookingDetails({ ...BookingDetails, paymentStatus: "paid" });
      setStatus("success");
      setMessage("Payment Successful");
      setLoading("");
    }, 3000);
  };
  useEffect(() => {
    if (BookingDetails.paymentStatus == "paid") {
      setLoading("booking");
      setTimeout(() => {
        BookTicket();
        setLoading("");
      }, [5000]);
    }
  }, [BookingDetails]);

  const BookTicket = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "user") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await bookTicketAPI(BookingDetails, reqHeader);
        if (result.status == 200) {
          alert("ticket booked");
          navigate("/bookings");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please login");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "rgba(150, 170, 190, 0.2)",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        style={{
          background:
            "linear-gradient(to bottom, rgba(130, 160, 200, 0.8), rgba(110, 140, 190, 0.8), rgba(130, 160, 200, 0.8))",
        }}
        className="rounded shadow w-75 d-flex flex-wrap justify-content-evenly align-items-center p-4"
      >
        <div className="text-light">
          <h4>Total Price :</h4>
          <h2 className="text-center">${BookingDetails?.totalPrice}</h2>
        </div>

        <div
          style={{ width: "35%" }}
          className="d-flex flex-column justify-content-between align-items-center"
        >
          {loading == "paying" && (
            <div class="w-100 my-1  d-flex justify-content-between align-items-center">
              <span role="status">Processing Payment...</span>
              <div class="spinner-grow ms-auto" aria-hidden="true"></div>
            </div>
          )}
          {loading == "booking" && (
            <div class="w-100 my-1  d-flex justify-content-between align-items-center">
              <span role="status">Booking your Ticket...</span>
              <div class="spinner-border  ms-auto" aria-hidden="true"></div>
            </div>
          )}
          <form
            onSubmit={(e) => handlePaymentSubmit(e)}
            className="bg-light rounded p-3"
          >
            <h4 className="text-center pt-2 pb-3">Payment Page</h4>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                required
                pattern="^[a-zA-Z\s]+$"
                title="Please enter a valid name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 5678 9012 3456"
                required
                pattern="^\d{4} \d{4} \d{4} \d{4}$"
                title="Card number must be in the format 1234 5678 9012 3456"
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Expiration Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  required
                  pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
                  title="Expiration date should be in MM/YY format"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="123"
                  required
                  pattern="^\d{3}$"
                  title="CVV must be a 3-digit number"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 p-2"
              style={{ backgroundColor: " #3E4A7A", color: "#fff" }}
            >
              Pay Now
            </button>
          </form>
          {message && (
            <div
              className={`w-100 mt-3 p-2 text-center rounded-3 ${
                status === "success"
                  ? "bg-success text-white"
                  : "bg-danger text-white"
              }`}
              style={{ fontSize: "16px" }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
