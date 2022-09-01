import { Event, eventsStorage, attendantsStorage  } from './model';
import { context, ContractPromiseBatch, u128 } from "near-sdk-as";


 /**
  * @dev buying a ticket for an event from the marketplace
  *   */ 
export function Register(id: string): void {
    const event = getEvent(id);
    const attendants = attendantsStorage.get(id);
    if (event == null) {
        throw new Error("Event not found");
    }
    assert(event.owner.toString() != context.sender.toString(),"You cannot Register your own event");
    assert(event.price.toString() == context.attachedDeposit.toString(), "attached deposit should be equal to registration price");
    assert(event.deadlineRegister >= context.blockTimestamp, "Registering period for event is over");
    
    if(attendants == null){
      attendantsStorage.set(id, [context.sender]);
    }else{
      // users can only register once
      assert(attendants.indexOf(context.sender) == -1, "Already registered for event");
      attendants.push(context.sender);
      attendantsStorage.set(id, attendants);  
    }
    ContractPromiseBatch.create(event.owner).transfer(context.attachedDeposit);
    event.increaseAttendants();
    eventsStorage.set(event.id, event);
}


 /**
  * @dev buying a ticket for an event from the marketplace for a different user
  *   */ 
  export function RegisterAnotherUser(id: string, user: string): void {
    const event = getEvent(id);
    const attendants = attendantsStorage.get(id);
    if (event == null) {
        throw new Error("Event not found");
    }
    assert(event.owner.toString() != context.sender.toString(),"You cannot Register your own event");
    assert(event.price.toString() == context.attachedDeposit.toString(), "attached deposit should be equal to registration price");
    assert(event.deadlineRegister >= context.blockTimestamp, "Registering period for event is over");
    // accountIds on testnet ends with .testnet
    assert(user.length > 8, "Invalid accountId for user");
    if(attendants == null){
      attendantsStorage.set(id, [user]);
    }else{
      // users can only register once
      assert(attendants.indexOf(user) == -1, "Already registered for event");
      attendants.push(user);
      attendantsStorage.set(id, attendants);  
    }
    ContractPromiseBatch.create(event.owner).transfer(context.attachedDeposit);
    event.increaseAttendants();
    eventsStorage.set(event.id, event);
}


/**
 * @dev allow users to add an event to the blockchain
 * @param event - adding an event to the block-chain
 */
 export function setEvent(event: Event): void {
  let storedEvent = eventsStorage.get(event.id);
  if (storedEvent !== null) {
      throw new Error(`an event with id=${event.id} already exists`);
  }
  assert(event.deadlineRegister > context.blockTimestamp, "Deadline for registering period has to greater than the current timestamp");
  assert(event.ends > event.deadlineRegister, "The time event ends has to be greater than the deadline for registering period");
  assert(event.location.length > 0, "Empty location");
  assert(event.image.length > 0, "Empty image url");
  assert(event.title.length > 0, "Empty title");
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

  /**
   * @dev allow events' owners to change the location of an event
   * @param id of event
   * @param _location 
   * @notice events' owners are only able to change the location before the deadline for registering
   */
  export function changeLocation(id: string, _location: string): void {
    const event = getEvent(id);
    if (event == null) {
      throw new Error("event not found");
    }
    assert(event.owner.toString() == context.sender.toString(),"You don't have permission to change location");
    assert(event.deadlineRegister > context.blockTimestamp, "You're unable to change the location of event after the deadline for registering is over");
    assert(_location.length > 0,"New location can't be empty");
    event.changeLocation(_location); 
    eventsStorage.set(event.id, event); 
  }

    /**
     * @dev allow events' owners to delete their event from storage after their events have ended
     * @notice deletion of events can only occur if they are over
     * @param id of event
     */
  export function endEvent(id: string): void {
    const event = getEvent(id);
    if (event == null) {
      throw new Error("event not found");
    }
    assert(event.owner.toString() == context.sender.toString(),"Only the owner can end the event");
    assert(event.ends > context.blockTimestamp, "Event isn't over yet");
    attendantsStorage.delete(event.id);
    eventsStorage.delete(event.id); 
  }


  




 

