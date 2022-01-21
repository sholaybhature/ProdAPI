import redis from "redis";

const client = redis.createClient();
await client.connect();
client.on("error", (err) => console.log("Error in connecting to redis", err));

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
          quota: MAX_WINDOW_REQUEST_COUNT,
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
        console.log(timeDiff);
        if (timeDiff / 1000 > WINDOW_SIZE_IN_SECONDS) {
          reqData.timestamp = Date.now();
          reqData.quota = MAX_WINDOW_REQUEST_COUNT;
          await client.set(req.ip, JSON.stringify(reqData));
          next();
        } else {
          res.status(429);
          res.send("You have reached your quota");
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
