import { findProductById } from '../services/product';

export const handler = async (event) => {
  const { productId } = event.pathParameters;
  try {
    const product = await findProductById(productId);
    if (!product) {
      return {
        statusCode: 404,
        message: 'Product not found',
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal error',
    };
  }
};
