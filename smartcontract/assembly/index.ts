import { Event, eventsStorage, attendantsStorage } from './model';
import { context, ContractPromiseBatch, u128 } from "near-sdk-as";


 /**
  * @dev buying a book from the marketplace
  *   */ 
export function Register(id: string): void {
    const event = getEvent(id);
    const attendants = attendantsStorage.get(id);
    if (event == null) {
        throw new Error("Event not found");
    }
    assert(event.owner.toString() != context.sender.toString(),"You cannot Register your own event");
    assert(event.price.toString() == context.attachedDeposit.toString(), "attached deposit should be equal to registration price");
    ContractPromiseBatch.create(event.owner).transfer(context.attachedDeposit);
    event.increaseAttendants();
    attendants?.push(context.sender);
    eventsStorage.set(event.id, event);
}


/**
 * 
 * @param event - adding an event to the block-chain
 */
 export function setEvent(event: Event): void {
  let storedEvent = eventsStorage.get(event.id);
  if (storedEvent !== null) {
      throw new Error(`an event with id=${event.id} already exists`);
  }
  eventsStorage.set(event.id, Event.fromPayload(event));
}



export function getEvent(id: string): Event | null {
  return eventsStorage.get(id);
}


/**
 * 
 * A function that returns an array of events for all accounts
 * 
 * @returns an array of objects that represent an event
 */
 export function getEvents(): Array<Event> {
  return eventsStorage.values();
}



export function getAttendants(id: string): string[] | null {
  return attendantsStorage.get(id);
}


  export function changeLocation(id: string, _location: string): void {
    const event = getEvent(id);
    if (event == null) {
      throw new Error("event not found");
    }
    assert(event.owner.toString() == context.sender.toString(),"You don't have permission to change location");
    assert(_location.length > 0,"New location can't be empty");
    event.changeLocation(_location); 
    eventsStorage.set(event.id, event); 
  }

  export function endEvent(id: string): void {
    const event = getEvent(id);
    if (event == null) {
      throw new Error("event not found");
    }
    assert(event.owner.toString() == context.sender.toString(),"Only the owner can end the event");
    
    attendantsStorage.delete(event.id);
    eventsStorage.delete(event.id); 
  }


  




 

