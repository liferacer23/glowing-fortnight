import express from 'express';
import { getAllDepartments, createDepartment } from '../controllers/departmentController.js';
const router = express.Router();

router.get('/', getAllDepartments);

router.post('/create', createDepartment);

export default router;
