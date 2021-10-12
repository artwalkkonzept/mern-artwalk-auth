import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserArtwalksRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const updates = (({
            name,
            bilds,
        }) => ({
            name,
            bilds,
        }))(req.body);

        if (!authorization) {
            return res.status(401).json({ message: 'No authorization header sent' });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unable to verify token' });

            const { id } = decoded;

            if (id !== userId) return res.status(403).json({ message: 'Not allowed to update that user\'s data' });

            const db = getDbConnection('Test');
            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { artwalks: updates } },
                { returnOriginal: false },
            );
            const { email, isVerified, artwalks } = result.value;

            jwt.sign({ id, email, isVerified, artwalks }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return res.status(200).json(err);
                }
                res.status(200).json({ token });
            });
        })
    }
}