# 🚐 Shuttle Management System: A Smart Campus Transit Solution

The Shuttle Management System is designed to provide efficient, cost-effective, and
seamless transportation for students within a university campus. The system streamlines
shuttle bookings, trip tracking, and driver availability management, ensuring a hassle-free
commuting experience.

---

## 📌 Table of Contents
- [Features & PDF Requirements Alignment](#-features--pdf-requirements-alignment)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#installation)
- [Screenshots](#screenshots)

---

## 🚀 Features & PDF Requirements Alignment

### 1. Shuttle Booking Management
* **Booking CRUD Operations**: Real-time table view with full editing capabilities (pickup/drop locations, scheduled time, vehicle, and assigned driver).
* **Passenger Simulation**: Create new shuttle reservations (`+ New Shuttle Booking`) attributed to Students or Staff members.
* **Trip History Tracking**: Inspect historical rides (`Completed`, `Cancelled`, `No Show`) via a comprehensive journey drawer featuring time-stamped milestone audit trails.
* **Pagination & Sorting**: Client-side sorting and page slicing for consistent operational scanning.

### 2. Driver Availability Management (Gantt Timeline)
* **Visual Timeline Engine**: Custom mathematical projection mapping 24-hour time strings (`HH:mm`) to responsive percentages along a 06:00–22:00 operational axis.
* **Hourly Duty Controls**: Contextual driver shift management (`Start Duty`, `End Duty`) with visual duty boundary underlays.
* **Break Scheduling & Collision Detection**: Add break windows with zero-dependency interval collision detection preventing overlapping breaks or conflicting assignments.
* **Design-Fidelity Legend**: Matches the wireframe specifications (`Duty Start`, `Duty End`, `Pickup/Drop`, `Break`, `Vehicle Change`, `Empty Leg`).

### 3. Admin & Dispatch Controls
* **Driver Assignment**: Easily allocate available drivers to active passenger routes.
* **Debounced Search**: Dual search surfaces across bookings and drivers throttled via a decoupled custom hook.
* **Performance Overview**: Header navigation tab matching dispatcher wireframe layouts.

---

## 📂 Project Directory Structure

```text
src/
├── assets/                  # Static brand assets and SVGs
├── components/
│   ├── bookings/            # Booking management domain
│   │   ├── BookingDrawer.jsx        # Slide-over journey retrospective
│   │   ├── BookingsTable.jsx        # Dispatch data grid with status filters
│   │   └── EditBookingModal.jsx     # Route, vehicle & driver assignment modal
│   ├── layout/              # App Shell (Navbar, Header, Performance tab)
│   │   └── Navbar.jsx
│   └── timeline/            # Driver availability & Gantt chart
│       ├── AddBreakModal.jsx        # Break creation with collision validation
│       └── DriverTimeline.jsx       # Hourly Gantt ruler and driver rows
├── context/
│   └── TransitContext.jsx   # Global state store for bookings and fleet drivers
├── hooks/
│   └── useDebounce.js       # Reusable 300ms input throttling hook
├── utils/
│   ├── mockData.js          # Realistic campus transit seed dataset
│   └── timeMath.js          # Timeline coordinate transformation & collision math
├── App.jsx                  # Main Dispatcher layout assembly
└── main.jsx                 # React root entry point
```

## Installation
#### Clone the repository
`git clone https://github.com/Muskanagrawal2005/MoveInSync_Shuttle_Management_System.git`

#### Navigate into project directory
`cd MoveInSync_Shuttle_Management_System`

#### Install dependencies
`npm install`

#### Start local development server
`npm run dev`

### Screenshots
<img width="1896" height="867" alt="image" src="https://github.com/user-attachments/assets/97016a64-b96c-45f7-b734-fd9e64c5937c" />

