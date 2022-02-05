import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { refreshTokenModel } from '../../schema/github-refresh';

class GithubMiddleware {
  public auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { githubToken, loginAccessToken } = req.cookies;
      const [decodeGithubToken, decodeLoginAccessToken] = await Promise.all([
        Jwt.decode(githubToken) as JwtPayload,
        Jwt.decode(loginAccessToken) as JwtPayload
      ]);

      const username = decodeLoginAccessToken.username;
      const userIndex = decodeLoginAccessToken.userIndex;

      try {
        await Jwt.verify(loginAccessToken, process.env.JWT_SECRET_KEY);

        res.locals.githubToken = decodeGithubToken;
        res.locals.username = username;
        res.locals.userIndex = userIndex;
        next();
      } catch (err) {
        const githubRefreshToken = await refreshTokenModel.findOne({ githubIndex: decodeLoginAccessToken.userIndex });
        if (githubRefreshToken) {
          const newLoginAccessToken = Jwt.sign({
            username,
            userIndex
          }, process.env.JWT_SECRET_KEY, { expiresIn: '1800s' });
          res.cookie('loginAccessToken', newLoginAccessToken);
          res.locals.githubToken = decodeGithubToken;
          res.locals.username = username;
          res.locals.userIndex = userIndex;
          console.log('새로운 AccessToken을 발급했습니다.');
          next();
        }
      }
    } catch (err) {
      next(err);
    }
  };
}

export default GithubMiddleware;