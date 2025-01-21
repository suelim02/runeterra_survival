const cors = require('cors');

const corsMiddleware = cors({
  origin: ['http://localhost:3000', 'http://172.10.7.66:3000', 'http://172.10.7.66:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Authorization 헤더 허용
});

module.exports = corsMiddleware;