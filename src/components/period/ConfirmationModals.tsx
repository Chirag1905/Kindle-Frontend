import React from "react";
import { PositionedModal } from "../ui/PositionedModal";

interface ConfirmationModalsProps {
  // Delete confirmation modal
  showDeleteConfirmation: boolean;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
  selectedEventCount: number;
  
  // Update confirmation modal
  showUpdateConfirmation: boolean;
  onUpdateConfirm: () => void;
  onUpdateCancel: () => void;
  pendingEventUpdate: {
    eventId: string;
    oldStart: string;
    oldEnd: string;
    newStart: string;
    newEnd: string;
    revertCallback: () => void;
  } | null;
}

export const ConfirmationModals: React.FC<ConfirmationModalsProps> = ({
  showDeleteConfirmation,
  onDeleteConfirm,
  onDeleteCancel,
  selectedEventCount,
  showUpdateConfirmation,
  onUpdateConfirm,
  onUpdateCancel,
  pendingEventUpdate,
}) => {
  // Safe window dimensions that work on server-side
  const getModalPosition = () => {
    if (typeof window !== 'undefined') {
      return { 
        x: window.innerWidth / 2 - 200, 
        y: window.innerHeight / 2 - 100 
      };
    }
    return { x: 200, y: 200 }; // fallback for SSR
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <PositionedModal
        isOpen={showDeleteConfirmation}
        onClose={onDeleteCancel}
        className="max-w-[400px] p-6"
        position={getModalPosition()}
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
            Are you sure you want to delete {selectedEventCount} selected event{selectedEventCount !== 1 ? 's' : ''}? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onDeleteCancel}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-white/[0.03]"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteConfirm}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Events
            </button>
          </div>
        </div>
      </PositionedModal>

      {/* Update Confirmation Modal */}
      <PositionedModal
        isOpen={showUpdateConfirmation}
        onClose={onUpdateCancel}
        className="max-w-[400px] p-6"
        position={getModalPosition()}
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
              onClick={onUpdateCancel}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-white/[0.03]"
            >
              Cancel
            </button>
            <button
              onClick={onUpdateConfirm}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Update Time
            </button>
          </div>
        </div>
      </PositionedModal>
    </>
  );
};