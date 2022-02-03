import { Router } from 'express';
import { githubLoginController } from '../controller/github/github-login';

const router: Router = Router();
const github = new githubLoginController();

router.get('/', github.getGithubAuth);
router.get('/callback', github.getGithubCallback);
export default router;