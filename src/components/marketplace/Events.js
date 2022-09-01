import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddEvent from "./AddEvent";
import Event from "./Event";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getEvents as getEventList,
  Register,
  createEvent,
  changeLocation,
  endEvent,
} from "../../utils/marketplace";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const account = window.walletConnection.account();

  
  const getEvents = useCallback(async () => {
    try {
      setLoading(true);
      setEvents(await getEventList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addEvent = async (data) => {
    setLoading(true);

    try {
      await createEvent(data).then((resp) => {
        toast(<NotificationSuccess text="Event added successfully." />);
        getEvents();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to add event" />);
    } finally {
      setLoading(false);
    }
  };



  const endevent = async (Id) => {
    setLoading(true);

    try {
      await endEvent(Id).then((resp) => {
        toast(<NotificationSuccess text="event ended successfully." />);
        getEvents();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed end event" />);
    } finally {
      setLoading(false);
    }
  };

  const changelocation = async (Id, _location) => {
    setLoading(true);

    try {
      await changeLocation(Id, _location).then((resp) => {
        toast(<NotificationSuccess text="location changed successfully." />);
        getEvents();
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to change location." />);
    } finally {
      setLoading(false);
    }
  };



  const register = async (id, price) => {
    try {
      await Register({
        id,
        price,
      }).then((resp) =>{
        toast(<NotificationSuccess text="Event applied successfully" />);
        getEvents()
      });
    } catch (error) {
      toast(<NotificationError text="Failed to apply for event." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">EVENT ARENA</h1>
            <AddEvent save={addEvent} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {events.map((_event) => (
              <Event
                event={{
                  ..._event,
                }}
                key={_event.id}
                register={register}
                changelocation={changelocation}
                endevent={endevent}
                isOwner = {account.accountId === _event.owner}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Events;
