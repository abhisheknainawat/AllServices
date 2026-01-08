# Service Marketplace Backend

A MERN stack backend for a service marketplace platform that connects service providers with clients.

## Features

- **User Authentication**: Registration and login for clients and service providers
- **Service Management**: Create, read, update, delete services by providers
- **Booking System**: Clients can book services and track bookings
- **Review & Ratings**: Rate and review services based on completed bookings
- **Provider Profiles**: View provider information, ratings, and services
- **Search & Filter**: Search services by name, category, price, and ratings

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create .env file** in the root directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://abhisheknainawat:@abhi7224@cluster0.4dsfo13.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

3. **Start the server**:
   - Production: `npm start`
   - Development: `npm run dev` (requires nodemon)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `GET /api/auth/providers` - Get all providers
- `GET /api/auth/providers/:id` - Get provider by ID

### Services
- `GET /api/services` - Get all services (with filters)
- `GET /api/services/search` - Search services
- `GET /api/services/category/:category` - Get services by category
- `GET /api/services/:id` - Get service details
- `GET /api/services/provider/:providerId` - Get services by provider
- `POST /api/services` - Create service (provider only, protected)
- `PUT /api/services/:id` - Update service (provider only, protected)
- `DELETE /api/services/:id` - Delete service (provider only, protected)

### Bookings
- `POST /api/bookings` - Create booking (client only, protected)
- `GET /api/bookings/client/my-bookings` - Get client bookings (protected)
- `GET /api/bookings/provider/my-bookings` - Get provider bookings (protected)
- `GET /api/bookings/:id` - Get booking details (protected)
- `PUT /api/bookings/:id/status` - Update booking status (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

### Reviews
- `GET /api/reviews/service/:serviceId` - Get service reviews
- `GET /api/reviews/provider/:providerId` - Get provider reviews
- `GET /api/reviews/:id` - Get review details
- `POST /api/reviews` - Create review (client only, protected)
- `PUT /api/reviews/:id` - Update review (client only, protected)
- `DELETE /api/reviews/:id` - Delete review (client only, protected)

## Service Categories

- carpenter
- guitarist
- salon
- electrician
- technician
- house_keeping
- laundry
- courses
- mua (Makeup Artist)
- mechanic
- plumber
- painter
- other

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Database Models

### User
- Basic info (name, email, phone)
- Role (client or provider)
- Address details
- Profile photo
- Rating and review count

### Service
- Name, description, category
- Price and price type (hourly, fixed, daily)
- Provider reference
- Images and work samples
- Availability schedule
- Rating and review count

### Booking
- Service reference
- Client and Provider references
- Date and time slots
- Location details
- Status (pending, confirmed, completed, cancelled)
- Payment information

### Review
- Service and Booking references
- Client and Provider references
- Ratings (overall, work quality, communication, punctuality)
- Comment
- Review count

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # User auth logic
│   ├── serviceController.js  # Service CRUD
│   ├── bookingController.js  # Booking logic
│   └── reviewController.js   # Review logic
├── middleware/
│   └── auth.js              # JWT authentication
├── models/
│   ├── User.js              # User schema
│   ├── Service.js           # Service schema
│   ├── Booking.js           # Booking schema
│   └── Review.js            # Review schema
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── serviceRoutes.js     # Service routes
│   ├── bookingRoutes.js     # Booking routes
│   └── reviewRoutes.js      # Review routes
├── server.js                # Main server file
├── .env                     # Environment variables
└── package.json             # Dependencies
```

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation
- CORS enabled

## Error Handling

All endpoints return standardized JSON responses with appropriate HTTP status codes.

## Future Enhancements

- Payment gateway integration (Stripe, Razorpay)
- File upload for images and documents
- Real-time notifications with Socket.io
- Admin dashboard and analytics
- Email verification
- SMS notifications
- Dispute resolution system
- Service provider verification/approval system
