import { PersistentUnorderedMap, context, u128 } from "near-sdk-as";



@nearBindgen
export class Event {
    id: string;
    title: string;
    dateandtime: string;
    image: string;
    description: string;
    location: string;
    price: u128;
    owner: string;
    attendants: u32;

    public static fromPayload(payload: Event): Event {
        const event = new Event();
        event.id = payload.id;
        event.title = payload.title;
        event.dateandtime = payload.dateandtime;
        event.image = payload.image;
        event.description = payload.description;
        event.location = payload.location;
        event.price = payload.price;
        event.owner = context.sender;
        event.attendants = payload.attendants;
        return event;
    }
   



    public changeLocation(_location: string): void {
        this.location = _location;
    }

    public increaseAttendants(): void {
        this.attendants = this.attendants + 1;
    }

}

export const eventsStorage = new PersistentUnorderedMap<string, Event>("LISTED_EVENTS");

export const attendantsStorage = new PersistentUnorderedMap<string, string[]>("LISTED_ATTENDANTS");
