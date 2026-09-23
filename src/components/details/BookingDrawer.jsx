import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import { EditBookingModal } from './EditBookingModal';

export const BookingDrawer = () => {
  const { selectedBooking, setSelectedBookingId, updateBookingStatus } =
    useTransit();
  const [isEditing, setIsEditing] = useState(false);

  // If no booking is selected, drawer is hidden
  if (!selectedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Semi-transparent Backdrop with subtle blur */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setSelectedBookingId(null)}
      />

      {/* Slide-In Panel (from right edge) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-200 animate-in slide-in-from-right duration-300">
          
          {/* Header section matching wireframe */}
          <div className="p-5 border-b border-gray-200 bg-gray-50/70">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono text-gray-400">
                  Booking ID: {selectedBooking.bookingId}
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedBooking.employeeName}
                </h3>
                <span className="text-xs text-gray-500 font-mono">
                  Emp ID: {selectedBooking.employeeId}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    selectedBooking.status === 'Accepted'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : selectedBooking.status === 'Waiting'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : selectedBooking.status === 'No Show'
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  {selectedBooking.status}
                </span>
                <button
                  onClick={() => setSelectedBookingId(null)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 text-sm font-bold transition"
                  title="Close panel"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 mt-2 font-medium">
              Sign In: <span className="text-gray-700 font-semibold">Tue, Dec 17</span>
            </div>
          </div>

          {/* Body: Journey Milestones */}
          <div className="p-5 space-y-5 flex-1 overflow-y-auto text-xs">
            {/* Vehicle Information Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  🚐 {selectedBooking.vehicle}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Campus Transit Van • 12 Seater
                </div>
              </div>
              <span className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 font-medium">
                Active
              </span>
            </div>

            {/* Route Stops / Timeline */}
            <div className="relative pl-5 border-l-2 border-blue-500 space-y-6 my-2">
              {/* Pickup Stop */}
              <div className="relative">
                <span className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white ring-1 ring-blue-300" />
                <div className="font-semibold text-gray-800 text-xs">
                  {selectedBooking.from} (Pickup)
                </div>
                <div className="text-gray-500 text-[11px] mt-0.5">
                  Requested: {selectedBooking.requestedPickupTime}{' '}
                  <span className="text-amber-600 font-semibold">
                    ({selectedBooking.delay})
                  </span>
                </div>
              </div>

              {/* Drop Stop */}
              <div className="relative">
                <span className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
                <div className="font-semibold text-gray-800 text-xs">
                  {selectedBooking.to} (Drop)
                </div>
                <div className="text-gray-500 text-[11px] mt-0.5">
                  Planned Drop: {selectedBooking.plannedDrop}
                </div>
              </div>
            </div>

            {/* Driver Profile Card */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  {selectedBooking.driverName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-blue-950">
                    {selectedBooking.driverName}
                  </div>
                  <div className="text-[11px] text-blue-600 font-mono">
                    {selectedBooking.driverPhone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded text-[11px]">
                ★ {selectedBooking.driverRating}
              </div>
            </div>

            {/* Operational Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() =>
                  updateBookingStatus(selectedBooking.bookingId, 'Accepted')
                }
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-xs transition flex items-center justify-center gap-1.5"
              >
                 Sign In Rider
              </button>

              <button
                onClick={() =>
                  updateBookingStatus(selectedBooking.bookingId, 'No Show')
                }
                className="w-full py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold rounded-md transition flex items-center justify-center gap-1.5"
              >
                 Mark Rider as No-Show
              </button>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <button
              onClick={() =>
                updateBookingStatus(selectedBooking.bookingId, 'Cancelled')
              }
              className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded transition"
            >
              Cancel Booking
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-1.5 text-xs bg-slate-900 hover:bg-black text-white font-medium rounded-md shadow-xs transition flex items-center gap-1.5"
            >
               Edit
            </button>
          </div>
        </div>
      </div>

      {/* Edit Booking Modal */}
      {isEditing && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};