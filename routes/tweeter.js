import express from 'express'
import { check } from 'express-validator';

import tweet from '../controllers/tweet.js'
const router = express.Router();

router.post('/', [
    check('tweet', 'Tweet is required').notEmpty(),
], tweet.add);

export default router
