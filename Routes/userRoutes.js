import express from 'express';
import { showAllUser, createnewUser, 
    updateUsers } from '../Controller/userController.js';


const router = express.Router();

router.get('/users', showAllUser);
router.post('/add', createnewUser);
router.post('/update/:id', updateUsers);

export default router;