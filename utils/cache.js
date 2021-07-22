const env = require("./environment");
const redis = require("redis");
const client = redis.createClient(env.REDIS_URL);

const redisCache = async (key, method, res) => {
  try {
    client.get(key, (error, data) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (data) {
        console.log(`[${key}] ${JSON.parse(data).length} questions retrieved from Redis`);
        res.status(200).send(data);
      } else {
        method.then(function (response) {
          const data = response;
          client.setex(key, 3600, JSON.stringify(data));
          console.log(`[${key}] ${data.length} questions retrieved from MongoDB`);
          res.status(200).send(data);
        });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = redisCache;
