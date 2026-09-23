import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import {
  TIMELINE_START_HOUR,
  TIMELINE_END_HOUR,
  getTimelinePosition,
} from '../../utils/timeMath';
import { AddBreakModal } from './AddBreakModal';

export const DriverTimeline = () => {
  const { drivers, toggleDriverDuty } = useTransit();
  const [driverSearch, setDriverSearch] = useState('');
  const [openMenuDriverId, setOpenMenuDriverId] = useState(null);
  const [selectedDriverForBreak, setSelectedDriverForBreak] = useState(null);

  // Generate hourly markers: [6, 7, 8, ... 22]
  const totalHours = TIMELINE_END_HOUR - TIMELINE_START_HOUR + 1;
  const hoursArray = Array.from(
    { length: totalHours },
    (_, i) => TIMELINE_START_HOUR + i
  );

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(driverSearch.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-xs border border-gray-200 mb-6 p-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-100 gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-gray-800 tracking-tight">
            Driver Management
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search driver..."
              value={driverSearch}
              onChange={(e) => setDriverSearch(e.target.value)}
              className="text-xs pl-7 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
            />
            <span className="absolute left-2.5 top-1.5 text-gray-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="text-xs font-semibold text-gray-500">
          Dec 16, 2024
        </div>
      </div>

      {/* Visual Legend matching Wireframe */}
      <div className="flex items-center justify-end gap-5 py-2.5 text-[11px] text-gray-600 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-blue-100 border border-blue-400"></span>
          Duty Bounds
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-purple-500"></span>
          Pickup/Drop Trip
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-amber-400"></span>
          Break
        </span>
      </div>

      {/* Scrollable Timeline Area */}
      <div className="overflow-x-auto select-none">
        <div className="min-w-[900px]">
          {/* Hourly Header Ruler */}
          <div className="flex border-b border-gray-200 text-[11px] font-medium text-gray-400 pb-1.5">
            <div className="w-60 shrink-0 pl-2">Driver</div>
            <div className="flex-1 relative flex justify-between px-1">
              {hoursArray.map((hour) => (
                <div key={hour} className="relative flex flex-col items-center">
                  <span className="-translate-x-1/2">{`${hour}:00`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Driver Rows */}
          {filteredDrivers.map((driver) => {
            const dutyShift = driver.shifts.find((s) => s.type === 'duty');
            const dutyPosition = dutyShift
              ? getTimelinePosition(dutyShift.startTime, dutyShift.endTime)
              : null;

            return (
              <div
                key={driver.id}
                className="flex items-center py-2.5 border-b border-gray-100 hover:bg-gray-50/60 transition relative"
              >
                {/* Left: Driver Identity Card */}
                <div className="w-60 shrink-0 flex items-center justify-between pr-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <div className="text-xs font-semibold text-gray-800">
                        {driver.name}
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          driver.status === 'Online'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {driver.status}
                      </span>
                    </div>
                  </div>

                  {/* 3-Dots Popover Context Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuDriverId(
                          openMenuDriverId === driver.id ? null : driver.id
                        )
                      }
                      className="p-1 text-gray-400 hover:text-gray-700 rounded transition"
                      title="Driver Shift Actions"
                    >
                      &#8942;
                    </button>

                    {openMenuDriverId === driver.id && (
                      <div className="absolute left-6 top-0 z-40 w-36 bg-white rounded-md shadow-lg border border-gray-200 py-1 text-xs">
                        <button
                          onClick={() => {
                            toggleDriverDuty(driver.id, 'start');
                            setOpenMenuDriverId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-emerald-700 font-medium"
                        >
                          ▶ Start Duty
                        </button>
                        <button
                          onClick={() => {
                            toggleDriverDuty(driver.id, 'end');
                            setOpenMenuDriverId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700"
                        >
                          ⏹ End Duty
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDriverForBreak(driver);
                            setOpenMenuDriverId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-amber-50 text-amber-700 font-medium border-t border-gray-100"
                        >
                          ☕ Add Break...
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Gantt Track Canvas */}
                <div className="flex-1 h-10 bg-gray-50/80 rounded relative overflow-hidden border border-gray-200">
                  {/* Subtle Hourly Vertical Grid Guides */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
                    {hoursArray.map((hour) => (
                      <div
                        key={hour}
                        className="w-px h-full bg-gray-200/60"
                      />
                    ))}
                  </div>

                  {/* Duty Bound Underlay */}
                  {dutyPosition?.isVisible && (
                    <div
                      className="absolute top-0 bottom-0 bg-blue-50/50 border-l-2 border-r-2 border-blue-400 transition-all"
                      style={{
                        left: dutyPosition.left,
                        width: dutyPosition.width,
                      }}
                      title={`Active Duty: ${dutyShift.startTime} - ${dutyShift.endTime}`}
                    />
                  )}

                  {/* Shift Events (Trips & Breaks) */}
                  {driver.shifts
                    .filter((shift) => shift.type !== 'duty')
                    .map((shift) => {
                      const pos = getTimelinePosition(
                        shift.startTime,
                        shift.endTime
                      );
                      if (!pos.isVisible) return null;

                      // Break Block
                      if (shift.type === 'break') {
                        return (
                          <div
                            key={shift.id}
                            style={{ left: pos.left, width: pos.width }}
                            className="absolute top-1.5 bottom-1.5 bg-amber-400 hover:bg-amber-500 border border-amber-600 rounded flex items-center justify-center text-[10px] font-bold text-amber-950 shadow-xs cursor-pointer transition-all"
                            title={`Break Window: ${shift.startTime} - ${shift.endTime}`}
                          >
                            Break
                          </div>
                        );
                      }

                      // Trip Block (Pickups / Drops)
                      return (
                        <div
                          key={shift.id}
                          style={{ left: pos.left, width: pos.width }}
                          className="absolute top-1.5 bottom-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center justify-between px-2 text-[10px] font-semibold shadow-xs cursor-pointer transition-all"
                          title={`Assigned Trip: ${shift.startTime} - ${shift.endTime} (${shift.pickups} pickups, ${shift.drops} drops)`}
                        >
                          <span className="truncate">
                             {shift.pickups}P
                          </span>
                          <span className="truncate">
                             {shift.drops}D
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Break Creation Modal Overlay */}
      {selectedDriverForBreak && (
        <AddBreakModal
          driver={selectedDriverForBreak}
          onClose={() => setSelectedDriverForBreak(null)}
        />
      )}
    </div>
  );
};