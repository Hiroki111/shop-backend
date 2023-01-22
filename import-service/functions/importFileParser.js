import { getS3Object } from '../services/product';

export const handler = async (event) => {
  try {
    const {
      s3: { bucket, object },
    } = event.Records[0];

    const input = {
      Bucket: bucket.name,
      Key: object.key,
    };

    console.log(`Parsing csv stream with input: ${JSON.stringify(input)}`);
    const { Body: csvStream } = await getS3Object(input);
    const records = await parseCsvStream(csvStream);
    console.log(`Parsed records: ${JSON.stringify(records)}`);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};
