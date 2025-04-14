import { Router } from 'express';
import miembrosRoutes from './routes.js';

const router = Router();
router.use('/', miembrosRoutes);

export default router;
