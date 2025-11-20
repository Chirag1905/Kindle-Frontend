// Utility functions for the Period Calendar component

// Helper function to calculate end time based on start time and duration
export const calculateEndTime = (startTime: string, durationMinutes: string): string => {
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
export const calculateDuration = (startTime: string, endTime: string): string => {
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

// Helper function to create teacher acronym
export const createTeacherAcronym = (teacherName: string): string => {
  return teacherName.split(' ').map(word => word[0]).join('');
};

// Helper function to create subject code
export const createSubjectCode = (subjectName: string): string => {
  return subjectName.split(' ').map(word => word[0]).join('').toUpperCase();
};

// Helper function to calculate event duration in minutes
export const getEventDurationMinutes = (startTime: Date | null, endTime: Date | null): number => {
  if (!startTime || !endTime) return 30; // default duration
  return (endTime.getTime() - startTime.getTime()) / (1000 * 60);
};