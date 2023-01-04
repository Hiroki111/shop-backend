import { findProductById } from '../services/product';

export const handler = async (event) => {
  const { productId } = event.pathParameters;
  const product = await findProductById(productId);
  const result = {
    statusCode: 404,
    message: 'Product not found',
  };
  if (product) {
    result.statusCode = 200;
    result.message = undefined;
    result.body = product;
  }
  return {
    ...result,
    body: JSON.stringify({ body: result.body }),
  };
};
