#  Express Twitter Clone Backend

A Twitter-like backend system built using **Express.js**, **PostgreSQL**, **Sequelize**, **Redis**, **JWT Authentication**, and **BullMQ** for background tasks — fully Dockerized and ready for production.

---

## Tech Stack

- **Node.js / Express.js** – RESTful API framework
- **PostgreSQL + Sequelize** – Database & ORM
- **Redis** – OTP storage and background job queue
- **BullMQ** – Background job processing (like Celery in Python)
- **JWT** – Access & Refresh token-based authentication
- **Docker & Docker Compose** – Containerized environment
- **Nodemailer** – Email support
- **Nodemon** – Development reloading

---

## 🛠️ Features

✅ User Authentication  
✅ JWT Access & Refresh Tokens  
✅ Secure Logout with Refresh Token Blacklisting  
✅ OTP-Based Password Reset via Redis  
✅ Email Delivery with BullMQ  
✅ Tweeting (Create/Edit/Delete) with Public/Private Visibility  
✅ Follow/Unfollow Users with Validation  
✅ Pagination on Lists  
✅ Fully Asynchronous Queue-based Email System

---

##  Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Node.js & npm (optional, if not using Docker for dev)

---

###  Setup & Run with Docker

```bash
# Clone the repo
git clone https://github.com/your-username/express-twitter-clone.git
cd express-twitter-clone

# Build and run the containers
docker-compose up --build
