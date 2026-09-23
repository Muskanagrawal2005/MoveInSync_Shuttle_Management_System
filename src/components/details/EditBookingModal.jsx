import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';

export const EditBookingModal = ({ booking, onClose }) => {
  const { editBookingDetails } = useTransit();

  const [formData, setFormData] = useState({
    from: booking.from,
    to: booking.to,
    requestedPickupTime: booking.requestedPickupTime,
    vehicle: booking.vehicle,
    driverName: booking.driverName || 'Samuel Jones',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editBookingDetails(booking.bookingId, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Edit Booking #{booking.bookingId}
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
              Passenger Name
            </label>
            <input
              type="text"
              value={booking.employeeName}
              disabled
              className="w-full px-2.5 py-1.5 bg-gray-100 border border-gray-300 rounded text-gray-500 cursor-not-allowed"
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Requested Pickup Time
              </label>
              <input
                type="time"
                value={formData.requestedPickupTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requestedPickupTime: e.target.value,
                  })
                }
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Vehicle Assignment
              </label>
              <select
                value={formData.vehicle}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle: e.target.value })
                }
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="NB-002-RF">NB-002-RF</option>
                <option value="UA3282">UA3282</option>
                <option value="NB-004-TX">NB-004-TX</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Assign Driver
              </label>
              <select
                value={formData.driverName}
                onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Samuel Jones">Samuel Jones</option>
                <option value="Bob Jones">Bob Jones</option>
                <option value="Jonathan Spikes">Jonathan Spikes</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};