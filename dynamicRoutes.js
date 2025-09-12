const express = require('express');
const { middlewareHandler } = require('./middlewares/middlewares.js');
const { handleGoogleLogin, handleFacebookLogin } = require('./middlewares/auth.js');

module.exports = () => {
    const router = express.Router();

    // Social auth routes
    // router.post('/api/auth/google-login', handleGoogleLogin);
    // router.post('/api/auth/facebook-login', handleFacebookLogin);

    // Regular API routes
    router.use('/api', (req, res, next) => middlewareHandler(req, res, next));

    return router;
};
