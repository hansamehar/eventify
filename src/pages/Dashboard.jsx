import React, { useContext, useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import "../styles/common.css";
import img1 from "../assets/userdashboardimg.png";
import EventCard from "../components/EventCard";
import { Authcontext } from "../context/contextAPI";
import { getHomeEventAPI } from "../services/allAPI";
import { Link } from "react-router-dom";
import img from "../assets/userdashboardimg.png";

const Dashboard = () => {
  const { user } = useContext(Authcontext);
  const [events, setEvents] = useState([]);

  const getHomeEvents = async () => {
    try {
      const result = await getHomeEventAPI();
      if (result.status == 200) {
        setEvents(result.data);
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
      <SideMenu />
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#D9E3F0",
        }}
        className="maindiv"
      >
        <div className="w-100 row">
          <div className="col-md-12 col-lg-9 d-flex flex-column gap-3 p-lg-4 justify-content-between">
            <div className="bg-light shadow d-flex justify-content-between align-items-center rounded py-2 px-4">
              <div>
                <h3>
                  Hello{" "}
                  <span style={{ color: "#DC7C63 " }}>{user.username}</span>,
                </h3>
                <h6 className="py-2">
                  Ready to Book Tickets for the Best Events? Find, Explore, and
                  Secure Your Spot Today!"
                </h6>
                <Link
                  to={"/events"}
                  style={{ backgroundColor: " #3E4A7A", color: "#fff" }}
                  className="btn"
                >
                  Events
                </Link>
              </div>
              <img
                className="d-none d-sm-block"
                width={"200px"}
                src={img}
                alt=""
              />
            </div>
            <div>
              <h5 className="fw-bold py-2 px-1">Popular Events</h5>
              <div className="d-flex flex-wrap justify-content-center gap-3 align-items-center">
                {events?.length > 0 ? (
                  events
                    .slice(0, 4)
                    .map((event) => (
                      <EventCard key={event?._id} event={event} />
                    ))
                ) : (
                  <div className="text-danger text-center">No Events</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-3 p-3">
            <div className="h-100 d-flex flex-column justify-content-between align-items-center">
              <Link
                className="shadow bg-light d-flex w-100 rounded my-2 p-2 text-decoration-none pt-3"
                to={"/events?category=Concerts"}
              >
                <div className="px-3">
                  <box-icon color="#DC7C63 " name="music"></box-icon>
                </div>
                <h5 className="text-dark">Concerts</h5>
              </Link>
              <Link
                className="shadow bg-light d-flex w-100 rounded my-2 p-2 text-decoration-none pt-3"
                to={"/events?category=Exhibitions"}
              >
                <div className="px-3">
                  <box-icon color="#DC7C63 " name="palette"></box-icon>
                </div>
                <h5 className="text-dark">Exhibitions</h5>
              </Link>
              <Link
                className="shadow bg-light d-flex w-100 rounded my-2 p-2 text-decoration-none pt-3"
                to={"/events?category=Festivals"}
              >
                <div className="px-3">
                  <box-icon color="#DC7C63 " name="party"></box-icon>
                </div>
                <h5 className="text-dark">Festivals</h5>
              </Link>
              <Link
                className="shadow bg-light d-flex w-100 rounded my-2 p-2 text-decoration-none pt-3"
                to={"/events?category=Theatre"}
              >
                <div className="px-3">
                  <box-icon color="#DC7C63 " name="camera-movie"></box-icon>
                </div>
                <h5 className="text-dark">Theatre</h5>
              </Link>
              <Link
                className="shadow bg-light d-flex w-100 rounded my-2 p-2 text-decoration-none pt-3"
                to={"/events?category=Charity"}
              >
                <div className="px-3">
                  <box-icon color="#DC7C63 " name="donate-heart"></box-icon>
                </div>
                <h5 className="text-dark">Charity</h5>
              </Link>
              <Link
                className="shadow bg-light d-flex w-100 rounded my-2 p-2 text-decoration-none pt-3"
                to={"/events?category=Virtual"}
              >
                <div className="px-3">
                  <box-icon color="#DC7C63 " name="laptop"></box-icon>
                </div>
                <h5 className="text-dark">Virtual</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
