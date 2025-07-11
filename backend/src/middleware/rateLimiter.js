import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
    const {success} = await ratelimit.limit("my-limit-key");
    if (!success) {
        return res.status(429).json({
            message: "Too many requests, please try again later.",
        });
    }
    next();
   } catch(error) {
    console.error("Error in rate limiter middleware!");
    next(error);
   }

};

export default rateLimiter;









// Correct initialization for rate-limiter-flexible
// import { RateLimiterMemory } from 'rate-limiter-flexible';

// const rateLimiter = new RateLimiterMemory({
//   points: 2, // 10 requests
//   duration: 60, // per 60 second
// });

// export const rateLimiterMiddleware = async (req, res, next) => {
//   try {
//    const {success} = await rateLimiter.consume(req.ip); // Note: Using consume() not limit()
//   if (success) {
//         return res.status(429).json({
//             message: "Too many requests, please try again later.",
//         });
//     }
//     next();
//    } catch(error) {
//     console.error("Error in rate limiter middleware!");
//     next(error);
//    }
// };


// // Make sure you're exporting properly
// export default rateLimiterMiddleware;