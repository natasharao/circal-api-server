import { Event } from '../database/dbobjects';
import { Controller } from 'tsoa';
export declare type EventCreationRequest = Pick<Event, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;
export declare type EventUpdateRequest = Pick<Event, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;
export declare class EventController extends Controller {
    getAll(): Promise<Event[]>;
    getById(id: string): Promise<Event>;
    create(createRequest: EventCreationRequest): Promise<Event>;
    remove(id: string): Promise<void>;
    update(id: string, updateRequest: EventUpdateRequest): Promise<void>;
    smartScheduling(id: string): Promise<Event>;
}
//# sourceMappingURL=event.controller.d.ts.map