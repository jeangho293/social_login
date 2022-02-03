import axios from 'axios';

export class githubInfo {
  private readonly github = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    redirectURI: process.env.GITHUB_CALLBACK_URI
  };

  // authorize 후 redirect 되는 주소
  public redirectAuthURI: string = 'https://github.com/login/oauth/authorize?client_id=' + this.github.clientID
    + '&redirect_uri=' + this.github.redirectURI;

  // To get accessToken URI
  private accessTokenURI(code): string {
    return `https://github.com/login/oauth/access_token?client_id=${this.github.clientID}&client_secret=${this.github.clientSecret}&code=${code}`;
  };

  // get Access Token
  public getAccessToken(code) {
    return axios({
      method: 'POST',
      url: this.accessTokenURI(code),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  // get user information
  public getUserInformation(accessToken) {
    return axios({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        authorization: `token ${accessToken}`
      }
    });
  }
}