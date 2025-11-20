import React from "react";
import { teacherOptions, subjectOptions, durationOptions } from "./constants";
import { calculateEndTime, calculateDuration } from "./utils";
import { CalendarEvent } from "./types";

interface EventModalProps {
  selectedEvent: CalendarEvent | null;
  eventTitle: string;
  setEventTitle: (value: string) => void;
  eventStartDate: string;
  setEventStartDate: (value: string) => void;
  eventEndDate: string;
  setEventEndDate: (value: string) => void;
  eventStartTime: string;
  setEventStartTime: (value: string) => void;
  eventEndTime: string;
  setEventEndTime: (value: string) => void;
  eventDuration: string;
  setEventDuration: (value: string) => void;
  eventTeacher: string;
  setEventTeacher: (value: string) => void;
  eventSubject: string;
  setEventSubject: (value: string) => void;
  isBreak: boolean;
  setIsBreak: (value: boolean) => void;
  eventLevel: string;
  setEventLevel: (value: string) => void;
  onSave: () => void;
  onDelete?: () => void;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  selectedEvent,
  eventTitle,
  setEventTitle,
  eventStartDate,
  setEventStartDate,
  eventEndDate,
  setEventEndDate,
  eventStartTime,
  setEventStartTime,
  eventEndTime,
  setEventEndTime,
  eventDuration,
  setEventDuration,
  eventTeacher,
  setEventTeacher,
  eventSubject,
  setEventSubject,
  isBreak,
  setIsBreak,
  eventLevel,
  setEventLevel,
  onSave,
  onDelete,
  onClose,
}) => {
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

  return (
    <div className="flex flex-col px-1 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-start">
        <div>
          <h5 className="mb-1 font-semibold modal-title text-lg dark:text-brand-400 lg:text-xl">
            {selectedEvent ? "Edit Event" : "Add Event"}
          </h5>
        </div>
        <div className="flex items-center gap-2">
          {selectedEvent && onDelete && (
            <button
              onClick={onDelete}
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
            onClick={onClose}
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
          onClick={onClose}
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
        >
          Close
        </button>
        <button
          onClick={onSave}
          type="button"
          className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600 sm:w-auto"
        >
          {selectedEvent ? "Update Changes" : "Add Event"}
        </button>
      </div>
    </div>
  );
};