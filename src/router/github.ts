import { Router } from 'express';
import { githubLoginController } from '../controller/github/github-login';
import githubAuthMiddleware from '../middlewear/github/auth';
import {githubControllers } from '../controller/github/github';

const router: Router = Router();
const githubLogin = new githubLoginController();
const githubAuth = new githubAuthMiddleware();
const github = new githubControllers();

router.get('/', githubLogin.getGithubAuth);
router.get('/callback', githubLogin.getGithubCallback);
router.get('/success', githubAuth.auth, github.getUserInfo);

export default router;