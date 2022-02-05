import { connect } from 'mongoose';

const connectDB = async () => {
  await connect(`mongodb://localhost:27017/github`,
      {
        ignoreUndefined: true
      }
  ).catch((err): void => {
    console.error(err);
  });
};

export default connectDB;