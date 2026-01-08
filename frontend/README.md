# Service Marketplace Frontend

A modern React-based frontend for the service marketplace MERN application.

## Features

- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Service Discovery**: Browse, search, and filter services
- **User Authentication**: Register and login for clients and providers
- **Client Features**:
  - Browse and search services
  - Book services with date/time selection
  - Track bookings
  - Leave reviews and ratings

- **Provider Features**:
  - Add and manage services
  - Track bookings
  - View customer reviews

- **User Profiles**: Manage profile information

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library

## Installation

1. **Navigate to frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── Footer.js       # Footer component
│   │   └── ServiceCard.js  # Service display card
│   ├── pages/
│   │   ├── HomePage.js          # Home page with featured services
│   │   ├── ServicesPage.js      # Browse all services
│   │   ├── ServiceDetailPage.js # Service details
│   │   ├── LoginPage.js         # User login
│   │   ├── RegisterPage.js      # User registration
│   │   ├── ClientDashboard.js   # Client bookings
│   │   ├── ProviderDashboard.js # Provider service management
│   │   └── ProfilePage.js       # User profile
│   ├── services/
│   │   └── api.js          # API service client
│   ├── App.js              # Main App component
│   ├── App.css             # Global styles
│   ├── index.js            # Entry point
│   └── index.css           # Global CSS
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Pages Overview

### Home Page
- Featured services carousel
- Service categories
- Search functionality
- CTA sections

### Services Page
- Browse all services
- Filter by category, price, rating
- Search functionality
- Service cards with details

### Service Detail Page
- Full service information
- Provider details
- Customer reviews
- Booking form

### Authentication Pages
- Register (Client or Provider)
- Login

### Dashboards
- **Client**: View and manage bookings, leave reviews
- **Provider**: Create/edit/delete services, manage bookings

### Profile Page
- View and edit profile information
- Address management

## API Integration

All API calls are handled through `services/api.js` which:
- Manages axios instance
- Handles authentication tokens
- Provides all API methods

The app connects to the backend at `http://localhost:5000/api`

## Key Features Implementation

### Authentication
- JWT tokens stored in localStorage
- Protected routes based on user role
- Automatic redirection for unauthorized access

### Service Management
- Providers can create, edit, and delete services
- Services include category, pricing, availability
- Rating and review system

### Booking System
- Clients can book services with date/time
- Status tracking (pending, confirmed, completed, cancelled)
- Review after booking completion

### Search & Filter
- Search by keyword
- Filter by category
- Filter by price range
- Filter by minimum rating

## Environment Configuration

The frontend connects to:
- Backend API: `http://localhost:5000/api`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm run dev` - Alias for npm start

## Styling

- **Tailwind CSS** for utility-first styling
- Custom colors defined in `tailwind.config.js`
- Responsive breakpoints for mobile/tablet/desktop
- Gradient backgrounds and animations

## Future Enhancements

- Payment gateway integration
- Real-time notifications
- Chat system between clients and providers
- Image uploads
- Advanced analytics
- Email verification
- SMS notifications
- Service availability calendar
- Provider verification badge
