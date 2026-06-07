/* written by Brian McCarthy */
import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../db.js';
import { ObjectId } from 'mongodb';
import logger from '../logger.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Task 11: Register API
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCol = db.collection("users");

        const existingUser = await usersCol.findOne({ email: req.body.email });
        if (existingUser) {
            logger.error('Email id already exists');
            return res.status(400).json({ error: 'Email id already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        const result = await usersCol.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date().toISOString(),
        });

        const payload = {
            user: {
                id: result.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User registered successfully');
        res.json({ authtoken, email: req.body.email });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

// Task 11: Login API
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCol = db.collection("users");
        const theUser = await usersCol.findOne({ email: req.body.email });

        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await bcryptjs.compare(req.body.password, theUser.password);
        if (!result) {
            logger.error('Passwords do not match');
            return res.status(404).json({ error: 'Wrong password' });
        }

        const payload = {
            user: {
                id: theUser._id,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User logged in successfully');
        return res.status(200).json({ authtoken, userName: theUser.firstName, userEmail: theUser.email });
    } catch (e) {
        logger.error(e);
        return res.status(500).json({ error: 'Internal server error', details: e.message });
    }
});

// Task 11: Update User Information API
router.put('/update', async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: "Access denied" });
        
        const verified = jwt.verify(token, JWT_SECRET);
        const db = await connectToDatabase();
        const usersCol = db.collection("users");

        const updateData = {};
        if (req.body.firstName) updateData.firstName = req.body.firstName;
        if (req.body.lastName) updateData.lastName = req.body.lastName;

        await usersCol.updateOne(
            { _id: new ObjectId(verified.user.id) },
            { $set: updateData }
        );

        res.json({ message: "User updated successfully" });
    } catch (e) {
        logger.error(e);
        res.status(500).json({ error: "Error updating user" });
    }
});

export default router;
