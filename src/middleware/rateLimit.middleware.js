import { redis } from "../config/redis.js";

const rateLimit = async (req, res, next) => {
  try {
    const ip = req.ip;

    console.log(ip);

    const count = await redis.incr(`rate:${ip}`);

    console.log(count);

    if (count === 1) {
      await redis.expire(`rate:${ip}`, 60);
    }

    if (count > 10) {
      return res.status(400).json({ message: "Rate limit exceeded" });
    }

    next();
  } catch (error) {
    console.log("Error", error);
  }
};

export { rateLimit };
