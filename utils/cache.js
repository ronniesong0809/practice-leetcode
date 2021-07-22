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
        console.log("Questions retrieved from Redis");
        res.status(200).send(data);
      } else {
        method.then(function (response) {
          const questions = response;
          client.setex(key, 600, JSON.stringify(questions));
          console.log("Questions retrieved from MongoDB");
          res.status(200).send(questions);
        });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = redisCache;