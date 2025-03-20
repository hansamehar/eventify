import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { addTicketAPI } from "../services/allAPI";

function AddTicket({ eventDetails }) {
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    ticketType: "",
    ticketPrice: 0,
    quantity: 0,
    eventId: id,
  });
  useEffect(() => {
    eventDetails.type == "free" &&
      setTicket({ ...ticket, ticketType: "free", ticketPrice: 0 });
  }, [eventDetails.quantity]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTicket = async () => {
    const { ticketType, ticketPrice, quantity, eventId } = ticket;
    if (eventId && ticketType && quantity) {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (token && user.role == "admin") {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await addTicketAPI(ticket, reqHeader);
          if (result.status == 200) {
            console.log(result.data);

            alert("ticket added");
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

  return (
    <>
      <button
        style={{ backgroundColor: " #3E4A7A", color: "#fff" }}
        className="btn"
        onClick={handleShow}
      >
        Add Tickets
      </button>

      <Modal scrollable show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {eventDetails.type == "free" ? (
              <h4>Free Event</h4>
            ) : (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput"
                >
                  <Form.Label>Type of Ticket</Form.Label>
                  <Form.Select
                    onChange={(e) =>
                      setTicket({ ...ticket, ticketType: e.target.value })
                    }
                    aria-label="Default select example"
                  >
                    <option>Select Type</option>
                    <option value="general">General</option>
                    <option value="vip">VIP</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlIn">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="Number"
                    onChange={(e) =>
                      setTicket({
                        ...ticket,
                        ticketPrice: parseInt(e.target.value),
                      })
                    }
                    autoFocus
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInpu">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) =>
                  setTicket({ ...ticket, quantity: parseInt(e.target.value) })
                }
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addTicket}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTicket;
