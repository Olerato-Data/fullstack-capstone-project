/* written by Brian McCarthy */
import express from 'express';
import { connectToDatabase } from '../db.js';

const router = express.Router();

// Task 6: Search/Filter Gifts
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const { name, category, condition, age_years } = req.query;
        let query = {};

        if (name) {
            // Partial, case-insensitive matching
            query.name = { $regex: name, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (condition) {
            query.condition = condition;
        }
        if (age_years) {
            query.age_years = { $lte: parseInt(age_years) };
        }

        const gifts = await db.collection("gifts").find(query).toArray();
        const mappedGifts = gifts.map(gift => ({
            ...gift,
            id: gift._id.toString()
        }));
        res.json(mappedGifts);
    } catch (e) {
        next(e);
    }
});

export default router;
