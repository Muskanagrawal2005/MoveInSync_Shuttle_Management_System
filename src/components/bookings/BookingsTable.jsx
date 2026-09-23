import React, { useState, useMemo } from 'react';
import { useTransit } from '../../context/TransitContext';
import { useDebounce } from '../../hooks/useDebounce';

export const BookingsTable = () => {
    const { bookings, setSelectedBookingId } = useTransit();

    // Local UI State 
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [sortConfig, setSortConfig] = useState({
        key: 'requestedPickupTime',
        direction: 'asc',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Filter Pipeline
    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
            // Use the debounced search term instead of raw searchTerm
            const query = debouncedSearchTerm.toLowerCase();

            const matchesSearch =
                booking.employeeName.toLowerCase().includes(query) ||
                booking.bookingId.toLowerCase().includes(query) ||
                booking.vehicle.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === 'ALL' ? true : booking.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [bookings, debouncedSearchTerm, statusFilter]);

    // Sort Pipeline
    const sortedBookings = useMemo(() => {
        const sortableList = [...filteredBookings];

        if (!sortConfig.key) return sortableList;

        return sortableList.sort((a, b) => {
            const valA = a[sortConfig.key] ?? '';
            const valB = b[sortConfig.key] ?? '';

            // Numerical/String comparison
            if (valA < valB) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredBookings, sortConfig]);

    //Pagination Pipeline 
    const totalPages = Math.ceil(sortedBookings.length / pageSize) || 1;

    const paginatedBookings = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return sortedBookings.slice(startIndex, startIndex + pageSize);
    }, [sortedBookings, currentPage, pageSize]);

    // Handle column header clicks for bi-directional sorting
    const handleSort = (columnKey) => {
        setSortConfig((prevConfig) => ({
            key: columnKey,
            direction:
                prevConfig.key === columnKey && prevConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        }));
    };

    // Helper for status badge styling directly matching the wireframe tags
    const renderStatusBadge = (status) => {
        const badgeStyles = {
            Accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            Waiting: 'bg-amber-100 text-amber-800 border-amber-200',
            'No Show': 'bg-rose-100 text-rose-800 border-rose-200',
            Declined: 'bg-gray-100 text-gray-700 border-gray-300',
            Completed: 'bg-blue-100 text-blue-800 border-blue-200',
            Requested: 'bg-sky-100 text-sky-800 border-sky-200',
            'On Going': 'bg-indigo-100 text-indigo-800 border-indigo-200',
            Cancelled: 'bg-neutral-100 text-neutral-600 border-neutral-300',
            Dropped: 'bg-teal-100 text-teal-800 border-teal-200',
        };

        return (
            <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold inline-block ${badgeStyles[status] || 'bg-gray-100 text-gray-700'
                    }`}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-xs border border-gray-200 p-4">
            {/* Table Controls Bar */}
            <div className="flex flex-wrap items-center justify-between pb-3 gap-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                        Booking Management
                    </h2>
                    {/* Status Filter Dropdown */}
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1); // Reset to page 1 on filter
                        }}
                        className="text-xs px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Waiting">Waiting</option>
                        <option value="No Show">No Show</option>
                        <option value="Declined">Declined</option>
                        <option value="Completed">Completed</option>
                        <option value="Requested">Requested</option>
                        <option value="On Going">On Going</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>

                {/* Search Input Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Emp, ID, Booking ID..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to page 1 on search
                        }}
                        className="text-xs pl-7 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-60"
                    />
                </div>
            </div>

            {/* Main Responsive Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                    <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 border-b border-gray-200 uppercase tracking-wider">
                        <tr>
                            <th
                                onClick={() => handleSort('bookingId')}
                                className="py-2.5 px-3 cursor-pointer hover:text-gray-800 transition"
                            >
                                Booking ID {sortConfig.key === 'bookingId' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </th>
                            <th
                                onClick={() => handleSort('employeeName')}
                                className="py-2.5 px-3 cursor-pointer hover:text-gray-800 transition"
                            >
                                Employee {sortConfig.key === 'employeeName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3">From</th>
                            <th className="py-2.5 px-3">To</th>
                            <th className="py-2.5 px-3">Vehicle</th>
                            <th
                                onClick={() => handleSort('requestedPickupTime')}
                                className="py-2.5 px-3 cursor-pointer hover:text-gray-800 transition"
                            >
                                Requested Pickup {sortConfig.key === 'requestedPickupTime' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                            </th>
                            <th className="py-2.5 px-3">Pickup Time</th>
                            <th className="py-2.5 px-3">Planned Drop</th>
                            <th className="py-2.5 px-3">Actual Drop</th>
                            <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedBookings.length > 0 ? (
                            paginatedBookings.map((row) => (
                                <tr
                                    key={row.bookingId}
                                    className="hover:bg-blue-50/30 transition duration-150"
                                >
                                    <td className="py-2.5 px-3 font-semibold text-gray-800 font-mono">
                                        {row.bookingId}
                                    </td>
                                    <td className="py-2.5 px-3 font-medium text-gray-900">
                                        {row.employeeName}
                                    </td>
                                    <td className="py-2.5 px-3">{renderStatusBadge(row.status)}</td>
                                    <td className="py-2.5 px-3 text-gray-700">{row.from}</td>
                                    <td className="py-2.5 px-3 text-gray-700">{row.to}</td>
                                    <td className="py-2.5 px-3 font-mono text-gray-500">
                                        {row.vehicle}
                                    </td>
                                    <td className="py-2.5 px-3 text-gray-800 font-medium">
                                        {row.requestedPickupTime}
                                    </td>
                                    <td className="py-2.5 px-3 text-gray-600">{row.pickupTime}</td>
                                    <td className="py-2.5 px-3 text-gray-600">{row.plannedDrop}</td>
                                    <td className="py-2.5 px-3 text-gray-600">{row.actualDrop}</td>
                                    <td className="py-2.5 px-3 text-right">
                                        <button
                                            onClick={() => setSelectedBookingId(row.bookingId)}
                                            className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-3 py-1 rounded text-[11px] font-medium transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="11"
                                    className="text-center py-6 text-gray-400 text-xs italic"
                                >
                                    No bookings found matching the current search criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Bar matching Wireframe: "Showing 1-10 of 50 items" */}
            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500 gap-2">
                <div>
                    Showing{' '}
                    <span className="font-semibold text-gray-700">
                        {sortedBookings.length === 0
                            ? 0
                            : (currentPage - 1) * pageSize + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-semibold text-gray-700">
                        {Math.min(currentPage * pageSize, sortedBookings.length)}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-gray-700">
                        {sortedBookings.length}
                    </span>{' '}
                    items
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-2.5 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                        ‹ Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-7 h-7 rounded text-xs font-medium transition ${currentPage === pageNum
                                    ? 'bg-blue-600 text-white font-bold'
                                    : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-2.5 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                        Next ›
                    </button>
                </div>
            </div>
        </div>
    );
};