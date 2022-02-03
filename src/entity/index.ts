import { createConnection } from 'typeorm';

export const connectDB = async (): Promise<void> => {
  await createConnection({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
      'dist/entity/*.js'
    ],
    synchronize: true,
    logger: 'file',
    logging: true
  }).catch((err): void => {
    console.error(err);
  });
};