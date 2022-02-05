import { Router } from 'express';
import { githubLoginController } from '../../controller/github/github-login';

const router: Router = Router();
const githubLogin = new githubLoginController();

router.get('/', githubLogin.getGithubAuth);
router.get('/callback', githubLogin.getGithubCallback);

export default router;