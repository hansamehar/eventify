import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import "../styles/common.css";
import EventCard from "../components/EventCard";
import { Authcontext } from "../context/contextAPI";
import { useContext } from "react";
import AddEvent from "../components/addEvent";
import { useEffect } from "react";
import { getEventAPI } from "../services/allAPI";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EventContext } from "../context/ResponseContext";
import { useLocation } from "react-router-dom";

const Events = () => {
  const location = useLocation();
  const { user } = useContext(Authcontext);
  const { eventResponse } = useContext(EventContext);

  const [allEvents, setAllEvents] = useState([]);
  const [searchkey, setSearchkey] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    setSelectedCategory(category);
  }, [location.search]);

  const getevents = async () => {
    try {
      const result = await getEventAPI(searchkey);
      if (result.status == 200) {
        setAllEvents(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const filteredEvents = selectedCategory
    ? allEvents.filter((event) => event.category === selectedCategory)
    : allEvents;

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  useEffect(() => {
    getevents();
  }, [searchkey, eventResponse]);
  useEffect(() => {
    const uniqueCategories = new Set();

    allEvents.forEach((event) => {
      uniqueCategories.add(event.category);
    });

    setCategories([...uniqueCategories]);
  }, [allEvents]);

  return (
    <>
      <style>{`
                .scrollable-container::-webkit-scrollbar {
          display: none; 
        }
      `}</style>
      {user ? <SideMenu /> : <Header />}
      <div className={user && "maindiv"}>
        <div className="content">
          <div
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: "9",
            }}
            className="bg-light d-flex justify-content-between align-items-center py-2 px-3"
          >
            <form class="w-50 ">
              <input
                onChange={(e) => setSearchkey(e.target.value)}
                class="form-control rounded-pill "
                type="text "
                placeholder="Search for Events"
                style={{
                  backgroundColor: "#E1E8F3",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </form>
            {user.role == "admin" && (
              <div>
                <AddEvent />
              </div>
            )}
          </div>
          <h3
            style={{
              fontFamily: '"Poiret One", sans-serif',
              fontWeight: "700",
            }}
            className="px-lg-5 pt-4 pb-2"
          >
            Events :
          </h3>
          <div
            className=" d-flex justify-content-between mx-lg-5 p-auto my-lg-3 scrollable-container"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            <button
              style={{
                backgroundColor: "#3E4A7A",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
              onClick={() => setSelectedCategory("")}
              className="btn rounded-pill"
            >
              All
            </button>
            {categories.map((item, index) => (
              <button
                style={{ border: "1px solid #3E4A7A", color: "#3E4A7A" }}
                className={
                  selectedCategory == item
                    ? "btn rounded-pill"
                    : "btn border rounded-pill"
                }
                onClick={() => setSelectedCategory(item)}
                key={index}
              >
                {item}
              </button>
            ))}
          </div>

          <div>
            <div className="m-4 d-flex justify-content-evenly flex-wrap gap-5 mx-4">
              {currentEvents?.length > 0 ? (
                currentEvents.map((event) => (
                  <EventCard key={event?._id} event={event} />
                ))
              ) : (
                <div className="text-danger text-center">No Events</div>
              )}
            </div>
            {currentEvents?.length > 0 && (
              <div className=" m-2 d-flex justify-content-center">
                <nav>
                  <ul className="pagination ">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link "
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &laquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link "
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link "
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
        {!user && <Footer />}
      </div>
    </>
  );
};

export default Events;
