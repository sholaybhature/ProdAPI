import redis from "redis";
import logger from "../config/logging.js";
import { QuotaLimitExceededError } from "../utils/apiError.js";

const client = redis.createClient();
await client.connect();
client.on("error", (err) => logger.error(err));

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_WINDOW_REQUEST_COUNT = 5;

// Based on Fixed Window
async function redisRateLimiter(req, res, next) {
  try {
    // If there's a quota for an existing IP
    let existingReq = await client.get(req.ip);
    if (!existingReq) {
      await client.set(
        req.ip,
        JSON.stringify({
          quota: MAX_WINDOW_REQUEST_COUNT - 1,
          timestamp: Date.now(),
        })
      );
      next();
    } else {
      // If time between new req and last timestamp is greater than
      // MAX_WINDOW, replenish the quota. Else, reject the request.
      let reqData = JSON.parse(existingReq);
      if (reqData.quota == 0) {
        let timeDiff = Date.now() - reqData.timestamp;
        if (timeDiff / 1000 > WINDOW_SIZE_IN_SECONDS) {
          reqData.timestamp = Date.now();
          reqData.quota = MAX_WINDOW_REQUEST_COUNT - 1;
          await client.set(req.ip, JSON.stringify(reqData));
          next();
        } else {
          next(new QuotaLimitExceededError());
        }
      } else {
        // Decrement the quota
        reqData.quota = reqData.quota - 1;
        await client.set(req.ip, JSON.stringify(reqData));
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

export default redisRateLimiter;
