import commonAPI from "./CommonAPI";
import SERVER_URL from "./serverURL";

export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/register`, reqBody);
};
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/login`, reqBody);
};

export const addEventAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/addevent`, reqBody, reqHeader);
};
export const getEventAPI = async (searchkey) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/getevent?search=${searchkey}`,
    {}
  );
};
export const getrelatedEventsAPI = async (category) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/getrelatedevents?category=${category}`,
    {}
  );
};
export const getHomeEventAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/gethomeevents`, {});
};
export const getEventDetailsAPI = async (id) => {
  return await commonAPI("GET", `${SERVER_URL}/geteventdetails/${id}`, {});
};
export const editEventAPI = async (reqBody, reqHeader, id) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/events/${id}/update`,
    reqBody,
    reqHeader
  );
};
export const deleteEventAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${SERVER_URL}/events/${id}/delete`,
    {},
    reqHeader
  );
};
export const addTicketAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/addtickets`,
    reqBody,
    reqHeader
  );
};
export const bookmarkEventAPI = async (id, reqHeader) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/addbookmark/${id}`,
    {},
    reqHeader
  );
};
export const getBookmarkEventAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/getbookmarks`, {}, reqHeader);
};
export const deleteBookmarkEventAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${SERVER_URL}/deletebookmark/${id}`,
    {},
    reqHeader
  );
};

export const bookTicketAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/addbooking`,
    reqBody,
    reqHeader
  );
};
export const getBookingsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/getbookings`, {}, reqHeader);
};

export const getUsersAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/getusers`, {}, reqHeader);
};

export const getRevenueAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/getrevenue`, {}, reqHeader);
};
export const getBookingsByCategoryAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/getbookingsbycategory`,
    {},
    reqHeader
  );
};
export const getDashboardDataAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/getdashboarddata`,
    {},
    reqHeader
  );
};
