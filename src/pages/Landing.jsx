import React, { useContext, useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getHomeEventAPI } from "../services/allAPI";
import Header from "../components/Header";
import Footer from "../components/Footer";
import img2 from "../assets/landing.jpg";
import img from "../assets/landingImg.jpg";
import { Link } from "react-router-dom";

const Landing = () => {
  const [events, setEvents] = useState([]);
  const getHomeEvents = async () => {
    try {
      const result = await getHomeEventAPI();
      if (result.status == 200) {
        setEvents(result.data);
        console.log(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getHomeEvents();
  }, []);

  return (
    <>
      <Header />

      <div>
        <div className="row w-100 p-5">
          <div className="col-lg-7 col-md-12 d-flex flex-column justify-content-center align-items-start">
            <h1
              style={{
                fontSize: "50px",
                fontFamily: '"Poiret One", sans-serif',
                fontWeight: "900",
                lineHeight: "3.5rem",
              }}
            >
              Get Ready for the Event of a Lifetime
            </h1>
            <h5 className="my-2" style={{ color: "#3E4A7A" }}>
              Login to book your Tickets
            </h5>
            <Link
              to={"/login"}
              style={{ backgroundColor: "#3E4A7A", color: "#fff" }}
              className="btn my-1"
            >
              Login
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center col-lg-5 col-md-12 ">
            <img className="img-fluid" src={img} alt="" />
          </div>
        </div>
        <div
          style={{ backgroundColor: "#3E4A7A" }}
          className="py-2 d-none d-lg-flex flew-wrap justify-content-evenly fw-bolder text-white"
        >
          <span>Concerts</span>
          <span>Workshops</span>
          <span>Exhibitions</span>
          <span>Theatre</span>
          <span>Charity</span>
          <span>Virtual</span>
        </div>

        <div
          style={{ backgroundColor: "rgba(150, 170, 190, 0.4)" }}
          className=" d-flex flex-column justify-content-center align-items-center py-5"
        >
          <h2
            className="text-center  mb-4"
            style={{
              color: "#3E4A7A",
              fontFamily: '"Poiret One", sans-serif',
              fontWeight: "700",
            }}
          >
            Popular Events
          </h2>
          <div className="w-50 d-flex flex-wrap justify-content-around align-items-center gap-4">
            {events?.length > 0 ? (
              events.map((event) => (
                <EventCard key={event?._id} event={event} />
              ))
            ) : (
              <div className="text-danger text-center">No Events</div>
            )}
          </div>
        </div>
        <div className="bg-light d-flex flex-column justify-content-center align-items-center py-5">
          <h2
            className="text-center mb-4"
            style={{
              color: "#3E4A7A",
              fontFamily: '"Poiret One", sans-serif',
              fontWeight: "700",
            }}
          >
            Why Choose Us?
          </h2>
          <div className="d-flex flex-wrap justify-content-evenly align-items-center p-3">
            <img
              className="d-none d-sm-block img-fluid w-25"
              src={img2}
              alt=""
            />
            <div>
              <h5>Discover Events</h5>
              <p>
                Browse events by category, date, or location and find what you
                love.
              </p>

              <h5>Personalized Experience</h5>
              <p>
                Save your favorite events and access your booking history with
                ease.
              </p>

              <h5>Secure Payments</h5>
              <p>
                Book with confidence through our fast and secure payment system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
