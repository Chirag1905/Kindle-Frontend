import React from "react";
import { EventContentArg } from "@fullcalendar/core";
import { teacherOptions, subjectOptions } from "./constants";
import { createTeacherAcronym, createSubjectCode, getEventDurationMinutes } from "./utils";

export const renderEventContent = (
  eventInfo: EventContentArg,
  selectedEventIds: Set<string>
) => {
  const teacherId = eventInfo.event.extendedProps.teacherId;
  const subjectId = eventInfo.event.extendedProps.subjectId;
  const isBreak = eventInfo.event.extendedProps.isBreak;
  const eventId = eventInfo.event.id;
  const isSelected = selectedEventIds.has(eventId);

  // Find teacher and subject data
  const teacher = teacherOptions.find((t: any) => t.id === teacherId);
  const subject = subjectOptions.find((s: any) => s.id === subjectId);

  // Create acronyms
  const teacherAcronym = teacher ? createTeacherAcronym(teacher.name) : '';
  const subjectCode = subject ? createSubjectCode(subject.name) : '';

  // Calculate event duration in minutes
  const durationMinutes = getEventDurationMinutes(eventInfo.event.start, eventInfo.event.end);

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