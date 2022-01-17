import { S3 } from '@aws-sdk/client-s3';
import 'dotenv/config';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from 'src/config';

const s3Client = new S3({
  region: process.env[AWS_REGION],
  credentials: {
    accessKeyId: process.env[AWS_ACCESS_KEY_ID],
    secretAccessKey: process.env[AWS_SECRET_ACCESS_KEY],
  },
});
export { s3Client };

export default s3Client;
