const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res) => {
    console.log(req.cookies);
    // Retrieve the token from the HTTP-only cookie
    // const token = req.cookies.token;

    // // If the token is not present, respond with an unauthorized status
    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    // try {
    //     // Verify the token using the secret key
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     // If verification is successful, send a success message
    //     return res.json({ message: `Welcome ${decoded.username}` });
    // } catch (error) {
    //     // If there's an error (e.g., token expired or invalid), respond with unauthorized
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
};

module.exports = protectedRoute;
