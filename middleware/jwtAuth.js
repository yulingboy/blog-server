const config = require('../config/config');
const expressJWT = require('express-jwt');

const jwtAuth = expressJWT({ secret: config.secretKey, algorithms: ['HS256'] }).unless({
    path: [
      '/api/admin/v2/login',
      '/api/admin/v2/reg',
      '/api/admin/v2/captcha',
      // '/api/admin/v2/users',
      /^\/home\//
    ]
  })
  module.exports = jwtAuth;