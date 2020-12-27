// const User = require('../models/user');
// const config = require('../config/config');
// const expressJWT = require('express-jwt');
// const jwtAuth = require('./jwtAuth')

const auth = async(req,res,next)=>{
    if(req.user.role != 1){
        return res.send("你没有权限")
    }
    next()
}

module.exports = auth;