import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import img1 from "../assets/img1.png";
import SERVER_URL from "../services/serverURL";
import { editEventAPI } from "../services/allAPI";
import dayjs from "dayjs";
import { DateTimeField } from "@mui/x-date-pickers";
import { EventContext } from "../context/ResponseContext";

function EditEvent({ event }) {
  const { setEventResponse } = useContext(EventContext);

  const [updateEvent, setupdateEvent] = useState({
    id: event._id,
    name: event.name,
    category: event.category,
    description: event.description,
    venue: event.venue,
    dateTime: dayjs(event.dateTime),
    eventImg: "",
    type: event.type,
  });

  const [imagestatus, setimagestatus] = useState(false);
  const [preview, setPreview] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("");
    setimagestatus(false);
    setupdateEvent({
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

  const editEvent = async () => {
    const { id, name, category, description, venue, dateTime, eventImg, type } =
      updateEvent;
    if (name && category && description && venue && dateTime && type) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("category", category);
      reqBody.append("description", description);
      reqBody.append("venue", venue);
      reqBody.append("dateTime", dateTime);
      reqBody.append("type", type);
      preview
        ? reqBody.append("eventImg", eventImg)
        : reqBody.append("eventImg", event.eventImg);
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (token && user.role == "admin") {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await editEventAPI(reqBody, reqHeader, id);
          if (result.status == 200) {
            alert("event edited");
            setEventResponse("edited");
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
      updateEvent.eventImg.type == "image/png" ||
      updateEvent.eventImg.type == "image/jpeg" ||
      updateEvent.eventImg.type == "image/jpg"
    ) {
      setimagestatus(true);
      setPreview(URL.createObjectURL(updateEvent.eventImg));
    } else {
      setimagestatus(false);
      setupdateEvent({ ...updateEvent, eventImg: "" });
    }
  }, [updateEvent.eventImg]);

  return (
    <>
      <button
        style={{ border: "none", borderRadius: "50%", padding: "4px 9px" }}
        onClick={handleShow}
      >
        <box-icon size="xs" name="edit"></box-icon>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
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
                      setupdateEvent({
                        ...updateEvent,
                        eventImg: e.target.files[0],
                      })
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
                  src={
                    preview
                      ? preview
                      : `${SERVER_URL}/uploads/${event?.eventImg}`
                  }
                  alt=""
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>updateEvent Name : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setupdateEvent({ ...updateEvent, name: e.target.value })
                }
                autoFocus
                defaultValue={updateEvent.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setupdateEvent({ ...updateEvent, category: e.target.value })
                }
                autoFocus
                defaultValue={updateEvent.category}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setupdateEvent({
                    ...updateEvent,
                    description: e.target.value,
                  })
                }
                autoFocus
                defaultValue={updateEvent.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Venue : </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setupdateEvent({ ...updateEvent, venue: e.target.value })
                }
                autoFocus
                defaultValue={updateEvent.venue}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date/Time : </Form.Label>
              <DateTimeField
                onChange={(newValue) =>
                  setupdateEvent({
                    ...updateEvent,
                    dateTime: newValue.format("YYYY-MM-DD HH:mm A"),
                  })
                }
                autofocus
                defaultValue={
                  updateEvent.dateTime.isValid ? updateEvent.dateTime : ""
                }
                format="L hh:mm a"
                disablePast
                clearable
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Type: </Form.Label>
              <Form.Select
                onChange={(e) =>
                  setupdateEvent({ ...updateEvent, type: e.target.value })
                }
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
          <Button onClick={editEvent} variant="primary">
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEvent;
