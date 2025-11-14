# Next-Gen CRM System

A modular, scalable CRM with APIs and UI features that can handle real-world sales operations, user roles, and analytics.

## Features

- JWT-based authentication with role management
- Real-time notifications via WebSocket
- Lead management with CRUD operations
- Activity timeline tracking
- Interactive dashboard with Chart.js
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- Redux Toolkit for state management
- React Router for navigation
- Socket.io-client for real-time updates
- Chart.js for data visualization
- Tailwind CSS for styling
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create `.env` file with:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

4. Start development server:

   ```sh
   npm start
   ```

## Project Structure

- `/src/components` - React components
- `/src/features` - Redux slices
- `/src/services` - API and WebSocket services
- `/src/hooks` - Custom React hooks