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
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

// Custom positioned modal component
const PositionedModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  position: { x: number; y: number };
}> = ({ isOpen, onClose, className, children, position }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = React.useState(position);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      const modal = modalRef.current;
      const modalRect = modal.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = position.x;
      let adjustedY = position.y - 20; // Default offset

      // Check if modal goes off the right edge
      if (position.x + modalRect.width > viewportWidth) {
        adjustedX = viewportWidth - modalRect.width - 20; // 20px padding from edge
      }

      // Check if modal goes off the left edge
      if (adjustedX < 20) {
        adjustedX = 20; // 20px padding from edge
      }

      // Check if modal goes off the bottom edge
      if (position.y + modalRect.height > viewportHeight) {
        adjustedY = viewportHeight - modalRect.height - 20; // 20px padding from bottom
      }

      // Check if modal goes off the top edge
      if (adjustedY < 20) {
        adjustedY = 20; // 20px padding from top
      }

      setAdjustedPosition({ x: adjustedX, y: adjustedY });
    }
  }, [isOpen, position]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999">
      <div
        className="fixed inset-0"
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        className={`fixed rounded-3xl bg-white dark:bg-gray-900 shadow-xl ${className}`}
        style={{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    teacherId?: string;
    subjectId?: string;
    batchId?: string;
    isBreak?: boolean;
  };
}

const teacherOptions = [
  { id: "1", name: "Dr. Sarah Johnson" },
  { id: "2", name: "Prof. Michael Chen" },
  { id: "3", name: "Ms. Emily Davis" },
  { id: "4", name: "Mr. David Wilson" },
  { id: "5", name: "Dr. Lisa Anderson" },
];

const subjectOptions = [
  { id: "1", name: "Mathematics" },
  { id: "2", name: "Physics" },
  { id: "3", name: "Chemistry" },
  { id: "4", name: "Biology" },
  { id: "5", name: "English Literature" },
  { id: "6", name: "History" },
  { id: "7", name: "Computer Science" },
];

const batchOptions = [
  { id: "1", name: "Batch A - Morning", code: "BA-M" },
  { id: "2", name: "Batch B - Afternoon", code: "BB-A" },
  { id: "3", name: "Batch C - Evening", code: "BC-E" },
  { id: "4", name: "Batch D - Weekend", code: "BD-W" },
  { id: "5", name: "Batch E - Intensive", code: "BE-I" },
  { id: "6", name: "Batch F - Part-time", code: "BF-P" },
];

const PeriodCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [selectedEventIds, setSelectedEventIds] = useState<Set<string>>(new Set());
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [pendingEventUpdate, setPendingEventUpdate] = useState<{
    eventId: string;
    oldStart: string;
    oldEnd: string;
    newStart: string;
    newEnd: string;
    revertCallback: () => void;
  } | null>(null);
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
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState("");
  const [selectedBatchFilter, setSelectedBatchFilter] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("");
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  const durationOptions = [
    { value: "15", label: "15m" },
    { value: "30", label: "30m" },
    { value: "35", label: "35m" },
    { value: "40", label: "40m" },
    { value: "45", label: "45m" },
    { value: "50", label: "50m" },
    { value: "55", label: "55m" },
    { value: "60", label: "1h" },
    { value: "65", label: "1h 5m" },
    { value: "70", label: "1h 10m" },
    { value: "75", label: "1h 15m" },
    { value: "80", label: "1h 20m" },
    { value: "85", label: "1h 25m" },
    { value: "90", label: "1h 30m" },
    { value: "95", label: "1h 35m" },
    { value: "100", label: "1h 40m" },
    { value: "105", label: "1h 45m" },
    { value: "110", label: "1h 50m" },
    { value: "115", label: "1h 55m" },
    { value: "120", label: "2h" },
    { value: "125", label: "2h 5m" },
    { value: "130", label: "2h 10m" },
    { value: "135", label: "2h 15m" },
    { value: "140", label: "2h 20m" },
    { value: "145", label: "2h 25m" },
    { value: "150", label: "2h 30m" },
    { value: "155", label: "2h 35m" },
    { value: "160", label: "2h 40m" },
    { value: "165", label: "2h 45m" },
    { value: "170", label: "2h 50m" },
    { value: "175", label: "2h 55m" },
    { value: "180", label: "3h" },
  ];

  // Helper function to calculate end time based on start time and duration
  const calculateEndTime = (startTime: string, durationMinutes: string) => {
    if (!startTime || !durationMinutes) return "";
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + parseInt(durationMinutes) * 60000);
    
    return endDate.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Helper function to calculate duration based on start and end time
  const calculateDuration = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return "";
    
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);
    
    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);
    
    const durationMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    return durationMinutes > 0 ? durationMinutes.toString() : "";
  };

  // Handler for duration change
  const handleDurationChange = (duration: string) => {
    setEventDuration(duration);
    if (eventStartTime && duration) {
      const newEndTime = calculateEndTime(eventStartTime, duration);
      setEventEndTime(newEndTime);
    }
  };

  // Handler for start time change
  const handleStartTimeChange = (startTime: string) => {
    setEventStartTime(startTime);
    if (eventDuration && startTime) {
      const newEndTime = calculateEndTime(startTime, eventDuration);
      setEventEndTime(newEndTime);
    } else if (eventEndTime && startTime) {
      const newDuration = calculateDuration(startTime, eventEndTime);
      setEventDuration(newDuration);
    }
  };

  // Handler for end time change
  const handleEndTimeChange = (endTime: string) => {
    setEventEndTime(endTime);
    if (eventStartTime && endTime) {
      const newDuration = calculateDuration(eventStartTime, endTime);
      setEventDuration(newDuration);
    }
  };

  // Handler for break toggle
  const handleBreakToggle = (checked: boolean) => {
    setIsBreak(checked);
    if (checked) {
      setEventTeacher("");
      setEventSubject("");
    }
  };

  useEffect(() => {
    // Initialize with some events
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
        title: "Chemistry Workshop",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0] + "T09:00:00",
        end: new Date(Date.now() + 172800000).toISOString().split("T")[0] + "T10:30:00",
        extendedProps: { 
          calendar: "Primary", 
          teacherId: "3", 
          subjectId: "3", 
          batchId: "3" 
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

  const handleDeleteSelectedEvents = () => {
    setEvents(prevEvents => 
      prevEvents.filter(event => !selectedEventIds.has(event.id!))
    );
    setSelectedEventIds(new Set());
    setShowDeleteConfirmation(false);
  };

  const handleCalendarClick = (clickInfo: any) => {
    // Clear selection when clicking on empty calendar areas
    if (selectedEventIds.size > 0) {
      setSelectedEventIds(new Set());
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // Clear any selected events when selecting a new date range
    if (selectedEventIds.size > 0) {
      setSelectedEventIds(new Set());
    }
    
    resetModalFields();
    setEventStartDate(selectInfo.startStr.split('T')[0]);
    setEventEndDate(selectInfo.endStr?.split('T')[0] || selectInfo.startStr.split('T')[0]);
    
    // Extract time from the selected slot
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
    
    // Calculate duration in minutes
    const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    setEventDuration(durationMinutes.toString());
    
    // Capture click position for modal positioning
    const target = selectInfo.jsEvent?.target as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      setModalPosition({ 
        x: rect.left, 
        y: rect.top 
      });
    }
    
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventId = clickInfo.event.id;
    
    // Toggle selection of the clicked event
    setSelectedEventIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(eventId)) {
        newSelected.delete(eventId);
      } else {
        newSelected.add(eventId);
      }
      return newSelected;
    });
    
    // Prevent the event from bubbling to avoid double-click detection issues
    clickInfo.jsEvent.preventDefault();
  };

  const handleEventDoubleClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    
    // Extract time from the existing event
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
      
      // Calculate duration
      if (event.start && event.end) {
        const durationMinutes = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
        setEventDuration(durationMinutes.toString());
      }
    }
    
    setEventLevel(event.extendedProps.calendar);
    setEventTeacher(event.extendedProps.teacherId || "");
    setEventSubject(event.extendedProps.subjectId || "");
    setIsBreak(event.extendedProps.isBreak || false);
    
    // Capture click position for modal positioning
    const target = clickInfo.jsEvent?.target as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      setModalPosition({ 
        x: rect.left, 
        y: rect.top 
      });
    }
    
    openModal();
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const { event, oldEvent } = dropInfo;
    
    // Store the pending update information
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
    
    // Store the pending update information  
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
      // Update the event in the events array
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
      // Revert the visual changes
      pendingEventUpdate.revertCallback();
    }
    
    setShowUpdateConfirmation(false);
    setPendingEventUpdate(null);
  };

  const handleAddOrUpdateEvent = () => {
    // Combine date and time for start and end
    const startDateTime = eventStartTime 
      ? `${eventStartDate}T${eventStartTime}:00` 
      : eventStartDate;
    const endDateTime = eventEndTime 
      ? `${eventEndDate}T${eventEndTime}:00` 
      : eventEndDate;

    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: startDateTime,
                end: endDateTime,
                allDay: !eventStartTime, // If no time specified, treat as all-day
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
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
        allDay: !eventStartTime, // If no time specified, treat as all-day
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

  // Filter events based on selected teacher, batch, and subject
  const filteredEvents = events.filter(event => {
    const teacherMatch = !selectedTeacherFilter || event.extendedProps.teacherId === selectedTeacherFilter;
    const batchMatch = !selectedBatchFilter || event.extendedProps.batchId === selectedBatchFilter;
    const subjectMatch = !selectedSubjectFilter || event.extendedProps.subjectId === selectedSubjectFilter;
    return teacherMatch && batchMatch && subjectMatch;
  });

  const renderEventContent = (eventInfo: EventContentArg) => {
    const teacherId = eventInfo.event.extendedProps.teacherId;
    const subjectId = eventInfo.event.extendedProps.subjectId;
    const isBreak = eventInfo.event.extendedProps.isBreak;
    const eventId = eventInfo.event.id;
    const isSelected = selectedEventIds.has(eventId);

    // Find teacher and subject data
    const teacher = teacherOptions.find((t: any) => t.id === teacherId);
    const subject = subjectOptions.find((s: any) => s.id === subjectId);

    // Create acronyms
    const teacherAcronym = teacher ? teacher.name.split(' ').map((word: string) => word[0]).join('') : '';
    const subjectCode = subject ? subject.name.split(' ').map((word: string) => word[0]).join('').toUpperCase() : '';

    // Calculate event duration in minutes
    const startTime = eventInfo.event.start;
    const endTime = eventInfo.event.end;
    let durationMinutes = 30; // default duration
    
    if (startTime && endTime) {
      durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    }

    // Show single row for events less than 45 minutes, full details for longer events
    const isShortEvent = durationMinutes < 45;
    
    // Apply styling based on break status and selection
    let eventClasses = '';
    let textClasses = '';
    
    if (isBreak) {
      // Break period: white background with brand border
      eventClasses = isSelected 
        ? 'ring-2 ring-brand-500 ring-offset-2 bg-white border-2 border-brand-600' 
        : 'bg-white border-2 border-brand-500';
      textClasses = 'text-black dark:text-gray-900';
    } else {
      // Regular event: brand background
      eventClasses = isSelected 
        ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-300 bg-brand-600' 
        : 'bg-brand-500';
      textClasses = 'text-white';
    }

    if (isShortEvent) {
      return (
        <div className={`flex items-center justify-center fc-event-main p-2 rounded-sm text-xs ${eventClasses}`}>
          <div className={`font-semibold text-center ${textClasses}`} style={isBreak ? { color: '#000000' } : {}}>
            {isBreak ? eventInfo.event.title : (subjectCode && teacherAcronym ? `${subjectCode} - ${teacherAcronym}` : eventInfo.event.title)}
          </div>
        </div>
      );
    }

    return (
      <div className={`flex flex-col fc-event-main p-2 rounded-sm text-xs ${eventClasses}`}>
        <div className={`font-semibold ${textClasses}`} style={isBreak ? { color: '#000000' } : {}}>
          {isBreak ? eventInfo.event.title : (subjectCode && teacherAcronym ? `${subjectCode} - ${teacherAcronym}` : eventInfo.event.title)}
        </div>
        {!isBreak && (
          <div className="opacity-90 text-xs">
            {subject && teacher ? `${subject.name} - ${teacher.name}` : ''}
          </div>
        )}
        <div className={`opacity-80 text-xs ${textClasses}`} style={isBreak ? { color: '#000000' } : {}}>
          {eventInfo.timeText}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Filter Dropdowns */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Filter by Teacher:
              </label>
              <select
                value={selectedTeacherFilter}
                onChange={(e) => setSelectedTeacherFilter(e.target.value)}
                className="h-8 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10"
              >
                <option value="">All Teachers</option>
                {teacherOptions.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Filter by Batch:
              </label>
              <select
                value={selectedBatchFilter}
                onChange={(e) => setSelectedBatchFilter(e.target.value)}
                className="h-8 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10"
              >
                <option value="">All Batches</option>
                {batchOptions.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Filter by Subject:
              </label>
              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="h-8 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10"
              >
                <option value="">All Subjects</option>
                {subjectOptions.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Add Event Button */}
          <button
            onClick={(e) => {
              resetModalFields();
              // Position modal near the button
              const target = e.target as HTMLElement;
              if (target) {
                const rect = target.getBoundingClientRect();
                setModalPosition({ 
                  x: rect.left, 
                  y: rect.bottom + 10 
                });
              }
              openModal();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add Event
          </button>
        </div>
      </div>
      
      <div 
        className="custom-calendar"
        onClick={(e) => {
          // Check if click is on the calendar background (not on an event)
          const target = e.target as HTMLElement;
          if (target.closest('.fc-event') === null && target.closest('button') === null) {
            handleCalendarClick(e);
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
            // Add double-click event listener to each event
            info.el.addEventListener('dblclick', (e) => {
              // Create a mock clickInfo object with the jsEvent
              const mockClickInfo = {
                event: info.event,
                jsEvent: e,
                view: info.view
              };
              handleEventDoubleClick(mockClickInfo as any);
            });
          }}
          eventContent={renderEventContent}
          dayHeaderFormat={{ weekday: 'short' }}
          allDaySlot={false}
          slotMinTime="06:00:00"
          slotMaxTime="20:00:00"
          height="auto"
        />
      </div>
      <PositionedModal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[420px] p-4 lg:p-5"
        position={modalPosition}
      >
        <div className="flex flex-col px-1 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start">
            <div>
              <h5 className="mb-1 font-semibold modal-title text-lg dark:text-brand-400 lg:text-xl">
                {selectedEvent ? "Edit Event" : "Add Event"}
              </h5>
            </div>
            <div className="flex items-center gap-2">
              {selectedEvent && (
                <button
                  onClick={() => {
                    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
                    closeModal();
                    resetModalFields();
                  }}
                  type="button"
                  className="flex items-start justify-center w-5 h-5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors pt-0.5"
                  title="Delete Event"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={closeModal}
                type="button"
                className="flex items-center justify-center w-5 h-5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Close"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-400">
                  Event Title
                </label>
                <input
                  id="event-title"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-400">
                  Start Time
                </label>
                <input
                  id="event-start-time"
                  type="time"
                  value={eventStartTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className="dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-400">
                  End Time
                </label>
                <input
                  id="event-end-time"
                  type="time"
                  value={eventEndTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  className="dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-400">
                  Duration
                </label>
                <select
                  id="event-duration"
                  value={eventDuration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className="dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                >
                  <option value="">Select duration</option>
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-400">
                  Is Break
                </label>
                <div className="flex items-center h-9">
                  <input
                    id="is-break"
                    type="checkbox"
                    checked={isBreak}
                    onChange={(e) => handleBreakToggle(e.target.checked)}
                    className="h-3 w-3 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <label htmlFor="is-break" className="ml-2 text-xs text-gray-700 dark:text-gray-400">
                    This is a break period
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-400">
                  Teacher
                </label>
                <select
                  id="event-teacher"
                  value={eventTeacher}
                  onChange={(e) => setEventTeacher(e.target.value)}
                  disabled={isBreak}
                  className={`dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 ${isBreak ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select teacher</option>
                  {teacherOptions.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-400">
                  Subject
                </label>
                <select
                  id="event-subject"
                  value={eventSubject}
                  onChange={(e) => setEventSubject(e.target.value)}
                  disabled={isBreak}
                  className={`dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 ${isBreak ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select subject</option>
                  {subjectOptions.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
          </div>
          <div className="flex items-center gap-2 mt-4 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleAddOrUpdateEvent}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {selectedEvent ? "Update Changes" : "Add Event"}
            </button>
          </div>
        </div>
      </PositionedModal>

      {/* Confirmation Modal for Deleting Selected Events */}
      <PositionedModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        className="max-w-[400px] p-6"
        position={{ x: typeof window !== 'undefined' ? window.innerWidth / 2 - 200 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 - 100 : 0 }}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Delete Selected Events?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Are you sure you want to delete {selectedEventIds.size} selected event{selectedEventIds.size !== 1 ? 's' : ''}? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowDeleteConfirmation(false)}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-white/[0.03]"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSelectedEvents}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Events
            </button>
          </div>
        </div>
      </PositionedModal>

      {/* Confirmation Modal for Event Time Updates */}
      <PositionedModal
        isOpen={showUpdateConfirmation}
        onClose={handleCancelUpdate}
        className="max-w-[400px] p-6"
        position={{ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 100 }}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Update Event Time?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Do you want to save the new time for this event?
            {pendingEventUpdate && (
              <>
                <br /><br />
                <span className="font-medium">From:</span> {new Date(pendingEventUpdate.oldStart).toLocaleString()}
                <br />
                <span className="font-medium">To:</span> {new Date(pendingEventUpdate.newStart).toLocaleString()}
              </>
            )}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCancelUpdate}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-white/[0.03]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmUpdate}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Update Time
            </button>
          </div>
        </div>
      </PositionedModal>
    </div>
  );
};

export default PeriodCalendar;
