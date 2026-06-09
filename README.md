# Redis Project 2: Rate-Limited Cached API 🚀

Ek simple aur lightning-fast Todo API backend jo MongoDB se connected hai, aur jisme **Redis Caching** aur **Rate Limiting** implement ki gayi hai. Ye project dikhata hai ki kaise hum API response time ko under 10ms la sakte hain aur apne server ko spam se bacha sakte hain.

## 🌟 Features

- **Blazing Fast Responses:** Pehli request MongoDB se aati hai, uske baad ki saari requests Redis Cache se serve hoti hain.
- **Cache Invalidation:** Jab naya Todo add hota hai, cache automatically clear ho jata hai taki user ko hamesha fresh data mile.
- **IP-Based Rate Limiting:** Ek single IP address se maximum 10 requests allow karta hai uske baad `400 Rate limit exceeded` throw karta hai. Ek minute me counter reset hota hai.

## 🛠️ Tech Stack

- **Node.js + Express:** API Server
- **MongoDB + Mongoose:** Primary Database
- **Redis (ioredis):** In-memory data structure store for Caching & Rate Limiting

## 🚀 Getting Started

### Prerequisites
Make sure aapke system pe **Node.js**, **MongoDB**, aur **Redis Server** chal rahe hon.

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables Setup
Root folder me ek `.env` file banayein aur ye add karein:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/todo-redis
```

### 3. Run the Server
```bash
npm start
# Server start ho jayega http://localhost:8000 pe
```

## 📡 API Endpoints

### 1. Naya Todo Banao
**POST** `/todos`
```json
// Request Body
{
  "task": "Learn Redis implementation"
}
```

### 2. Saare Todos Fetch Karo (Cached)
**GET** `/todos`
- **Cache Miss:** MongoDB se aayega (thoda time lega) aur Redis me 100 seconds ke liye save ho jayega.
- **Cache Hit:** Redis se aayega (Under 10ms).

### 3. Single Todo Fetch Karo (Cached)
**GET** `/todo/:id`
- Specific todo ko uski ID se MongoDB ya Redis cache se fetch karta hai.

## 💡 Concepts Used
- **Redis `SET` & `GET`:** Data ko JSON string me serialize/deserialize karke store karne ke liye.
- **Redis `DEL`:** Cache invalidate karne ke liye jab Database me update hota hai.
- **Redis `INCR` & `EXPIRE`:** Atomic rate limiting counter bananne ke liye.
