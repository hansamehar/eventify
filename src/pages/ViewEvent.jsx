import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventDetailsAPI, getrelatedEventsAPI } from "../services/allAPI";
import SERVER_URL from "../services/serverURL";
import "../styles/common.css";
import SideMenu from "../components/SideMenu";
import { Authcontext } from "../context/contextAPI";
import { useContext } from "react";
import AddTicket from "../components/addTicket";
import BookTicket from "../components/BookTicket";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { TicketContext } from "../context/TicketDetailsContext";

const ViewEvent = () => {
  const [relatedEvents, setrelatedEvents] = useState([]);
  const { setBookingDetails } = useContext(TicketContext);
  const { user } = useContext(Authcontext);
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [ticketDetails, setTicketDetails] = useState({
    eventId: "",
    ticketType: "",
    quantity: 1,
    totalPrice: 0,
    paymentStatus: "pending",
  });

  const encodedImage = encodeURIComponent(eventDetails?.eventImg);

  const getEventDetails = async () => {
    try {
      const result = await getEventDetailsAPI(id);
      if (result.status == 200) {
        setEventDetails(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const calculateTotalPrice = () => {
    const selectedTicket = eventDetails?.tickets?.find(
      (ticket) => ticket.ticketType === ticketDetails.ticketType
    );
    const ticketprice = selectedTicket ? selectedTicket.ticketPrice : 0;
    setTicketDetails({
      ...ticketDetails,
      totalPrice: ticketprice * ticketDetails.quantity,
    });
  };
  const getrelatedEvents = async () => {
    try {
      const result2 = await getrelatedEventsAPI(eventDetails.category);
      const filteredRelatedEvents = result2.data.filter(
        (event) => event.name != eventDetails.name
      );
      setrelatedEvents(filteredRelatedEvents);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);
  useEffect(() => {
    calculateTotalPrice();
  }, [ticketDetails.quantity, ticketDetails.ticketType]);

  useEffect(() => {
    setTicketDetails({ ...ticketDetails, eventId: eventDetails._id });
    getrelatedEvents();
    eventDetails.type == "free" &&
      setTicketDetails({
        ...ticketDetails,
        eventId: eventDetails._id,
        ticketType: "free",
        totalPrice: 0,
      });
  }, [eventDetails]);

  useEffect(() => {
    setBookingDetails(ticketDetails);
  }, [ticketDetails]);

  if (!eventDetails.name) {
    return <div>Loading event details...</div>;
  }

  return (
    <>
      {user ? <SideMenu /> : <Header />}
      <div className={user && "maindiv"}>
        <div className="content ">
          <div
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: "9",
            }}
            className="bg-light d-flex justify-content-between align-items-center p-3"
          >
            <h4>Book Your Tickets</h4>
            {user.role == "admin" && <AddTicket eventDetails={eventDetails} />}
            {user.role == "user" && (
              <>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  BOOK
                </button>

                <div
                  class="offcanvas offcanvas-end"
                  tabIndex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                      Book Tickets to {eventDetails.name}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="offcanvas-body d-flex flex-column justify-content-between">
                    <div>
                      {eventDetails.type == "paid" && (
                        <div className="shadow p-2 my-3 rounded">
                          <h6>Select Ticket Type</h6>
                          <select
                            onChange={(e) =>
                              setTicketDetails({
                                ...ticketDetails,
                                ticketType: e.target.value,
                              })
                            }
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option value="" hidden>
                              select
                            </option>
                            {eventDetails.tickets.map((ticket) => (
                              <option
                                key={ticket._id}
                                value={ticket.ticketType}
                              >
                                {ticket.ticketType} - ₹{ticket.ticketPrice}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="shadow p-2 my-3 rounded">
                        <h6>Number of Seats</h6>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                setTicketDetails({
                                  ...ticketDetails,
                                  quantity: ticketDetails.quantity - 1,
                                })
                              }
                              disabled={ticketDetails.quantity <= 1}
                            >
                              -
                            </button>
                          </div>

                          <input
                            type="text"
                            className="form-control"
                            value={ticketDetails.quantity}
                            readOnly
                          />

                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                setTicketDetails({
                                  ...ticketDetails,
                                  quantity: ticketDetails.quantity + 1,
                                })
                              }
                              disabled={ticketDetails.quantity >= 10}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" d-flex justify-content-between align-items-center">
                      <h5>Total : ₹{ticketDetails.totalPrice}</h5>
                      {eventDetails.type == "paid" ? (
                        <Link
                          to={"/payment"}
                          className="text-decoration-none rounded"
                          style={{ backgroundColor: " #3E4A7A", color: "#fff" }}
                        >
                          Pay
                        </Link>
                      ) : (
                        <BookTicket ticketDetails={ticketDetails} />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="row justify-content-evenly align-items-center  p-5">
            <img
              className="col-lg-4 col-md-12 rounded"
              width={"300px"}
              src={`${SERVER_URL}/uploads/${encodedImage}`}
              alt=""
            />
            <div className="col-lg-6 col-md-12 ">
              <h1
                className="mb-3"
                style={{
                  color: "#3E4A7A",
                  fontFamily: '"Poiret One", sans-serif',
                  fontWeight: "700",
                  paddingTop: "0",
                }}
              >
                {" "}
                {eventDetails.name}
              </h1>

              <h6 className="my-3">{eventDetails.description} </h6>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <box-icon color="#3E4A7A" type="solid" name="map"></box-icon>
                  <h6 style={{ margin: "0px", paddingLeft: "10px" }}>
                    {eventDetails.venue}{" "}
                  </h6>
                </div>
                <div className="d-flex align-items-center">
                  <box-icon
                    color="#3E4A7A"
                    type="solid"
                    name="time-five"
                  ></box-icon>
                  <h6 style={{ margin: "0px", paddingLeft: "10px" }}>
                    {eventDetails?.dateTime.split(" ").slice(1, 5).join(" ")}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {user.role === "user" && relatedEvents?.length > 0 && (
          <>
            <h4 className="px-5 py-3">Related Events:</h4>
            <div className="d-flex px-5 gap-5">
              {relatedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
        {user.role === "admin" && (
          <>
            <h5 className="px-5 py-3">Tickets Available:</h5>
            <div className="py-3 d-flex justify-content-center align-items-center">
              <table className="table table-responsive table-bordered w-50">
                <thead>
                  <tr>
                    <th style={{ color: "#3E4A7A" }}>#</th>
                    <th style={{ color: "#3E4A7A" }}>Ticket Type</th>
                    <th style={{ color: "#3E4A7A" }}>Quantity</th>
                    <th style={{ color: "#3E4A7A" }}>Ticket Price</th>
                  </tr>
                </thead>
                <tbody>
                  {eventDetails.tickets?.map((ticket, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ticket.ticketType} ticket</td>
                      <td>{ticket.quantity}</td>
                      <td>${ticket.ticketPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!user && <Footer />}
      </div>
    </>
  );
};

export default ViewEvent;
