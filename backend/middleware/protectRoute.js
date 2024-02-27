import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const secretKey = '0hpn4YPOhqa1XNmfYdf8bzfkaTfmU8gQqyksTpNxp8I=';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ error: 'Unauthorized - Token Expired' });
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
            } else {
                throw error;
            }
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Error in protectRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default protectRoute;
