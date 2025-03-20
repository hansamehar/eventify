import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import "../styles/common.css";
import EventCard from "../components/EventCard";

import { Authcontext } from "../context/contextAPI";
import { useContext } from "react";

import { useEffect } from "react";
import { getBookmarkEventAPI } from "../services/allAPI";

const Bookmarks = () => {
  const [allEvents, setAllEvents] = useState([]);

  const getevents = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "user") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getBookmarkEventAPI(reqHeader);
        if (result.status == 200) {
          setAllEvents(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("please login");
    }
  };

  useEffect(() => {
    getevents();
  }, []);

  return (
    <div className="maindiv">
      <SideMenu />
      <div className="content  mx-5">
        <h3
          style={{ fontFamily: '"Poiret One", sans-serif', fontWeight: "700" }}
          className="my-4"
        >
          Bookmarks :
        </h3>

        <div className="d-flex justify-content-evenly gap-3 flex-wrap">
          {allEvents?.length > 0 ? (
            allEvents.map((event) => (
              <EventCard
                insideBookmarks={true}
                key={event?._id}
                event={event}
              />
            ))
          ) : (
            <div className="text-danger text-center">No Bookmarks</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
