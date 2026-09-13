# Solo Traveller API Feature Reference

This document describes the current backend features, API routes, request bodies, permissions, and product use cases.

## Project Overview

Solo Traveller is a REST API for solo travellers who want to create trips, discover other travellers, exchange match requests, and receive trip invitations.

Current backend stack:

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- Prisma
- Zod validation
- JWT Bearer authentication

The API currently has no `/api` prefix. Routes are mounted directly from the server root.

Example local base URL:

```text
http://localhost:8080
```

Most endpoints require this header:

```http
Authorization: Bearer <jwt-token>
```

## Feature Status

| Feature | Status | Notes |
| --- | --- | --- |
| Authentication | Implemented | Register, login, active user, change password |
| User Profiles | Implemented | Own profile, public user lookup, filtering, profile update |
| Manual Packing Lists | Implemented | Private lists with nested packing items |
| Trips | Implemented | Create, search, view, update, delete, and user trip history |
| Match Requests | Implemented | Traveller interest workflow for a trip owner |
| Trip Invites | Implemented | Trip owner invitation workflow |
| Chat and Messages | Planned | Routes exist, but handlers and queries are still stubs |
| Emergency Contacts | Implemented | Authenticated users can create, list, update, and delete their own trusted contacts |
| Verification | Deferred | Routes and schema exist, but implementation is postponed |
| Friends | Excluded for now | The product will not implement the Friends feature |
| AI Smart Packing Assistant | Deferred | Manual packing lists are available; AI generation is postponed |

## Common Response Shape

Successful responses generally use this structure:

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

Validation or authorization errors generally use:

```json
{
  "success": false,
  "message": "Error description"
}
```

## 1. Authentication

Authentication creates the JWT used by protected endpoints.

### Register

```http
POST /traveller/auth/register
Content-Type: application/json
```

Request body:

```json
{
  "fullName": "Aarav Sharma",
  "email": "aarav@example.com",
  "password": "secret123",
  "phone": "+919876543210",
  "age": 28,
  "gender": "MALE",
  "profession": "Software Engineer",
  "city": "Bengaluru",
  "bio": "I enjoy hiking and road trips.",
  "profileImage": "https://example.com/profile.jpg"
}
```

Required fields are `fullName`, `email`, `password`, `age`, and `gender`. The other fields are optional.

### Login

```http
POST /traveller/auth/login
Content-Type: application/json
```

```json
{
  "email": "aarav@example.com",
  "password": "secret123"
}
```

Use case: the client stores the returned JWT and sends it with protected requests.

### Get Active User

```http
GET /traveller/auth/activeUser
Authorization: Bearer <token>
```

Use case: restore the logged-in user when the application starts.

### Change Password

```http
POST /traveller/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "oldPassword": "secret123",
  "newPassword": "newsecret456"
}
```

## 2. User Profiles

User APIs allow travellers to discover profiles and manage their own profile.

### List Users

```http
GET /traveller/user/Users
Authorization: Bearer <token>
```

### Filter Users

```http
GET /traveller/user?city=Bengaluru&profession=Designer&gender=FEMALE&limit=10&offset=0
Authorization: Bearer <token>
```

Supported filters include `city`, `profession`, `gender`, `role`, `isActive`, `limit`, and `offset`.

Use case: find potential travel companions using basic profile information.

### Get Own Profile

```http
GET /traveller/user/profile
Authorization: Bearer <token>
```

### Get Another User

```http
GET /traveller/user/:id
Authorization: Bearer <token>
```

### Update Own Profile

```http
PATCH /traveller/user/updateProfile
Authorization: Bearer <token>
Content-Type: application/json
```

Example body:

```json
{
  "fullName": "Aarav Sharma",
  "city": "Pune",
  "profession": "Product Designer",
  "bio": "Interested in trekking and photography."
}
```

The user ID comes from the JWT and should not be supplied in the request body.

## 3. Manual Packing Lists

The manual Packing feature lets each user create private packing lists. AI-generated packing recommendations are intentionally deferred.

### Create Packing List

```http
POST /traveller/packing/lists
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Goa Weekend Packing",
  "destination": "Goa",
  "startDate": "2026-10-10T00:00:00.000Z",
  "endDate": "2026-10-13T00:00:00.000Z",
  "items": [
    {
      "name": "Sunscreen",
      "quantity": 1,
      "category": "Health",
      "checked": false
    },
    {
      "name": "T-shirts",
      "quantity": 3,
      "category": "Clothing",
      "checked": false
    }
  ]
}
```

The authenticated user becomes the owner. Items are created together with the list.

### List Own Packing Lists

```http
GET /traveller/packing/lists
Authorization: Bearer <token>
```

### Get One Packing List

```http
GET /traveller/packing/lists/:id
Authorization: Bearer <token>
```

### Update Packing List

```http
PATCH /traveller/packing/lists/:id
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Updated Goa Packing List",
  "items": [
    {
      "name": "Sunscreen",
      "quantity": 1,
      "category": "Health",
      "checked": true
    }
  ]
}
```

If `items` is included, the nested item collection is replaced with the submitted collection.

### Delete Packing List

```http
DELETE /traveller/packing/lists/:id
Authorization: Bearer <token>
```

Use case: save reusable trip preparation lists while keeping each user’s lists private.

## 4. Trips

Trips are travel plans created by users and made available for discovery and matching.

### Create Trip

```http
POST /traveller/trips
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "destination": "Manali",
  "startDate": "2026-11-10T00:00:00.000Z",
  "endDate": "2026-11-16T00:00:00.000Z",
  "budget": 25000,
  "tripType": "TREKKING",
  "description": "Looking for a small group for a Himalayan trek."
}
```

Supported `tripType` values:

```text
TREKKING, ROADTRIP, BEACH, CAMPING, SIGHTSEEING, BUSINESS
```

The authenticated user becomes the trip owner.

### Search Trips

```http
GET /traveller/trips?destination=Manali&tripType=TREKKING&status=OPEN
Authorization: Bearer <token>
```

Trip filters include destination, trip type, status, date range, limit, and offset where supported by the trip handler.

### Get Trip

```http
GET /traveller/trips/:id
Authorization: Bearer <token>
```

### Update Trip

```http
PATCH /traveller/trips/:id
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "description": "Dates confirmed for the trek.",
  "status": "OPEN"
}
```

### Delete Trip

```http
DELETE /traveller/trips/:id
Authorization: Bearer <token>
```

### Get Trips Owned by a User

```http
GET /traveller/trips/user/:userId
Authorization: Bearer <token>
```

Use case: publish a travel plan that other users can inspect and respond to.

## 5. Match Requests

A Match Request is sent by a traveller who is interested in joining or connecting around another user’s trip.

Workflow:

1. A traveller finds an open trip.
2. The traveller sends a Match Request to the trip owner.
3. The trip owner views received requests.
4. The trip owner accepts or rejects the request.

### Send Match Request

```http
POST /traveller/trips/:tripId/match-requests
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "receiverId": 12
}
```

Rules:

- The sender comes from the JWT.
- The receiver must exist.
- The receiver must own the selected trip.
- A user cannot send a request to themselves.
- The trip must be `OPEN`.
- A duplicate pending request is rejected.

### View Requests for a Trip

```http
GET /traveller/trips/:tripId/match-requests
Authorization: Bearer <trip-owner-token>
```

Only the trip owner can view requests for that trip.

### View Received Match Requests

```http
GET /traveller/match-requests
Authorization: Bearer <token>
```

Returns requests where the authenticated user is the receiver.

### Respond to Match Request

```http
PATCH /traveller/match-requests/:id
Authorization: Bearer <trip-owner-token>
Content-Type: application/json
```

```json
{
  "status": "ACCEPTED"
}
```

Allowed values:

```text
ACCEPTED, REJECTED
```

Only the receiver can respond, and only while the request is `PENDING`.

## 6. Trip Invites

A Trip Invite is sent by a trip owner to directly invite a selected traveller to join a trip.

Workflow:

1. A trip owner selects a traveller.
2. The owner sends an invite with an optional message.
3. The traveller views received invites.
4. The traveller accepts or declines the invite.

### Send Trip Invite

```http
POST /traveller/trips/:tripId/invites
Authorization: Bearer <trip-owner-token>
Content-Type: application/json
```

```json
{
  "receiverId": 25,
  "message": "Would you like to join my Manali trip?"
}
```

Rules:

- Only the trip owner can send the invite.
- The receiver must exist.
- A user cannot invite themselves.
- The trip must be `OPEN`.
- A duplicate pending invite is rejected.
- `message` is optional and supports up to 500 characters.

### View Invites for a Trip

```http
GET /traveller/trips/:tripId/invites
Authorization: Bearer <trip-owner-token>
```

Only the trip owner can view all invites for that trip.

### View Received Invites

```http
GET /traveller/invites
Authorization: Bearer <token>
```

Returns invites where the authenticated user is the receiver.

### Respond to Trip Invite

```http
PATCH /traveller/invites/:id
Authorization: Bearer <receiver-token>
Content-Type: application/json
```

```json
{
  "status": "ACCEPTED"
}
```

Allowed values:

```text
ACCEPTED, DECLINED
```

Only the receiver can respond, and only while the invite is `PENDING`.

### Match Request vs Trip Invite

| Match Request | Trip Invite |
| --- | --- |
| Traveller expresses interest in a trip | Trip owner directly invites a traveller |
| Traveller sends it to the trip owner | Trip owner sends it to a selected traveller |
| No message field | Optional message field |
| Receiver accepts or rejects | Receiver accepts or declines |

## 7. Chat and Messages

Chat is planned but not implemented yet. The database models and routes exist, but the current handlers return `501 Not Implemented`.

Registered routes:

```http
POST /traveller/chats
GET /traveller/chats
GET /traveller/chats/:id/messages
POST /traveller/chats/:id/messages
PATCH /traveller/messages/:id
DELETE /traveller/messages/:id
```

Planned use case:

- Users who have matched or accepted a trip invite can communicate privately.
- Only chat participants should access a chat.
- Only participants should send messages.
- Only the sender should update or delete their own message.

Planned create chat body:

```json
{
  "participantIds": [12, 25]
}
```

Planned send message body:

```json
{
  "content": "Let us confirm the travel dates."
}
```

## 8. Emergency Contacts

Emergency Contacts are planned but not implemented yet. The current feature is only for storing a user’s trusted contacts; it is not an SOS or live-location system.

Registered routes:

```http
POST /traveller/emergency-contacts
GET /traveller/emergency-contacts
PATCH /traveller/emergency-contacts/:id
DELETE /traveller/emergency-contacts/:id
```

Planned create body:

```json
{
  "name": "Rahul Sharma",
  "phone": "+919876543210",
  "relation": "Brother"
}
```

Planned rules:

- The authenticated user owns the contact.
- `userId` must come from the JWT, not the body.
- Users can only list, update, and delete their own contacts.
- The current schema does not support SOS alerts, SMS, email, or live location.

## 9. Verification

Verification is intentionally deferred. The schema supports verification records, but the handlers and queries currently return `501 Not Implemented`.

Registered routes:

```http
POST /traveller/verification/submit
GET /traveller/verification/status
GET /traveller/verification/pending
PATCH /traveller/verification/:id
```

Planned submission body:

```json
{
  "type": "ID_DOCUMENT",
  "documents": "https://storage.example.com/verification/id-proof.pdf"
}
```

Allowed types:

```text
ID_DOCUMENT, PHONE, EMAIL, PASSPORT
```

Planned admin review body:

```json
{
  "status": "APPROVED"
}
```

Allowed review statuses:

```text
APPROVED, REJECTED
```

The `documents` field is currently a string storage pointer or URL. File upload and OTP verification are not implemented.

## 10. Friends

The Friends feature is intentionally excluded from the website. Although Friend Request models, schemas, and routes remain in the codebase, they are not part of the active product scope and their handlers are still stubs.

Registered routes currently present in the backend:

```http
POST /traveller/friends/request
GET /traveller/friends/requests/received
GET /traveller/friends/requests/sent
PATCH /traveller/friends/requests/:id
DELETE /traveller/friends/requests/:id
```

These routes should not be used by the frontend unless the Friends feature is reintroduced.

## 11. Deferred AI Smart Packing

The current Packing feature is manual only. The planned AI Smart Packing Assistant may later generate packing suggestions based on:

- Destination
- Weather
- Trip duration
- Activities
- Travel type
- User-customized preferences

No AI provider or generation endpoint is currently implemented.

## Recommended Implementation Order

Based on the current scope:

1. Complete Chat and Messages.
2. Complete Emergency Contact CRUD.
3. Add API smoke tests and Postman documentation.
4. Implement Verification when the product is ready for it.
5. Add AI Smart Packing later.
6. Keep Friends excluded unless the product requirements change.

## Security Checklist

- Require JWT authentication on private endpoints.
- Derive the current user ID from the JWT.
- Do not trust `userId` from request bodies.
- Scope private resources by ownership or chat participation.
- Do not return password fields in API responses.
- Enforce owner/receiver permissions before updates.
- Reject duplicate pending requests or invites.
- Validate IDs, enum values, dates, and text lengths.
- Keep deferred or stubbed routes out of the frontend navigation.
