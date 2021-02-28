import { Meeting } from '../database/dbobjects';
import { Controller } from 'tsoa';
export declare type MeetingCreationRequest = Pick<Meeting, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;
export declare type MeetingUpdateRequest = Pick<Meeting, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;
export declare class MeetingController extends Controller {
    getAll(): Promise<Meeting[]>;
    getById(id: string): Promise<Meeting>;
    create(createRequest: MeetingCreationRequest): Promise<Meeting>;
    remove(id: string): Promise<void>;
    update(id: string, updateRequest: MeetingUpdateRequest): Promise<void>;
    smartScheduling(id: string): Promise<Meeting>;
}
//# sourceMappingURL=meeting.controller.d.ts.map