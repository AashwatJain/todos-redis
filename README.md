# Rate-Limited Cached API 🚀

A simple and lightning-fast Todo API backend connected to MongoDB, implementing **Redis Caching** and **Rate Limiting**. This project demonstrates how to bring API response times down to under 10ms and protect your server from spam.

## 🌟 Features

- **Blazing Fast Responses:** The first request is served from MongoDB, and all subsequent requests are served from the Redis Cache.
- **Cache Invalidation:** When a new Todo is added, the cache is automatically cleared so the user always gets fresh data.
- **IP-Based Rate Limiting:** Allows a maximum of 10 requests from a single IP address per minute, throwing a `429 Rate limit exceeded` error afterward. The counter resets automatically.

## 🛠️ Tech Stack

- **Node.js + Express:** API Server
- **MongoDB + Mongoose:** Primary Database
- **Redis (ioredis):** In-memory data structure store for Caching & Rate Limiting

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js**, **MongoDB**, and **Redis Server** running on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables Setup
Create a `.env` file in the root folder and add the following:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/todo-redis
```

### 3. Run the Server
```bash
npm start
# The server will start on http://localhost:8000
```

## 📡 API Endpoints

### 1. Create a New Todo
**POST** `/todos`
```json
// Request Body
{
  "task": "Learn Redis implementation"
}
```

### 2. Fetch All Todos (Cached)
**GET** `/todos`
- **Cache Miss:** Fetches from MongoDB (takes slightly longer) and saves in Redis for 100 seconds.
- **Cache Hit:** Served directly from Redis (Under 10ms).

### 3. Fetch Single Todo (Cached)
**GET** `/todo/:id`
- Fetches a specific todo by its ID from either the Redis cache or MongoDB.

## 💡 Concepts Used
- **Redis `SET` & `GET`:** Used to serialize/deserialize data into JSON strings for storage.
- **Redis `DEL`:** Used to invalidate the cache when the database gets updated.
- **Redis `INCR` & `EXPIRE`:** Used to create an atomic rate-limiting counter.
