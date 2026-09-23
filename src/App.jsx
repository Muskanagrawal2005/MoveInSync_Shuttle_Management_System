import React, { useState } from 'react';
import { TransitProvider } from './context/TransitContext';
import { TopNavbar } from './components/layout/TopNavbar';
import { DriverTimeline } from './components/timeline/DriverTimeline';
import { BookingsTable } from './components/bookings/BookingsTable';
import { BookingDrawer } from './components/details/BookingDrawer';
import { CreateBookingModal } from './components/bookings/CreateBookingModal';

const DashboardLayout = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans antialiased text-gray-800">
      {/* Top MoveInSync Header */}
      <TopNavbar onOpenCreateBooking={() => setIsCreateModalOpen(true)} />

      {/* Main Body with Left Rail + Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Vertical Icon Bar matching wireframe screenshot */}
        <aside className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-5 shrink-0 select-none">
          <div className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer text-xs" title="Home">
            🏠
          </div>
          <div className="w-7 h-7 rounded flex items-center justify-center text-blue-600 bg-blue-50 font-bold text-xs" title="Dispatch Management">
            📅
          </div>
          <div className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer text-xs" title="Vehicles">
            🚐
          </div>
          <div className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer text-xs" title="Drivers">
            👥
          </div>
          <div className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer text-xs" title="Analytics">
            📊
          </div>
        </aside>

        {/* Scrollable Center Content */}
        <main className="flex-1 p-5 overflow-y-auto">
          <div className="max-w-350 mx-auto space-y-4">
            {/* Top Half: Driver Management Timeline View */}
            <DriverTimeline />

            {/* Bottom Half: Booking Management Data Table */}
            <BookingsTable />
          </div>
        </main>
      </div>

      {/* Slide-over Drawer for Rider Journey View & Actions */}
      <BookingDrawer />

      {/* Create Ride Modal */}
      {isCreateModalOpen && (
        <CreateBookingModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <TransitProvider>
      <DashboardLayout />
    </TransitProvider>
  );
}