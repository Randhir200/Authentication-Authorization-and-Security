const jwt = require('jsonwebtoken');
const { response } = require('../utils/response');

const protectedRoute = async (req, res) => {
    // Retrieve the token from the headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response(res, 'unauthorized', 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    // If the token is not present, respond with an unauthorized status
    if (!token) {
        return response(res, 'unauthorized', 'Unauthorized');
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If verification is successful, send a success message with user ID
        return response(res, 'success', 'Token is valid', { userId: decoded._id });
    } catch (error) {
        // If there's an error (e.g., token expired or invalid), respond with unauthorized
        return response(res, 'unauthorized', 'Unauthorized');
    }
};

module.exports = protectedRoute;
