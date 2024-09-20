const portectedRoute = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: `Welcome ${decoded.username}` });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = portectedRoute;
