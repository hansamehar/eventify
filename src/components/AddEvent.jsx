import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import img1 from "../assets/img1.png";
import { addEventAPI } from "../services/allAPI";
import { DateTimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { EventContext } from "../context/ResponseContext";

function AddEvent() {
  const { setEventResponse } = useContext(EventContext);
  const [event, setEvent] = useState({
    name: "",
    category: "",
    description: "",
    venue: "",
    dateTime: dayjs(),
    eventImg: "",
    type: "",
  });

  const [imagestatus, setimagestatus] = useState(false);
  const [preview, setPreview] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("");
    setimagestatus(false);
    setEvent({
      name: "",
      category: "",
      description: "",
      venue: "",
      dateTime: "",
      eventImg: "",
      type: "",
    });
  };
  const handleShow = () => setShow(true);

  const addEvent = async () => {
    const { name, category, description, venue, dateTime, eventImg, type } =
      event;
    if (
      name &&
      category &&
      description &&
      venue &&
      dateTime &&
      eventImg &&
      type
    ) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("category", category);
      reqBody.append("description", description);
      reqBody.append("venue", venue);
      reqBody.append("dateTime", dateTime);
      reqBody.append("type", type);
      reqBody.append("eventImg", eventImg);
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (token && user.role == "admin") {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await addEventAPI(reqBody, reqHeader);
          if (result.status == 200) {
            alert("event added");
            setEventResponse("added");
            handleClose();
          } else {
            alert(result.response.data);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("unauthorized");
      }
    } else {
      alert("Please fill the form.");
    }
  };

  useEffect(() => {
    if (
      event.eventImg.type == "image/png" ||
      event.eventImg.type == "image/jpeg" ||
      event.eventImg.type == "image/jpg"
    ) {
      setimagestatus(true);
      setPreview(URL.createObjectURL(event.eventImg));
    } else {
      setimagestatus(false);
      setEvent({ ...event, eventImg: "" });
    }
  }, [event.eventImg]);

  return (
    <>
      <button
        style={{ backgroundColor: " #3E4A7A", color: "#fff" }}
        className="btn"
        onClick={handleShow}
      >
        Add Event
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label>Image :</Form.Label>
              <div className="d-flex align-items-center justify-content-evenly">
                <div>
                  <Form.Control
                    type="file"
                    autoFocus
                    onChange={(e) =>
                      setEvent({ ...event, eventImg: e.target.files[0] })
                    }
                  />
                  {!imagestatus && (
                    <div className="text-primary mb-2">
                      *Upload only (jpg, jpeg, png) files here!!!
                    </div>
                  )}
                </div>
                <img
                  height={60}
                  className="m-1 rounded"
                  src={preview ? preview : img1}
                  alt=""
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Name : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category : </Form.Label>
              <Form.Select
                onChange={(e) =>
                  setEvent({ ...event, category: e.target.value })
                }
                aria-label="Default select example"
              >
                <option hidden>Select</option>
                <option value="Concerts">Concerts</option>
                <option value="Exhibitions">Exhibitions</option>
                <option value="Festivals">Festivals</option>
                <option value="Workshops">Workshops</option>
                <option value="Charity">Charity</option>
                <option value="Virtual">Virtual</option>
                <option value="Theatre">Theatre</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Venue : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEvent({ ...event, venue: e.target.value })}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date : </Form.Label>
              <DateTimeField
                onChange={(newValue) =>
                  setEvent({ ...event, dateTime: newValue })
                }
                autofocus
                format="L hh:mm a"
                disablePast
                clearable
              />{" "}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Type: </Form.Label>
              <Form.Select
                onChange={(e) => setEvent({ ...event, type: e.target.value })}
                aria-label="Default select example"
              >
                <option hidden>Select</option>
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addEvent}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEvent;
