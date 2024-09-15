import 'dotenv/config';
import * as jwt from 'jsonwebtoken';


export const auth = (req: any, res: any, next: any) => {

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

    if (!ACCESS_TOKEN_SECRET) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token.split(' ')[1], ACCESS_TOKEN_SECRET!, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}