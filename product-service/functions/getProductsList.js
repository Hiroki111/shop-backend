import { getProducts } from '../services/product';

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      products: await getProducts(),
    }),
  };
};
