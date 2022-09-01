import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddEvent = ({ save }) => {
  const [title, setTitle] = useState("");
  const [dateandtime, setDateAndTime] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(0);
  const [price, setPrice] = useState(0);
 
  const isFormFilled = () => title && dateandtime && image && description && location && price;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Event</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputTitle"
              label="event title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter title of event"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDateandTime"
              label="Date and Time"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Date and time"
                onChange={(e) => {
                  setDateAndTime(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputImage"
              label="ImageURL"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Image url"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Event description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>


            <FloatingLabel
              controlId="inputLocation"
              label="Location"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </FloatingLabel>
            
            <FloatingLabel
              controlId="inputPrice"
              label="Price"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FloatingLabel>

           
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                title,
                dateandtime,
                image,
                description,
                location,
                price,
              });
              handleClose();
            }}
          >
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddEvent.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddEvent;
