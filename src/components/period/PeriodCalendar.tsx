"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { PositionedModal } from "@/components/ui/PositionedModal";
import { FilterSection } from "./FilterSection";
import { EventModal } from "./EventModal";
import { ConfirmationModals } from "./ConfirmationModals";
import { renderEventContent } from "./eventRendering";
import { CalendarEvent } from "./types";

const PeriodCalendar: React.FC = () => {
  // Event state
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedEventIds, setSelectedEventIds] = useState<Set<string>>(new Set());

  // Modal states
  const { isOpen, openModal, closeModal } = useModal();
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  // Form state
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [eventTeacher, setEventTeacher] = useState("");
  const [eventSubject, setEventSubject] = useState("");
  const [isBreak, setIsBreak] = useState(false);
  const [eventLevel, setEventLevel] = useState("");

  // Filter state
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState("");
  const [selectedBatchFilter, setSelectedBatchFilter] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("");

  // Update confirmation state
  const [pendingEventUpdate, setPendingEventUpdate] = useState<{
    eventId: string;
    oldStart: string;
    oldEnd: string;
    newStart: string;
    newEnd: string;
    revertCallback: () => void;
  } | null>(null);

  const calendarRef = useRef<FullCalendar>(null);

  // Initialize with sample events
  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Mathematics Class",
        start: new Date().toISOString().split("T")[0] + "T10:00:00",
        end: new Date().toISOString().split("T")[0] + "T11:30:00",
        extendedProps: { 
          calendar: "Primary", 
          teacherId: "1", 
          subjectId: "1", 
          batchId: "1" 
        },
      },
      {
        id: "2",
        title: "Physics Lab",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T14:00:00",
        end: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T15:30:00",
        extendedProps: { 
          calendar: "Primary", 
          teacherId: "2", 
          subjectId: "2", 
          batchId: "2" 
        },
      },
      {
        id: "3",
        title: "Break Time",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0] + "T09:00:00",
        end: new Date(Date.now() + 172800000).toISOString().split("T")[0] + "T09:15:00",
        extendedProps: { 
          calendar: "Primary", 
          isBreak: true
        },
      },
    ]);
  }, []);

  // Keyboard event listener for Delete key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selectedEventIds.size > 0) {
          setShowDeleteConfirmation(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEventIds]);

  // Event handlers
  const handleDeleteSelectedEvents = () => {
    setEvents(prevEvents => 
      prevEvents.filter(event => !selectedEventIds.has(event.id!))
    );
    setSelectedEventIds(new Set());
    setShowDeleteConfirmation(false);
  };

  const handleCalendarClick = () => {
    if (selectedEventIds.size > 0) {
      setSelectedEventIds(new Set());
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (selectedEventIds.size > 0) {
      setSelectedEventIds(new Set());
    }
    
    resetModalFields();
    setEventStartDate(selectInfo.startStr.split('T')[0]);
    setEventEndDate(selectInfo.endStr?.split('T')[0] || selectInfo.startStr.split('T')[0]);
    
    const startTime = new Date(selectInfo.start);
    const endTime = new Date(selectInfo.end);
    
    setEventStartTime(startTime.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
    setEventEndTime(endTime.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
    
    const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    setEventDuration(durationMinutes.toString());
    
    const target = selectInfo.jsEvent?.target as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      setModalPosition({ x: rect.left, y: rect.top });
    }
    
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventId = clickInfo.event.id;
    
    setSelectedEventIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(eventId)) {
        newSelected.delete(eventId);
      } else {
        newSelected.add(eventId);
      }
      return newSelected;
    });
    
    clickInfo.jsEvent.preventDefault();
  };

  const handleEventDoubleClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    
    if (event.start) {
      setEventStartTime(event.start.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }
    
    if (event.end) {
      setEventEndTime(event.end.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
      
      if (event.start && event.end) {
        const durationMinutes = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
        setEventDuration(durationMinutes.toString());
      }
    }
    
    setEventLevel(event.extendedProps.calendar);
    setEventTeacher(event.extendedProps.teacherId || "");
    setEventSubject(event.extendedProps.subjectId || "");
    setIsBreak(event.extendedProps.isBreak || false);
    
    const target = clickInfo.jsEvent?.target as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      setModalPosition({ x: rect.left, y: rect.top });
    }
    
    openModal();
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const { event, oldEvent } = dropInfo;
    
    setPendingEventUpdate({
      eventId: event.id,
      oldStart: oldEvent.start?.toISOString() || '',
      oldEnd: oldEvent.end?.toISOString() || '',
      newStart: event.start?.toISOString() || '',
      newEnd: event.end?.toISOString() || '',
      revertCallback: () => dropInfo.revert()
    });
    
    setShowUpdateConfirmation(true);
  };

  const handleEventResize = (resizeInfo: any) => {
    const { event, oldEvent } = resizeInfo;
    
    setPendingEventUpdate({
      eventId: event.id,
      oldStart: oldEvent.start?.toISOString() || '',
      oldEnd: oldEvent.end?.toISOString() || '',
      newStart: event.start?.toISOString() || '',
      newEnd: event.end?.toISOString() || '',
      revertCallback: () => resizeInfo.revert()
    });
    
    setShowUpdateConfirmation(true);
  };

  const handleConfirmUpdate = () => {
    if (pendingEventUpdate) {
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === pendingEventUpdate.eventId
            ? {
                ...e,
                start: pendingEventUpdate.newStart,
                end: pendingEventUpdate.newEnd,
              }
            : e
        )
      );
    }
    
    setShowUpdateConfirmation(false);
    setPendingEventUpdate(null);
  };

  const handleCancelUpdate = () => {
    if (pendingEventUpdate) {
      pendingEventUpdate.revertCallback();
    }
    
    setShowUpdateConfirmation(false);
    setPendingEventUpdate(null);
  };

  const handleAddOrUpdateEvent = () => {
    const startDateTime = eventStartTime 
      ? `${eventStartDate}T${eventStartTime}:00` 
      : eventStartDate;
    const endDateTime = eventEndTime 
      ? `${eventEndDate}T${eventEndTime}:00` 
      : eventEndDate;

    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: startDateTime,
                end: endDateTime,
                allDay: !eventStartTime,
                extendedProps: { 
                  calendar: eventLevel,
                  teacherId: isBreak ? "" : eventTeacher,
                  subjectId: isBreak ? "" : eventSubject,
                  isBreak: isBreak,
                },
              }
            : event
        )
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
        allDay: !eventStartTime,
        extendedProps: { 
          calendar: eventLevel,
          teacherId: isBreak ? "" : eventTeacher,
          subjectId: isBreak ? "" : eventSubject,
          isBreak: isBreak,
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
      closeModal();
      resetModalFields();
    }
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventStartTime("");
    setEventEndTime("");
    setEventDuration("");
    setEventTeacher("");
    setEventSubject("");
    setIsBreak(false);
    setEventLevel("");
    setSelectedEvent(null);
  };

  const handleAddEventClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    resetModalFields();
    const target = e.target as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      setModalPosition({ 
        x: rect.left, 
        y: rect.bottom + 10 
      });
    }
    openModal();
  };

  // Filter events based on selected teacher, batch, and subject
  const filteredEvents = events.filter(event => {
    const teacherMatch = !selectedTeacherFilter || event.extendedProps.teacherId === selectedTeacherFilter;
    const batchMatch = !selectedBatchFilter || event.extendedProps.batchId === selectedBatchFilter;
    const subjectMatch = !selectedSubjectFilter || event.extendedProps.subjectId === selectedSubjectFilter;
    return teacherMatch && batchMatch && subjectMatch;
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <FilterSection
        selectedTeacherFilter={selectedTeacherFilter}
        setSelectedTeacherFilter={setSelectedTeacherFilter}
        selectedBatchFilter={selectedBatchFilter}
        setSelectedBatchFilter={setSelectedBatchFilter}
        selectedSubjectFilter={selectedSubjectFilter}
        setSelectedSubjectFilter={setSelectedSubjectFilter}
        onAddEvent={handleAddEventClick}
      />
      
      <div 
        className="custom-calendar"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('.fc-event') === null && target.closest('button') === null) {
            handleCalendarClick();
          }
        }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "",
            center: "",
            right: "",
          }}
          events={filteredEvents}
          selectable={true}
          editable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventDidMount={(info) => {
            info.el.addEventListener('dblclick', (e) => {
              const mockClickInfo = {
                event: info.event,
                jsEvent: e,
                view: info.view
              };
              handleEventDoubleClick(mockClickInfo as any);
            });
          }}
          eventContent={(eventInfo) => renderEventContent(eventInfo, selectedEventIds)}
          dayHeaderFormat={{ weekday: 'short' }}
          allDaySlot={false}
          slotMinTime="06:00:00"
          slotMaxTime="20:00:00"
          height="auto"
        />
      </div>

      {/* Event Modal */}
      <PositionedModal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[420px] p-4 lg:p-5"
        position={modalPosition}
      >
        <EventModal
          selectedEvent={selectedEvent}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          eventStartDate={eventStartDate}
          setEventStartDate={setEventStartDate}
          eventEndDate={eventEndDate}
          setEventEndDate={setEventEndDate}
          eventStartTime={eventStartTime}
          setEventStartTime={setEventStartTime}
          eventEndTime={eventEndTime}
          setEventEndTime={setEventEndTime}
          eventDuration={eventDuration}
          setEventDuration={setEventDuration}
          eventTeacher={eventTeacher}
          setEventTeacher={setEventTeacher}
          eventSubject={eventSubject}
          setEventSubject={setEventSubject}
          isBreak={isBreak}
          setIsBreak={setIsBreak}
          eventLevel={eventLevel}
          setEventLevel={setEventLevel}
          onSave={handleAddOrUpdateEvent}
          onDelete={selectedEvent ? handleDeleteEvent : undefined}
          onClose={closeModal}
        />
      </PositionedModal>

      {/* Confirmation Modals */}
      <ConfirmationModals
        showDeleteConfirmation={showDeleteConfirmation}
        onDeleteConfirm={handleDeleteSelectedEvents}
        onDeleteCancel={() => setShowDeleteConfirmation(false)}
        selectedEventCount={selectedEventIds.size}
        showUpdateConfirmation={showUpdateConfirmation}
        onUpdateConfirm={handleConfirmUpdate}
        onUpdateCancel={handleCancelUpdate}
        pendingEventUpdate={pendingEventUpdate}
      />
    </div>
  );
};

export default PeriodCalendar;