import App from './app';

const http = new App().app;

http.listen(3000, (): void => {
  console.log(`http://localhost:3000`);
    }
);