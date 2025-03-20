import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import "../styles/common.css";
import { getBookingsAPI } from "../services/allAPI";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import barcode from "../assets/barcode.jpg";
import dayjs from "dayjs";

const Bookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  console.log(allBookings);

  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState(null);
  const handleClose = () => {
    setShow(false);
    setTicket(null);
  };

  const handleShow = (booking) => {
    setTicket(booking);
    setShow(true);
  };
  const getBookings = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "user") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getBookingsAPI(reqHeader);
        if (result.status == 200) {
          setAllBookings(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please login");
    }
  };
  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <div className="maindiv">
        <SideMenu />
        <div className="content mx-5">
          <h3
            style={{
              fontFamily: '"Poiret One", sans-serif',
              fontWeight: "700",
            }}
            className="my-4"
          >
            My Bookings :
          </h3>
          <table className="table table-responsive  table-bordered">
            <thead>
              <tr>
                <th style={{ color: "#3E4A7A" }}>#</th>
                <th style={{ color: "#3E4A7A" }}>Event</th>
                <th style={{ color: "#3E4A7A" }}>Type</th>
                <th style={{ color: "#3E4A7A" }}>No of tickets</th>
                <th style={{ color: "#3E4A7A" }}>Price</th>
                <th style={{ color: "#3E4A7A" }}>Time</th>
                <th style={{ color: "#3E4A7A" }}>Payment Status</th>
                <th style={{ color: "#3E4A7A" }}>Ticket</th>
              </tr>
            </thead>
            <tbody>
              {allBookings?.length > 0 ? (
                allBookings.map((booking, index) => (
                  <tr key={booking?._id}>
                    <td>{index + 1}</td>
                    <td>{booking?.eventId.name}</td>
                    <td>{booking?.ticketType}</td>
                    <td>{booking?.quantity}</td>
                    <td>${booking?.totalPrice}</td>
                    <td>
                      {dayjs(booking?.createdAt).format("MMMM DD, YYYY HH:mm")}
                    </td>
                    <td>
                      {booking.eventId.type == "paid"
                        ? booking?.paymentStatus
                        : "Free Event"}
                    </td>
                    <td>
                      {(booking.paymentStatus == "paid") |
                      (booking.eventId.type == "free") ? (
                        <>
                          <button
                            className="btn"
                            style={{
                              backgroundColor: " #3E4A7A",
                              color: "#fff",
                            }}
                            onClick={() => handleShow(booking)}
                          >
                            My Ticket
                          </button>

                          <Modal
                            centered
                            size="sm"
                            show={show}
                            onHide={handleClose}
                          >
                            <Modal.Body
                              style={{ backgroundColor: "rgb(111, 120, 158)" }}
                            >
                              <h5 className="text-center text-light">
                                {" "}
                                My Ticket
                              </h5>
                              <div className="bg-light rounded p-3">
                                <h4 style={{ color: "#3E4A7A" }}>
                                  {ticket?.eventId.name}
                                </h4>
                                <div className="d-flex align-items-center pt-1 pb-3">
                                  <box-icon
                                    color="#3E4A7A"
                                    type="solid"
                                    name="map"
                                  ></box-icon>
                                  <span style={{ fontSize: "13px" }}>
                                    {ticket?.eventId.venue}
                                  </span>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <p>
                                      <span style={{ fontSize: "13px" }}>
                                        TicketType:
                                      </span>
                                      <br />
                                      <strong>{ticket?.ticketType}</strong>
                                    </p>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <p>
                                      <span style={{ fontSize: "13px" }}>
                                        Date:
                                      </span>
                                      <br />
                                      <strong>
                                        {ticket?.eventId.dateTime
                                          .split(" ")
                                          .slice(1, 4)
                                          .join(" ")}
                                      </strong>
                                    </p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <p>
                                      <span style={{ fontSize: "13px" }}>
                                        TicketType:
                                      </span>
                                      <br />
                                      <strong>{ticket?.ticketType}</strong>
                                    </p>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <p>
                                      <span style={{ fontSize: "13px" }}>
                                        Visitors
                                      </span>
                                      <br />
                                      {ticket?.quantity > 1 ? (
                                        <strong>
                                          {ticket?.userId.username}+
                                          {ticket?.quantity - 1} others
                                        </strong>
                                      ) : (
                                        <strong>
                                          {ticket?.userId.username}
                                        </strong>
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <hr />

                                <div className="d-flex flex-column align-items-center">
                                  <span style={{ fontSize: "12px" }}>
                                    show the barcode at the counter
                                  </span>
                                  <img className="w-100" src={barcode} alt="" />
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </>
                      ) : (
                        <div className="bg-warning rounded text-white px-1">
                          not booked
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <div>No Bookings</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bookings;
