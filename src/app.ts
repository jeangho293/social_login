import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import router from './router';
import { connectDB } from './entity';
import { errorHandler, routerError } from './middlewear/error-handler';

class App {
  public app: express.Application = express();

  private init() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private routerHandler() {
    this.app.use('/', router);
    this.app.use(routerError);  // router error middleware
    this.app.use(errorHandler); // 404 or 500 error middleware
  }

  private MySQL() {
    connectDB().then(():void => {
      console.log(`Mysql 연결 성공`);
    });
  }

  constructor() {
    this.init();
    this.MySQL();
    this.routerHandler();

  }
}

export default App;