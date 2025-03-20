import React, { useContext } from "react";

import { Link } from "react-router-dom";
import SERVER_URL from "../services/serverURL";
import { Authcontext } from "../context/contextAPI";
import EditEvent from "./EditEvent";
import {
  bookmarkEventAPI,
  deleteBookmarkEventAPI,
  deleteEventAPI,
} from "../services/allAPI";
import { EventContext } from "../context/ResponseContext";

const EventCard = ({ event, insideBookmarks }) => {
  const { setEventResponse } = useContext(EventContext);

  const { user } = useContext(Authcontext);
  const encodedImage = encodeURIComponent(event?.eventImg);

  const deleteEvent = async (id) => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "admin") {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await deleteEventAPI(id, reqHeader);
        if (result.status == 200) {
          setEventResponse("deleted");
          alert("event deleted");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("access denied.only admins");
    }
  };
  const bookmarkEvent = async (eventId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await bookmarkEventAPI(eventId, reqHeader);
        if (result.status == 200) {
          alert("event bookmarked");
        } else {
          alert(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("missing token");
    }
  };
  const deleteBookmark = async (eventId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await deleteBookmarkEventAPI(eventId, reqHeader);
        if (result.status == 200) {
          alert("Bookmark deleted");
        } else {
          alert(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("missing token");
    }
  };

  return (
    <>
      <div
        class="card shadow"
        style={{
          position: "relative",
          width: "12rem",
          height: "16rem",
          backgroundImage:
            "url(" + `${SERVER_URL}/uploads/${encodedImage}` + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ position: "absolute", right: "7px", top: "7px" }}>
          {user?.role == "user" &&
            (insideBookmarks ? (
              <button
                onClick={() => deleteBookmark(event?._id)}
                style={{
                  border: "none",
                  borderRadius: "50%",
                  padding: "4px 9px",
                }}
              >
                <box-icon size="xs" name="trash-alt"></box-icon>
              </button>
            ) : (
              <button
                style={{
                  border: "none",
                  borderRadius: "50%",
                  padding: "4px 9px",
                }}
                onClick={() => bookmarkEvent(event?._id)}
              >
                <box-icon size="xs" name="bookmarks"></box-icon>
              </button>
            ))}
          {user?.role == "admin" && (
            <>
              <EditEvent event={event} />
              <button
                className="m-1"
                style={{
                  border: "none",
                  borderRadius: "50%",
                  padding: "4px 9px",
                }}
                onClick={() => deleteEvent(event._id)}
              >
                <box-icon size="xs" name="trash-alt"></box-icon>
              </button>
            </>
          )}
        </div>
        <div
          class="card-body d-flex flex-column  justify-content-between rounded"
          style={{
            width: "10.5rem",
            height: "7.5rem",
            position: "absolute",
            transform: "translateX(-50%)",
            left: "50%",
            bottom: "10px",
            overflow: "hidden",
            background: " rgba(255, 255, 255, 1)",
          }}
        >
          <div>
            <h6
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              class="card-title"
            >
              {event?.name}
            </h6>
            <div className="d-flex ">
              <span
                style={{
                  backgroundColor: "rgba(255, 215, 0, 0.2)",
                  fontSize: "11px",
                }}
                className="px-1 rounded "
              >
                {event?.category}
              </span>
              {event.type == "free" && (
                <span
                  style={{
                    backgroundColor: "rgba(220, 124, 99,0.5)",
                    fontSize: "11px",
                  }}
                  className="px-1 ms-1 rounded"
                >
                  {event?.type}
                </span>
              )}
            </div>
          </div>

          <div>
            <Link
              to={`/viewevent/${event?._id}`}
              style={{
                backgroundColor: "#3E4A74",
                color: "white",
                fontSize: "13px",
              }}
              className="p-2 text-decoration-none rounded"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
