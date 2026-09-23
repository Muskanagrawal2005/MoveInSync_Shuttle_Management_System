import React from 'react';

export const TopNavbar = ({ onOpenCreateBooking }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left: Brand + Navigation Tabs */}
        <div className="flex items-center gap-6">
          {/* MoveInSync Brand Logo Badge */}
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white font-black text-sm px-2 py-0.5 rounded shadow-xs tracking-tighter">
              S
            </div>
            <div className="leading-tight">
              <span className="font-bold text-gray-800 text-sm tracking-tight">Move</span>
              <span className="font-bold text-emerald-600 text-sm tracking-tight">InSync</span>
            </div>
          </div>

          {/* Module Tabs matching wireframe */}
          <nav className="flex items-center gap-1 text-xs">
            <button className="px-3 py-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium transition">
              Tracking
            </button>
            <button className="px-3 py-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium transition">
              Performance
            </button>
            <button className="px-3 py-1.5 rounded bg-blue-600 text-white font-semibold shadow-xs">
              Management
            </button>
          </nav>
        </div>

        {/* Right: Quick Action to create student/staff booking */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateBooking}
            className="flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3 py-1.5 rounded font-semibold transition"
          >
            <span>+</span> New Shuttle Booking
          </button>
          <div className="text-xs text-gray-500 font-medium border-l border-gray-200 pl-3">
            Campus Transit Console
          </div>
        </div>
      </div>
    </header>
  );
};