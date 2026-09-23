import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';

export const CreateBookingModal = ({ onClose }) => {
  const { createStudentBooking } = useTransit();
  const [formData, setFormData] = useState({
    studentName: '',
    from: 'Library',
    to: 'Data Centre',
    requestedTime: '12:15',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName.trim()) return;

    createStudentBooking(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Create Shuttle Ride (Student / Staff)
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Passenger Name & ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muskan Agrawal"
              value={formData.studentName}
              onChange={(e) =>
                setFormData({ ...formData, studentName: e.target.value })
              }
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pickup Station
              </label>
              <select
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Library">Library</option>
                <option value="Data Centre">Data Centre</option>
                <option value="Parking">Parking</option>
                <option value="Hostel Block A">Hostel Block A</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Drop Station
              </label>
              <select
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Data Centre">Data Centre</option>
                <option value="Parking">Parking</option>
                <option value="Library">Library</option>
                <option value="Academic Block 3">Academic Block 3</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Requested Pickup Time
            </label>
            <input
              type="time"
              required
              value={formData.requestedTime}
              onChange={(e) =>
                setFormData({ ...formData, requestedTime: e.target.value })
              }
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
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
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};