import {Router} from 'express';
import {githubControllers} from '../../controller/github/github';
import githubAuthMiddleware from '../../middlewear/github/auth';

const router: Router = Router();
const github = new githubControllers();
const githubMiddleware = new githubAuthMiddleware();

router.use('/user', githubMiddleware.auth, github.getUserInfo);

export default router;