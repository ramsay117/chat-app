import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = Router();

router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessages);

export default router;
