https://www.figma.com/make/i4u1c9SAmCvWPTMH3GtSLm/Solo-Traveller-Webpage-and-App?code-node-id=0-9&p=f&t=8wnqzGHsf8tNXmPG-0&fullscreen=1

You are a senior full-stack engineer, UI/UX designer, product architect, and AI engineer.

Build a production-ready MVP of an AI-powered solo-travel platform called "WANDR SOLO".

PRODUCT VISION:
WANDR SOLO helps solo travelers plan trips, pack intelligently, discover destinations, find trusted people traveling to the same destination, share accommodation/transport costs, and stay safer while traveling.

IMPORTANT:
I have provided UI screenshots as the visual reference. Follow the visual language, layout, spacing, typography, cards, navigation, colors, gradients, imagery, and overall premium dark travel aesthetic shown in those screenshots. Do NOT simply copy the screenshots. Use them as the design system/reference while implementing the functionality described below.

==================================================
1. UI / DESIGN SYSTEM
==================================================

Create a mobile-first responsive application.

Visual style:
- Premium dark travel interface
- Background: deep navy / almost black
- Primary accent: cyan → turquoise gradient
- White bold headings
- Muted gray secondary text
- Rounded cards with subtle borders
- Soft gradients and shadows
- Large destination photography
- Dark image overlays for readability
- Compact modern typography
- Smooth transitions and micro-interactions
- Bottom navigation on mobile
- Responsive sidebar/navigation on desktop

Main navigation:
Home
Explore
Planner
Community
Safety
Profile

Use reusable components:
- Button
- Card
- Input
- Modal
- BottomNavigation
- Navbar
- DestinationCard
- TravelerCard
- TripCard
- StatCard
- ProgressBar
- Badge
- Avatar
- Tabs
- Toast
- Dialog
- Loading states
- Empty states
- Error states

==================================================
2. TECHNOLOGY STACK
==================================================

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Zustand

Backend:
- Node.js
- Express
- TypeScript
- REST API

Database:
- PostgreSQL
- Prisma ORM

Authentication:
- JWT access + refresh tokens
- Google OAuth
- Secure password hashing
- Email verification

Real-time:
- Socket.IO for chat and notifications

AI:
- OpenAI API
- Build the AI layer so the provider can easily be replaced later.

Maps/location:
- Use a map provider abstraction.
- Do not hard-code the application to one provider.

Infrastructure:
- Docker
- Docker Compose
- Environment variables
- Production-ready configuration

Testing:
- Vitest/Jest
- React Testing Library
- Supertest for APIs

==================================================
3. ONBOARDING & AUTHENTICATION
==================================================

Create onboarding screens inspired by the provided screenshots.

Screens:

1. Splash screen
2. "Plan it. Pack it. Go."
3. "Never truly alone."
4. "The whole world, just for you."
5. Login
6. Register
7. Forgot password
8. Traveler profile setup

Profile setup should collect:

- Name
- Email
- Profile photo
- Age range
- Country
- Languages
- Travel style
- Interests
- Preferred destinations
- Typical budget
- Adventure / Culture / Slow Travel
- Accommodation preference
- Preferred companion characteristics
- Verification information

Do not expose sensitive personal information unnecessarily.

==================================================
4. HOME DASHBOARD
==================================================

Build a dashboard similar to the provided design.

Include:

- Greeting
- User avatar
- Upcoming trip
- Trip countdown
- Destination image
- Countries visited
- Total travel days
- Number of trips
- Quick Access

Quick Access:

Packing
Itinerary
Budget
Community
Safety

Also show:

- Trending destinations
- Recommended destinations
- Upcoming trip
- Safety reminders
- Recommended travelers for upcoming destinations

==================================================
5. AI TRIP PLANNER
==================================================

Create a complete trip planner.

User enters:

- Destination
- Start date
- End date
- Number of travelers
- Budget
- Travel style
- Interests
- Activities
- Accommodation preference

AI should generate:

A. Itinerary
- Day-by-day plan
- Activities
- Suggested areas
- Food suggestions
- Transportation suggestions
- Free time
- Estimated cost

B. Packing list
Categorize items into:

Documents
Technology
Clothing
Gear
Health
Toiletries
Finance
Emergency items

Packing recommendations should consider:

- Destination
- Weather
- Duration
- Activities
- Travel style

Allow users to:

- Check/uncheck items
- Add custom items
- Delete items
- Regenerate recommendations
- Save packing lists

==================================================
6. BUDGET MANAGEMENT
==================================================

Create a budget dashboard inspired by the screenshots.

Users can define:

- Total trip budget
- Currency

Track:

Flights
Accommodation
Food
Transport
Activities
Shopping
Emergency
Other

Show:

- Total budget
- Total spent
- Remaining budget
- Percentage used
- Category breakdown
- Expense history

Allow users to add/edit/delete expenses.

==================================================
7. EXPLORE
==================================================

Create a destination discovery page similar to the provided screenshot.

Features:

- Search destinations
- Categories
- Popular destinations
- Nature
- Adventure
- Culture
- Food
- Hidden gems
- Budget destinations

Each destination should display:

- Image
- Destination name
- Country
- Description
- Estimated daily cost
- Travel score
- Tags

Destination detail page:

- Images
- Description
- Best time to visit
- Estimated budget
- Weather
- Safety information
- Popular activities
- Suggested itinerary
- Travelers going there
- "Plan trip" button

==================================================
8. CORE STARTUP FEATURE — TRAVELER MATCHING
==================================================

This is the most important feature.

Users should be able to discover other verified travelers going to the same destination.

Matching criteria:

- Destination
- Travel dates
- Budget
- Travel style
- Interests
- Language
- Age range
- Accommodation preference
- Activities
- Verification status

Create a matching score.

Example:

Destination match = high weight
Date overlap = high weight
Travel style = medium weight
Interests = medium weight
Budget compatibility = medium weight
Language = low/medium weight
Verification = trust factor

Display traveler cards containing:

- Profile photo
- Name
- Age range
- Country
- Verification badge
- Destination
- Travel dates
- Travel style
- Interests
- Approximate budget
- Compatibility score

Actions:

Connect
View profile
Skip
Report

==================================================
9. TRUST & VERIFICATION
==================================================

Create a strong trust system.

Profile verification levels:

Unverified
Email verified
Phone verified
Identity verified

Show verification badges clearly.

Add:

- Traveler ratings
- Reviews
- Completed trips
- Connections
- Report user
- Block user

Never expose private verification documents to other users.

Design the system so identity verification can later be integrated with an external KYC provider.

==================================================
10. COMMUNITY / COST SHARING
==================================================

Users can create or join shared trips.

Example:

"Kyoto — September 22 to October 1"

A traveler can post:

"I have booked a hostel room for 2 people and need one travel companion."

Other travelers can request to join.

Owner can:

- Accept
- Reject
- Remove member

Members can split:

- Accommodation
- Taxi
- Rental car
- Activities
- Tickets
- Other shared expenses

Show:

Total expense
Each person's share
Paid
Pending

Build the architecture so payment integration can be added later.

DO NOT implement fake payment processing.

==================================================
11. CHAT
==================================================

Implement real-time chat using Socket.IO.

Features:

- One-to-one chat
- Trip group chat
- Online/offline status
- Typing indicator
- Read status
- Message timestamps
- Block/report user

Only allow messaging based on the application's connection/privacy rules.

==================================================
12. SAFETY HUB
==================================================

Create a Safety Hub matching the visual style of the provided screenshots.

Include:

Emergency SOS
Emergency contacts
Share itinerary
Share live location
Trip safety checklist
Local emergency numbers
Embassy information
Safety tips

Emergency contact functionality should allow users to store:

Name
Relationship
Phone number

For live location sharing:

- Ask explicit user permission
- Clearly show when sharing is active
- Allow the user to stop sharing immediately
- Never track users secretly

==================================================
13. PROFILE
==================================================

Create a complete profile page.

Show:

Profile photo
Name
Country
Bio
Travel style
Interests
Languages
Verification
Trips
Countries
Reviews
Ratings

Settings:

Account
Notifications
Privacy
Security
Travel preferences
Emergency contacts
Blocked users
Logout

==================================================
14. NOTIFICATIONS
==================================================

Create notifications for:

- Connection request
- Connection accepted
- New message
- Trip invitation
- Trip request accepted/rejected
- Expense update
- Safety reminder
- Upcoming trip
- Packing reminder

Support read/unread state.

==================================================
15. DATABASE DESIGN
==================================================

Create Prisma models for at least:

User
Profile
Verification
TravelPreference
Destination
Trip
TripMember
Itinerary
ItineraryDay
PackingList
PackingItem
Expense
ExpenseParticipant
Connection
Message
Conversation
Notification
EmergencyContact
SafetyShare
Review
Report
BlockedUser

Properly define:

- Primary keys
- Foreign keys
- Indexes
- Unique constraints
- CreatedAt
- UpdatedAt
- Soft deletion where appropriate

Use database migrations.

==================================================
16. API DESIGN
==================================================

Create clean REST APIs.

Example:

POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout

GET /api/users/me
PUT /api/users/me

GET /api/destinations
GET /api/destinations/:id

POST /api/trips
GET /api/trips
GET /api/trips/:id
PUT /api/trips/:id
DELETE /api/trips/:id

POST /api/trips/:id/itinerary/generate
POST /api/trips/:id/packing/generate

GET /api/travelers/matches
POST /api/connections
PUT /api/connections/:id

GET /api/conversations
GET /api/conversations/:id/messages
POST /api/messages

GET /api/expenses
POST /api/expenses

GET /api/safety
POST /api/emergency-contacts

GET /api/notifications

Use:

- Request validation
- Authentication middleware
- Authorization middleware
- Centralized error handling
- Rate limiting
- Logging
- Secure headers
- Input sanitization

==================================================
17. AI ARCHITECTURE
==================================================

Create a dedicated AI service.

Example:

AIService
 ├── generatePackingList()
 ├── generateItinerary()
 ├── recommendDestinations()
 └── calculateTravelSuggestions()

Never expose API keys in frontend code.

Use structured JSON responses from the AI.

Validate AI responses before saving them to the database.

Include fallback behavior when the AI service is unavailable.

==================================================
18. SECURITY
==================================================

Implement:

- Password hashing
- JWT rotation
- Secure cookies where appropriate
- CORS configuration
- Rate limiting
- Input validation
- Authorization checks
- SQL injection protection through Prisma
- XSS protection
- Secure file upload validation
- Privacy controls
- Account deletion
- Data minimization

Do not store unnecessary sensitive identity information.

==================================================
19. RESPONSIVE DESIGN
==================================================

Mobile UI is the primary design target.

The screenshots are approximately mobile-app proportions.

Desktop should adapt naturally:

- Sidebar navigation
- Multi-column dashboards
- Larger destination cards
- Responsive grids
- Expanded chat interface

Do not simply stretch the mobile UI onto desktop.

==================================================
20. PROJECT STRUCTURE
==================================================

Use a clean monorepo:

/apps
  /web
  /api

/packages
  /ui
  /types
  /config

/apps/web:
components
pages
features
hooks
services
stores
layouts
routes

/apps/api:
controllers
services
routes
middleware
validators
repositories
utils
config

/prisma:
schema.prisma
migrations
seed

==================================================
21. DEVELOPMENT APPROACH
==================================================

Do NOT generate the entire application as one huge uncontrolled file.

Build incrementally.

Phase 1:
Project setup + design system + routing

Phase 2:
Authentication + onboarding

Phase 3:
Home + Explore

Phase 4:
Trip Planner + AI packing assistant

Phase 5:
Itinerary + Budget

Phase 6:
Traveler matching

Phase 7:
Connections + Chat

Phase 8:
Cost sharing

Phase 9:
Safety Hub

Phase 10:
Profile + Notifications

Phase 11:
Testing + security + optimization

Phase 12:
Docker + production deployment

After each phase:
- Make sure the application runs
- Fix TypeScript errors
- Fix lint errors
- Test APIs
- Test important user flows
- Do not break previously implemented functionality

==================================================
22. MOST IMPORTANT PRODUCT PRINCIPLE
==================================================

The application should feel like a real startup product, not a demo.

Prioritize:

1. Beautiful UI matching the provided design reference
2. Excellent mobile UX
3. Trust and safety
4. Traveler matching
5. AI-powered trip planning
6. Cost sharing
7. Scalable architecture
8. Clean, maintainable code

Avoid placeholder screens wherever possible.

Use realistic seed data for destinations, travelers, trips, expenses and reviews so the application looks populated during development.

Create reusable components rather than duplicating UI.

At the end of each development phase, clearly tell me:
- What was implemented
- Files created/changed
- How to run it
- Environment variables required
- What should be built next
