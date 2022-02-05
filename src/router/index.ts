import { Router } from 'express';
import githubLogin from './github/github-login';
import github from './github/github';

const router: Router = Router();

router.use('/auth/github', githubLogin);
router.use('/github', github);

export default router;