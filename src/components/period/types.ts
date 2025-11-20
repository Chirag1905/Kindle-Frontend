// Type definitions for the Period Calendar components
import { EventInput } from "@fullcalendar/core";

export interface CalendarEvent extends EventInput {
  id?: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  extendedProps: {
    calendar: string;
    teacherId?: string;
    subjectId?: string;
    batchId?: string;
    isBreak?: boolean;
  };
}