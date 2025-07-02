# 🐦 Twitter-like Backend (Express.js)

A fully asynchronous, production-ready backend system for a Twitter-like platform using **Node.js**, **Express**, **PostgreSQL**, **Redis**, **Sequelize**, **JWT**, and **Docker**.

---

## 📦 Tech Stack

- **Node.js + Express**
- **PostgreSQL** with Sequelize ORM
- **Redis** for OTP & blacklisted tokens
- **JWT** (Access + Refresh tokens)
- **BullMQ** for background email sending
- **Swagger** for API docs
- **Docker + Docker Compose**

---

## 🚀 Getting Started

### 1. Clone & Setup

```bash
git clone https://github.com/your-username/twitter-backend.git
cd twitter-backend
cp .env.example .env
```

### 2. Run with Docker

```bash
docker-compose up --build
```

App available at: [http://localhost:7000](http://localhost:7000)\
Swagger docs: [http://localhost:7000/api/docs](http://localhost:7000/api/docs)

---

## 🔐 Auth API

### Register

```bash
curl -X POST http://localhost:7000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"StrongPass123!"}'
```

### Login

```bash
curl -X POST http://localhost:7000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"StrongPass123!"}'
```

### Refresh Token

```bash
curl -X POST http://localhost:7000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'
```

### Logout

```bash
curl -X POST http://localhost:7000/api/auth/logout \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'
```

---

## 🔁 OTP Reset Flow

### Request OTP

```bash
curl -X POST http://localhost:7000/api/auth/request-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

### Reset Password

```bash
curl -X POST http://localhost:7000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456","newPassword":"NewPass123!"}'
```

---

## 🐦 Tweets

### Create Tweet

```bash
curl -X POST http://localhost:7000/api/tweets \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello world!", "isPrivate":false}'
```

### Edit Tweet

```bash
curl -X PUT http://localhost:7000/api/tweets/<TWEET_ID> \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Updated", "isPrivate":true}'
```

### Delete Tweet

```bash
curl -X DELETE http://localhost:7000/api/tweets/<TWEET_ID> \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### Public Tweets

```bash
curl http://localhost:7000/api/tweets?page=1&limit=10
```

### Feed (Followed Users)

```bash
curl http://localhost:7000/api/tweets/feed \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

---

## 👥 Follow System

### Follow a User

```bash
curl -X POST http://localhost:7000/api/follow/<USER_ID> \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### Unfollow a User

```bash
curl -X DELETE http://localhost:7000/api/unfollow/<USER_ID> \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### Get Followers

```bash
curl http://localhost:7000/api/followers/<USER_ID>
```

### Get Following

```bash
curl http://localhost:7000/api/following/<USER_ID>
```

---

## 🧰 Environment Variables (`.env`)

```env
PORT=7000
DB_HOST=db
DB_PORT=5432
DB_NAME=twitterdb
DB_USER=postgres
DB_PASS=postgres

REDIS_HOST=redis
REDIS_PORT=6379

JWT_ACCESS_SECRET=supersecretaccess
JWT_REFRESH_SECRET=supersecretrefresh

SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_pass
```

---

## 🧼 Useful Scripts

```bash
# Start dev mode (non-Docker)
npm run dev

# Format with Prettier
npm run format
```

---

## ✅ Features Recap

- User registration & login
- Secure token-based auth (JWT)
- OTP-based password reset via Redis
- Email queue with BullMQ
- Tweet visibility (public/private)
- Follow/unfollow users
- Dockerized environment

---

## 🧪 Swagger Docs

Visit: [http://localhost:7000/api/docs](http://localhost:7000/api/docs)

---

## 📄 License


