import { EntityRepository, AbstractRepository } from 'typeorm';
import { githubUser } from '../entity/github-user';

@EntityRepository(githubUser)
export class githubUserRepository extends AbstractRepository<githubUser> {

  // create github login user
  public createGithub(username: string, githubId: number, githubAccessToken: string) {
    const user = new githubUser();
    user.githubId = githubId;
    user.username = username;
    user.githubAccessToken = githubAccessToken;
    return this.manager.save(user);
  }

  // find by githubId
  public findByGithubIndex(githubIndex: number) {
    return this.repository.findOne({ githubId: githubIndex });
  };

// update githubAccessToken
  public async updateAccessTokenByGithubIndex(githubIndex, githubAccessToken) {
    const userInformation = await this.findByGithubIndex(githubIndex);
    userInformation.githubAccessToken = githubAccessToken;
    return this.manager.save(userInformation);
  }

}