const Redis = require('ioredis').default;

const { redis: RedisOptions } = require('../config');

const redis = new Redis({
   host: RedisOptions.hostname,
   password: RedisOptions.password,
   port: RedisOptions.port,
   tls: true
});

module.exports = redis;
