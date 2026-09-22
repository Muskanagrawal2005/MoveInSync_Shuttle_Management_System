import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_DRIVERS, INITIAL_BOOKINGS } from '../data/mockData';
import { checkTimeOverlap } from '../utils/timeMath';

// Create the Context object
const TransitContext = createContext(null);

export const TransitProvider = ({ children }) => {

  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [currentRole, setCurrentRole] = useState('admin'); 

  // Look up the active booking object whenever selectedBookingId or bookings change
  const selectedBooking = useMemo(() => {
    if (!selectedBookingId) return null;
    return bookings.find((b) => b.bookingId === selectedBookingId) || null;
  }, [bookings, selectedBookingId]);


  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((item) =>
        item.bookingId === bookingId ? { ...item, status: newStatus } : item
      )
    );
  };

  
  const addDriverBreak = (driverId, startTime, endTime) => {
    const targetDriver = drivers.find((d) => d.id === driverId);
    if (!targetDriver) {
      return { success: false, message: 'Driver not found in registry.' };
    }

    // Interval overlap validation
    // Check if the requested break collides with any existing trip
    const hasTripConflict = targetDriver.shifts.some(
      (shift) =>
        shift.type === 'trip' &&
        checkTimeOverlap(shift.startTime, shift.endTime, startTime, endTime)
    );

    if (hasTripConflict) {
      return {
        success: false,
        message: `Collision Detected: Break (${startTime}-${endTime}) overlaps with an assigned shuttle trip!`,
      };
    }

    // Check if the break collides with an already existing break
    const hasBreakConflict = targetDriver.shifts.some(
      (shift) =>
        shift.type === 'break' &&
        checkTimeOverlap(shift.startTime, shift.endTime, startTime, endTime)
    );

    if (hasBreakConflict) {
      return {
        success: false,
        message: `Collision Detected: Driver already has a scheduled break during this time window!`,
      };
    }

    const newBreakShift = {
      id: `break-${Date.now()}`,
      type: 'break',
      startTime,
      endTime,
    };

    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) => {
        if (driver.id === driverId) {
          return {
            ...driver,
            shifts: [...driver.shifts, newBreakShift],
          };
        }
        return driver;
      })
    );

    return { success: true, message: 'Break allocated successfully.' };
  };

// Toggles a driver's shift duty status (Online - Offline).
  const toggleDriverDuty = (driverId, action) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) => {
        if (driver.id === driverId) {
          const newStatus = action === 'start' ? 'Online' : 'Offline';
          return { ...driver, status: newStatus };
        }
        return driver;
      })
    );
  };

//    Allows the student/staff portal to submit a new ride reservation.
  const createStudentBooking = (formData) => {
    const newBooking = {
      bookingId: String(Math.floor(100000 + Math.random() * 900000)),
      employeeId: 'EMP-STU-99',
      employeeName: formData.studentName || 'Logged Student',
      status: 'Waiting',
      from: formData.from,
      to: formData.to,
      vehicle: 'NB-002-RF',
      driverName: 'Samuel Jones',
      driverPhone: '1-333-890-1122',
      driverRating: 4.8,
      requestedPickupTime: formData.requestedTime,
      pickupTime: '-',
      plannedDrop: '12:45',
      actualDrop: '-',
      delay: 'Pending',
      bookingDate: '2024-12-16',
    };

    setBookings((prev) => [newBooking, ...prev]);
  };

//    Edits the parameters of an existing booking (Route, Time, Vehicle).
  const editBookingDetails = (bookingId, updatedFields) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, ...updatedFields } : b))
    );
  };

  // Memoize value to avoid unnecessary child re-renders
  const contextValue = useMemo(
    () => ({
      drivers,
      bookings,
      selectedBooking,
      selectedBookingId,
      setSelectedBookingId,
      currentRole,
      setCurrentRole,
      updateBookingStatus,
      addDriverBreak,
      toggleDriverDuty,
      createStudentBooking,
      editBookingDetails,
    }),
    [drivers, bookings, selectedBooking, selectedBookingId, currentRole]
  );

  return (
    <TransitContext.Provider value={contextValue}>
      {children}
    </TransitContext.Provider>
  );
};

// Custom consumer hook with safety guard
export const useTransit = () => {
  const context = useContext(TransitContext);
  if (!context) {
    throw new Error('useTransit must be used within a TransitProvider');
  }
  return context;
};