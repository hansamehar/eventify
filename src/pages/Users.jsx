import React, { useEffect, useState } from "react";
import "../styles/common.css";
import { getUsersAPI } from "../services/allAPI";
import SideMenu from "../components/SideMenu";

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  const getUsers = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getUsersAPI(reqHeader);
        if (result.status == 200) {
          setUsers(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("admin access only");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <SideMenu />
      <div className="maindiv">
        <div className="content mx-5">
          <h3
            style={{
              fontFamily: '"Poiret One", sans-serif',
              fontWeight: "700",
            }}
            className="my-4"
          >
            Users :
          </h3>

          <table className="table table-responsive table-bordered">
            <thead>
              <tr>
                <th style={{ color: "#3E4A7A" }}>#</th>
                <th style={{ color: "#3E4A7A" }}>Username</th>
                <th style={{ color: "#3E4A7A" }}>Email</th>
                <th style={{ color: "#3E4A7A" }}>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.user.username}</td>
                    <td>{user.user.email}</td>
                    <td>
                      {user.allbookings.length > 0 ? (
                        <div className="accordion" id={`accordion-${index}`}>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={`heading-${index}`}
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                style={{ outline: "none", boxShadow: "none" }}
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse-${index}`}
                              >
                                View Bookings
                              </button>
                            </h2>
                            <div
                              id={`collapse-${index}`}
                              className="accordion-collapse collapse"
                              aria-labelledby={`heading-${index}`}
                              data-bs-parent={`#accordion-${index}`}
                            >
                              <div className="accordion-body">
                                <table className="table text-center table-bordered ">
                                  <thead>
                                    <tr>
                                      <th>Booking Id</th>
                                      <th>Quantity</th>
                                      <th>Total Price</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {user.allbookings.map((booking) => (
                                      <tr key={booking._id}>
                                        <td>{booking._id}</td>
                                        <td>{booking.quantity}</td>
                                        <td>{booking.totalPrice}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p>No bookings</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
