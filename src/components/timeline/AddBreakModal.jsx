import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';

export const AddBreakModal = ({ driver, onClose }) => {
  const { addDriverBreak } = useTransit();
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('12:00');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (startTime >= endTime) {
      setErrorMessage('Break end time must be after start time.');
      return;
    }

    // Call context action with collision detection
    const result = addDriverBreak(driver.id, startTime, endTime);

    if (result.success) {
      onClose();
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-sm overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Schedule Break: {driver.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded text-[11px] leading-relaxed">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              Save Break
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};