import { createProduct } from '../services/product';

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  try {
    const newProduct = await createProduct(body.data);
    return {
      statusCode: 200,
      body: JSON.stringify(newProduct),
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error?.message || 'It failed to create a product',
    };
  }
};
