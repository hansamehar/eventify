import React, { useContext, useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import "../styles/common.css";
import img1 from "../assets/img1.png";
import EventCard from "../components/EventCard";
import { Authcontext } from "../context/contextAPI";
import RevenueChart from "../components/RevenueChart";
import { getDashboardDataAPI, getHomeEventAPI } from "../services/allAPI";
import BookingsChart from "../components/BookingsChart";

const AdminDashboard = () => {
  const { user } = useContext(Authcontext);
  const [metrics, setMetrics] = useState("");
  const [events, setEvents] = useState([]);
  console.log(events);

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

  const fetchDashboardData = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role === "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getDashboardDataAPI(reqHeader);
        if (result.status === 200) {
          setMetrics(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("admin access only");
    }
  };
  useEffect(() => {
    fetchDashboardData();
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
        <div
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          className="py-2 px-3 bg-light d-flex justify-content-between align-items-center"
        >
          <h4
            style={{
              fontFamily: '"Poiret One", sans-serif',
              fontWeight: "700",
            }}
          >
            Admin Dashboard
          </h4>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="h-100 col-md-12 col-lg-9 ">
              <div className="row">
                <div className="col-md-12 col-lg-4 my-3">
                  <div
                    style={{ height: "300px" }}
                    className="bg-light rounded px-4 pt-4"
                  >
                    <RevenueChart />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8 my-3">
                  <div
                    style={{ height: "300px" }}
                    className="bg-light rounded px-4 pt-3"
                  >
                    <BookingsChart />
                  </div>
                </div>
              </div>
              <div className="bg-light rounded my-1 p-2">
                <h6 className="px-2 pt-1">Popular Events</h6>
                <table className="table border table-responsive">
                  <tbody>
                    {events?.length > 0 ? (
                      events.slice(0, 3).map((event) => (
                        <tr>
                          <td>{event?.name}</td>
                          <td>{event?.category}</td>
                          <td>{event?.type}</td>
                          <td>{event?.venue}</td>
                        </tr>
                      ))
                    ) : (
                      <div className="text-danger text-center">No Events</div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="h-100 col-md-12 col-lg-3">
              <div className="h-100 d-flex flex-column justify-content-between align-items-center">
                <div
                  style={{ backgroundColor: "#4A8BC4" }}
                  className="text-white w-100 d-flex align-items-center rounded p-3 my-3"
                >
                  <div className="ps-2 pe-3">
                    <box-icon
                      size="md"
                      color="#D9E3F0"
                      name="calendar-event"
                    ></box-icon>
                  </div>
                  <div
                    className="px-3"
                    style={{
                      borderLeft: "1px solid rgba(169, 169, 169, 1)",
                      color: "#D9E3F0",
                    }}
                  >
                    <h5>Total Events</h5>

                    <h4 className="fw-bold">{metrics?.totalEvents}</h4>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#6A7F94" }}
                  className="text-white w-100 d-flex align-items-center rounded p-3 my-3"
                >
                  <div className="ps-2 pe-3">
                    <box-icon
                      size="md"
                      color="#D9E3F0"
                      name="barcode"
                    ></box-icon>
                  </div>
                  <div
                    className="px-3"
                    style={{
                      borderLeft: "1px solid rgba(169, 169, 169, 1)",
                      color: "#D9E3F0",
                    }}
                  >
                    <h5>Total Bookings</h5>

                    <h4 className="fw-bold">{metrics?.totalBookings}</h4>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#3A6A94" }}
                  className="text-white w-100 d-flex  align-items-center rounded p-3 my-3"
                >
                  <div className="ps-2 pe-3">
                    <box-icon size="md" color="#D9E3F0" name="money"></box-icon>
                  </div>
                  <div
                    className="px-3"
                    style={{
                      borderLeft: "1px solid rgba(169, 169, 169, 1)",
                      color: "#D9E3F0",
                    }}
                  >
                    <h5>Total Revenue</h5>

                    <h4 className="fw-bold">{metrics?.totalRevenue}</h4>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#6B98C4" }}
                  className="text-white w-100 d-flex  align-items-center rounded p-3 my-3"
                >
                  <div className="ps-2 pe-3">
                    <box-icon size="md" color="#D9E3F0" name="group"></box-icon>
                  </div>
                  <div
                    className="px-3"
                    style={{
                      borderLeft: "1px solid rgba(169, 169, 169, 1)",
                      color: "#D9E3F0",
                    }}
                  >
                    <h5>Total Users</h5>

                    <h4 className="fw-bold">{metrics?.totalUsers}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
