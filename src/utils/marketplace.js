import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createEvent(event) {
  event.id = uuid4();
  event.price = parseNearAmount(event.price + "");
  return window.contract.setEvent({ event });
}


export function changeLocation( Id, _location ) {
  return window.contract.editDescription( { id: Id, _location: _location }, GAS );
}

export function endEvent( Id ) {
  return window.contract.endEvent( { id: Id }, GAS );
}


export function getEvents() {
  return window.contract.getEvents();
}

export async function Register({ id, price }) {
  await window.contract.Register({ id: id }, GAS, price);
}
