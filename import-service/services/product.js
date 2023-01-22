import { PutObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const { REGION, BUCKET_NAME } = process.env;
const s3Client = new S3Client({ region: REGION });

export async function uploadToS3(name) {
  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: `uploaded/${name}`,
    ContentType: 'text/csv',
  };
  const command = new PutObjectCommand(bucketParams);
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function getS3Object({ Bucket, Key }) {
  return s3Client.send(new GetObjectCommand({ Bucket, Key }));
}
