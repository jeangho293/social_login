import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import router from './router'

class App {
  public app: express.Application = express();

  private init() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private routerHandler() {
    this.app.use('/', router);
  }
  constructor() {
    this.init();
    this.routerHandler();
  }
}

export default App;