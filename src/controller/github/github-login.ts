import * as Jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { githubUserRepository } from '../../repository/github-user';
import { githubInfo } from './util/github';

export class githubLoginController {
  private githubInfo = new githubInfo();

  public getGithubAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.redirect(this.githubInfo.redirectAuthURI);  // 이후 github에 등록한 callback 주소로 이동한다.
    } catch (err) {
      next();
    }
  };

  // github callback URI and get accessToken
  public getGithubCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code } = req.query;

      // get access token
      const accessToken = await this.githubInfo.getAccessToken(code);
      const splitAccessToken: string = accessToken.data.split('&')[0].split('=')[1];
      const userInformation = await this.githubInfo.getUserInformation(splitAccessToken);

      // 회원가입에 대한 유무 확인
      const githubRepository = getCustomRepository(githubUserRepository);
      const isUser = await githubRepository.findByGithubIndex(userInformation.data.id);
      const username: string = userInformation.data.login;
      const userIndex: number = userInformation.data.id;

      if (!isUser) {
        await githubRepository.createGithub(username, userIndex, splitAccessToken);
      } else {
        await githubRepository.updateAccessTokenByGithubIndex(userIndex, splitAccessToken);
      }

      const [jwtGithubAccessToken, jwtLoginAccessToken]: [string, string] = await Promise.all([
        Jwt.sign(splitAccessToken, process.env.JWT_SECRET_KEY),
        Jwt.sign({ username, userIndex }, process.env.JWT_SECRET_KEY)
      ])

      res.cookie('githubToken', jwtGithubAccessToken);
      res.cookie('loginAccessToken', jwtLoginAccessToken);
      res.redirect('http://localhost:3000');
    } catch (err) {
      console.log(err);
      next();
    }
  };
}


