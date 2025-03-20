import React from "react";
import { bookTicketAPI } from "../services/allAPI";

const BookTicket = ({ ticketDetails }) => {
  const BookTicket = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "user") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await bookTicketAPI(ticketDetails, reqHeader);
        if (result.status == 200) {
          alert("ticket booked");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please login");
    }
  };
  return (
    <>
      <button
        style={{ backgroundColor: " #3E4A7A", color: "#fff" }}
        onClick={BookTicket}
        className="btn"
      >
        Book
      </button>
    </>
  );
};

export default BookTicket;
