import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

class GithubMiddleware {
  public auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { githubToken, loginAccessToken } = req.cookies;
      const [decodeGithubToken, decodeLoginAccessToken] = await Promise.all([
        Jwt.decode(githubToken) as JwtPayload,
        Jwt.decode(loginAccessToken) as JwtPayload
      ]);
      res.locals.githubToken = decodeGithubToken;
      res.locals.username = decodeLoginAccessToken.username;
      res.locals.userIndex = decodeLoginAccessToken.userIndex;
      console.log(res.locals);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default GithubMiddleware;