import { Schema, model } from 'mongoose';

interface refreshTokenInterface {
  githubIndex: number;
  refreshToken: string;
}

const refreshTokenSchema = new Schema<refreshTokenInterface>({
  githubIndex: {
    type: Number,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

export const refreshTokenModel = model<refreshTokenInterface>('token', refreshTokenSchema);
