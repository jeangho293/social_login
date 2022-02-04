import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export class githubControllers {
  // github 에서 user 정보 불러오기
  public getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { githubToken } = res.locals;
      const userInformation = await axios({
        method: 'GET',
        url: 'https://api.github.com/user',
        headers: {
          Authorization: `token ${githubToken}`
        }
      });

      res.status(200).json(userInformation.data);
    } catch (err) {
      next(err);
    }
  };
}