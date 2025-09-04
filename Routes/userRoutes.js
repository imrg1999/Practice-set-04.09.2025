import express from 'express';
import { showAllUser } from '../Controller/userController.js';


const router = express.Router();

router.get('/users', showAllUser);

export default router;