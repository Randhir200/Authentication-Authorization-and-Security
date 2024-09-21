const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res) => {
    // Retrieve the token from the headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({status: "failed", message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // If the token is not present, respond with an unauthorized status
    if (!token) {
        return res.status(401).json({status: "failed", message: 'Unauthorized' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If verification is successful, send a success message with user ID
        return res.status(200).json({ status: "success", userId: decoded._id});
    } catch (error) {
        // If there's an error (e.g., token expired or invalid), respond with unauthorized
        return res.status(401).json({status: "failed", message: 'Unauthorized' });
    }
};

module.exports = protectedRoute;
