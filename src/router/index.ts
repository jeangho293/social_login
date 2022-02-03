import { Router } from 'express';
import github from './github';

const router: Router = Router();

router.use('/auth/github', github);

export default router;