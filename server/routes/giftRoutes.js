/* written by Brian McCarthy */
import express from 'express';
import { connectToDatabase } from '../db.js';
import { ObjectId } from 'mongodb';
import logger from '../logger.js';

const router = express.Router();

// Task 5: Get all gifts
router.get('/', async (req, res, next) => {
    logger.info('/api/gifts called');
    try {
        const db = await connectToDatabase();
        const gifts = await db.collection("gifts").find({}).toArray();
        const mappedGifts = gifts.map(gift => ({
            ...gift,
            id: gift._id.toString()
        }));
        res.json(mappedGifts);
    } catch (e) {
        logger.error('Error fetching gifts:', e);
        next(e);
    }
});

// Task 5: Get a single gift by ID
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const gift = await db.collection("gifts").findOne({ _id: new ObjectId(req.params.id) });

        if (!gift) {
            return res.status(404).json({ error: "Gift not found" });
        }

        res.json({ ...gift, id: gift._id.toString() });
    } catch (e) {
        logger.error('Error fetching gift detail:', e);
        next(e);
    }
});

export default router;
