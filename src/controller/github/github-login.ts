import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export class githubLoginController {
  private readonly github = {
    clientID: '308bbda0128258542ba7',
    clientSecret: '89a47e99cbca8fcfa45179555aa890bbc1a5917c',
    redirectURI: 'http://localhost:3000/auth/github/callback'
  };

  public getGithubAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const redirectAuthURI = 'https://github.com/login/oauth/authorize?client_id=' + this.github.clientID
          + '&redirect_uri=' + this.github.redirectURI; // authorize (접근 허용)을 인가받는 페이지로 이동

      res.redirect(redirectAuthURI);  // 이후 github에 등록한 callback 주소로 이동한다.
    } catch (err) {
      next();
    }
  };

  // github callback URI and get accessToken
  public getGithubCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code } = req.query;
      const accessTokenURI = `https://github.com/login/oauth/access_token?client_id=${this.github.clientID}&client_secret=${this.github.clientSecret}&code=${code}`;

      const accessToken = await axios({
        method: 'POST',
        url: accessTokenURI,
        headers: {
          'content-type': 'application/json'
        }
      });

      const splitAccessToken = accessToken.data.split('&')[0].split('=')[1];
      const userInformation = await axios({
        method: 'GET',
        url: 'https://api.github.com/users/jeangho293/repos',
        headers: {
          Authorization: `token ${splitAccessToken}`
        }
      });

      // Todo --> 회원가입 또는 로그인일 경우
      res.cookie('githubToken', splitAccessToken);
      res.status(200).json({
        githubToken: splitAccessToken,
        loginAccessToken: 'token'
      });
    } catch (err) {
      next();
    }
  };
}


