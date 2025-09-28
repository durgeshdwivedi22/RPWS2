# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the **RPWS (Rating & Performance System)** - a web application for rating and tracking participant performance. The system includes user authentication, participant management, rating submission, and performance analytics with real-time visualization.

## Architecture

### Backend Structure
- **Express.js server** (`public/server.js`) - Main API server with REST endpoints
- **File-based data storage** - JSON files in `/data` directory for development (users.json, ratings.json, participants.json)
- **JWT authentication** with bcrypt password hashing
- **Rate limiting** using express-rate-limit
- **CORS enabled** for cross-origin requests

### Frontend Structure
- **Multi-page application** with individual HTML files for different sections
- **Vanilla JavaScript** with modular functionality across files
- **Chart.js integration** for performance visualization
- **Modal-based UI** for forms and detailed views
- **Firebase Authentication** integration for sign-in (optional)

### Key Components
- **Participant Management**: Profile cards, ratings, achievements, status tracking
- **Authentication System**: Login/register with JWT tokens and Firebase integration
- **Rating System**: 1-5 star ratings with comments and vote counting
- **Analytics Dashboard**: Charts and statistics for performance tracking
- **Contact System**: Form submission with validation

## Common Development Commands

### Server Operations
```bash
# Start development server with auto-reload
npm run dev

# Start production server  
npm start

# Install dependencies
npm install
```

### Development Workflow
```bash
# Run server in development mode (uses nodemon)
npm run dev

# Test server endpoints
curl http://localhost:3000/api/health

# Start only the backend server
node public/server.js
```

## API Architecture

### Authentication Endpoints
- `POST /api/register` - User registration with password hashing
- `POST /api/login` - User authentication returning JWT token
- **Authentication required** for rating submission and participant updates

### Core Endpoints
- `GET /api/participants` - Retrieve all participants with ratings
- `GET /api/participants/:id` - Get specific participant details
- `POST /api/ratings` - Submit new rating (requires auth)
- `GET /api/leaderboard` - Get sorted participants by rating
- `GET /api/statistics` - System-wide analytics data
- `POST /api/contact` - Contact form submission

### Data Flow
1. **Frontend** makes API calls to Express server
2. **Server** validates requests and handles authentication
3. **Data layer** reads/writes to JSON files in `/data` directory
4. **Real-time updates** trigger recalculation of ratings and statistics

## File Organization

### Root Level Files
- `public/` - Contains the main application files and assets
- `node_modules/` - Dependencies
- `mongod/` - Contains MongoDB sample scripts (legacy)
- Individual HTML files in root are alternative entry points

### Public Directory Structure
- `server.js` - Main Express backend server
- `index.html` - Landing page with participant overview
- `card.html` / `participents.html` - Participant listing pages
- `contact.html` - Contact form page
- `login.html`, `signIn.html` - Authentication pages
- `winner.html` - Leaderboard/winners page
- JavaScript files correspond to their HTML counterparts

### Data Storage Pattern
The application uses a file-based storage system during development:
- Creates `/data` directory automatically if it doesn't exist
- Initializes default participant data on first run
- All CRUD operations go through helper functions (`readData`, `writeData`)

## Key Features to Understand

### Dual Authentication System
The application supports both custom JWT authentication and Firebase authentication:
- Custom system uses bcrypt + JWT for API endpoints
- Firebase integration handles frontend sign-in flows
- Both systems can coexist for different use cases

### Rating Algorithm
- Participants have base ratings that get updated with new votes
- Average calculation happens real-time when ratings are submitted
- Vote counts and achievements are automatically maintained
- Leaderboard sorting is dynamic based on current ratings

### Frontend Architecture
- **Modal-driven interface** - Most interactions happen through modals
- **Chart.js integration** - Performance data visualization
- **Responsive design** - Works across different screen sizes
- **Animation effects** - Smooth transitions and hover effects

### Security Considerations
- Password hashing with bcrypt (10 salt rounds)
- JWT tokens for API authentication  
- Rate limiting on API endpoints (100 requests per 15 minutes)
- Input validation on all form submissions

## Development Notes

### Server Configuration
- Default port: 3000 (configurable via PORT env var)
- JWT secret should be set via JWT_SECRET env var in production
- CORS is enabled for all origins in development

### Database Migration Path
The current file-based storage is designed for development. For production:
- Replace JSON file operations with MongoDB/database queries
- Update `readData` and `writeData` helper functions
- Maintain the same API contract for frontend compatibility

### Frontend State Management
- No complex state management framework used
- State is managed through DOM manipulation and local variables
- Page transitions use CSS animations and location.href navigation

### Testing Strategy
- API endpoints can be tested independently using curl or Postman
- Frontend functionality requires browser testing
- Current package.json has placeholder test script