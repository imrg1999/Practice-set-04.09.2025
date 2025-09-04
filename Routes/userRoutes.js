import express from 'express';
import { showAllUser, createnewUser, 
    updateUsers, deleteUser } from '../Controller/userController.js';


const router = express.Router();

router.get('/users', showAllUser);
router.post('/add', createnewUser);
router.post('/update/:id', updateUsers);
router.delete('/delete/:id', deleteUser);

export default router;