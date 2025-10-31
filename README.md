

# 🌍 Booklt
A Full-stack web application that allows users to explore travel experiences, view details, book experiences with preferred dates and times, and securely complete their checkout — including promo code discounts and booking confirmations.

## 🧩 Project Overview
It is built using React, Tailwind CSS, Node.js, Express, and MongoDB with a structured frontend-backend flow.
Users can:
- Browse available experiences
- View detailed information
- Select a date, time, and quantity
- Apply promo codes during checkout
- Confirm their booking and receive success/failure feedback

Admins can:
- Log in as authorized users
- Create, view, and manage promo codes through secure backend routes

## ⚙️ Tech Stack

### Frontend
- React + TypeScript – for UI and component-based architecture
- Tailwind CSS – for fast and responsive styling
- Axios – for API communication
- React Router – for navigation between pages
- Context API – for managing global booking state (date, time, total, etc.)

### Backend
- Node.js + Express.js – for building RESTful APIs
- MongoDB + Mongoose – for database modeling and relations
- JWT (JSON Web Tokens) – for authentication and admin role protection
- Zod for robust request-body validation across API routes.
- Promo Code Validation Logic – for applying discounts dynamically

## 🗂️ Folder Structure

### 🖥️ Frontend (`/frontend`)
```bash
frontend/
│
├── src/
│ ├── components/
│ │ ├── BookingSummary.tsx # Booking summary and payment card
│ │ ├── Card.tsx # Experience cards on homepage
│ │ ├── DynamicDateSelector.tsx # Dynamically shows next available dates
│ │ ├── Form.tsx # Checkout form (with promo code apply)
│ │ ├── Navbar.tsx # App navigation bar
│ │ └── TimeSelector.tsx # Time slot selection for bookings
│ │
│ ├── context/
│ │ └── BookingContext.tsx # Stores booking info & totals globally
│ │
│ ├── icons/
│ │ ├── Arrow.tsx # Navigation icon
│ │ ├── Success.tsx # Booking success icon
│ │ └── Failed.tsx # Booking failed icon
│ │
│ ├── pages/
│ │ ├── Home.tsx # Lists all experiences
│ │ ├── Detail.tsx # Shows full experience details
│ │ ├── Checkout.tsx # Booking form & promo code
│ │ ├── Signup.tsx # User registration
│ │ └── Signin.tsx # User login
│ │
│ ├── App.tsx # Main route configuration
│ └── main.tsx # React entry file
│
├── public/
│ └── index.html
│
├── package.json
└── vercel.json # Vercel frontend deployment config
```


### 🖥️ Backend (`/backend`)

```bash
backend/
│
├── models/
│ ├── User.model.js # Stores user credentials & roles
│ ├── Experience.model.js # Experience listings
│ ├── Booking.model.js # Booking details with ref IDs
│ └── PromoCode.model.js # Admin-managed promo codes
│
├── routes/
│ ├── authRoutes.js # Signup & login endpoints
│ ├── experienceRoutes.js # Fetch experiences
│ ├── bookingRoutes.js # Handle booking creation
│ └── promoRoutes.js # Promo code validation & admin ops
│
├── middleware/
│ └── authMiddleware.js # JWT auth + admin verification
│
├── server.js # Express app setup & route mounting
├── .env # Environment variables
├── package.json
└── vercel.json # Vercel backend deployment config
```
  
## 🚀 Setup & Run

### 1. Clone the repository
 ```bash 
 https://github.com/abhinavsahotra/booklt.git
 cd booklt
```

### 2. Environment Variables
```bash
 Create .env in backend with: 
 PORT=5000
 MONGO_URI=your_mongodb_connection
 JWT_SECRET=your_secret_key
```
### 2. Backend
```bash
 cd backend
 npm install
 npm start
```

### 3. Frontend
```bash 
cd frontend
npm install
npm run dev
```


## Routing Structure

### 🔐 Authentication & Authorization
- POST api/v1/user/auth/signup         - Create account based on role (user/admin)
- POST api/v1/user/auth/signin         - Verify account based on role (user/admin)

### experience
- POST    /api/v1/user/experience      - Create new experience.
- GET     /api/v1/user/experiences     - Return list of experiences.
- GET     /api/v1/user/experience/:id  - Get experience based on their id.

### 💡 Promo Code Workflow
- POST    /api/v1/user/promo/create   - Create promo code (Only for admin)
- GET     /api/v1/user/promo/         - Create promo code (Only for admin)
- DELETE  /api/v1/user/promo/:code    - Create promo code (Only for admin)
- POST    /api/v1/user/promo/validate - Validate promo and give discount (for user)

### 💳 Booking Flow
- POST    api/v1/user/booking - Accept booking details and store them.


## 🧠 Future Improvements
- Integrate a real payment gateway (e.g., Stripe)
- Add booking history and cancellation
- Build admin dashboard UI for promo management


## Deployments

The project is deployed and accessible through the following links:

- **Frontend**: [https://bookltfrontend-owa15xyem-abhinavsahotra-projects.vercel.app](https://bookltfrontend-owa15xyem-abhinavsahotra-projects.vercel.app)
- **Backend**: [https://bookltbackend-4jze2loqh-abhinavsahotra-projects.vercel.app](https://bookltbackend-4jze2loqh-abhinavsahotra-projects.vercel.app)
