import { uploadToS3 } from '../services/product';

export const handler = async (event) => {
  try {
    const { name } = event.queryStringParameters;
    return {
      statusCode: 200,
      message: await uploadToS3(name),
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error?.message || 'Error occurred',
    };
  }
};
