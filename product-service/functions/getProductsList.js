import { getProducts } from '../services/product';

export const handler = async (event) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(await getProducts()),
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal error',
    };
  }
};
