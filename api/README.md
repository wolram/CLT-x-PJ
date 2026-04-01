# cltxpj.app.br API Documentation

Base URL: `https://cltxpj.app.br/api`

## Authentication

### Public Endpoints
No authentication required for:
- `POST /submissions`
- `POST /telemetry`
- `GET /health`

### Admin Endpoints
All `/admin/*` endpoints require HTTP Basic Authentication:
```
Authorization: Basic <base64(username:password)>
```

## Endpoints

### Health Check

#### GET /health
Returns API health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-04-01T00:00:00.000Z",
  "uptime": 123.456,
  "database": "connected"
}
```

### Waitlist Submissions

#### POST /submissions
Create a new waitlist submission.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "tecnologia",
  "challenge": "Understanding CLT vs PJ tradeoffs",
  "source": "android-waitlist"
}
```

**Response (201):**
```json
{
  "id": 1,
  "message": "Submission created"
}
```

**Validation:**
- `email` (required): Valid email address
- `name` (optional): Max 255 characters
- `role` (optional): Max 100 characters
- `challenge` (optional): Text
- `source` (optional): Max 100 characters

#### GET /submissions
List waitlist submissions (admin only).

**Query Parameters:**
- `limit` (default: 100): Number of results
- `offset` (default: 0): Pagination offset
- `status` (optional): Filter by activation_status

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "tecnologia",
    "challenge": "Understanding CLT vs PJ tradeoffs",
    "source": "android-waitlist",
    "activation_status": "pending",
    "created_at": "2026-04-01T00:00:00.000Z",
    "updated_at": "2026-04-01T00:00:00.000Z"
  }
]
```

#### GET /submissions/:id
Get a single submission (admin only).

**Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "tecnologia",
  "challenge": "Understanding CLT vs PJ tradeoffs",
  "source": "android-waitlist",
  "activation_status": "pending",
  "created_at": "2026-04-01T00:00:00.000Z",
  "updated_at": "2026-04-01T00:00:00.000Z"
}
```

#### PATCH /submissions/:id/status
Update submission status (admin only).

**Request Body:**
```json
{
  "activation_status": "contacted"
}
```

**Valid statuses:**
- `pending`
- `contacted`
- `scheduled`
- `onboarded`
- `not_interested`

**Response (200):**
```json
{
  "message": "Status updated"
}
```

#### DELETE /submissions/:id
Delete a submission (admin only).

**Response (200):**
```json
{
  "message": "Submission deleted"
}
```

### Telemetry

#### POST /telemetry
Record a telemetry event.

**Request Body:**
```json
{
  "event_type": "simulator_calculated",
  "event_data": {
    "clt_value": 6000,
    "pj_value": 9500,
    "result": "pj_higher"
  }
}
```

**Response (201):**
```json
{
  "id": 1
}
```

#### GET /telemetry/summary
Get telemetry event summary (admin only).

**Response (200):**
```json
{
  "eventCounts": {
    "simulator_calculated": 150,
    "android_waitlist_submit": 45,
    "blog_view": 23
  },
  "totalEvents": 218
}
```

#### GET /telemetry
List telemetry events (admin only).

**Query Parameters:**
- `limit` (default: 100): Number of results
- `offset` (default: 0): Pagination offset
- `event_type` (optional): Filter by event_type

**Response (200):**
```json
[
  {
    "id": 1,
    "event_type": "simulator_calculated",
    "event_data": {"clt_value": 6000, "pj_value": 9500},
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0...",
    "created_at": "2026-04-01T00:00:00.000Z"
  }
]
```

## Database Schema

### waitlist_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | INT AUTO_INCREMENT | Primary key |
| name | VARCHAR(255) | User name |
| email | VARCHAR(255) | User email (required) |
| role | VARCHAR(100) | Professional role |
| challenge | TEXT | User challenge description |
| source | VARCHAR(100) | Submission source |
| activation_status | VARCHAR(50) | Status: pending, contacted, scheduled, onboarded, not_interested |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### telemetry_events
| Column | Type | Description |
|--------|------|-------------|
| id | INT AUTO_INCREMENT | Primary key |
| event_type | VARCHAR(100) | Event type identifier |
| event_data | JSON | Event payload |
| ip_address | VARCHAR(45) | Client IP address |
| user_agent | TEXT | Client user agent |
| created_at | TIMESTAMP | Event timestamp |

## Deployment

### Environment Variables
```bash
NODE_ENV=production
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=cltxpj_user
DB_PASSWORD=your_secure_password
DB_NAME=cltxpj
CORS_ORIGIN=https://cltxpj.app.br
```

### Setup
```bash
# Install dependencies
cd api && npm install

# Run migrations
npm run db:migrate

# Start server
npm start
```
