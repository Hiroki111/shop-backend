import { getProducts } from '../../services/product';
import mockProducts from '../../assets/products.json';
import { handler } from '../../functions/getProductsList';

jest.mock('../../services/product');

describe('getProductsList.js', () => {
  it('should return an array of products', async () => {
    getProducts.mockResolvedValue(mockProducts);
    const result = await handler();

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body).length).toEqual(mockProducts.length);
    expect(JSON.parse(result.body)).toMatchObject(mockProducts);
  });

  it('should return 500 if getProducts throws an error', async () => {
    getProducts.mockRejectedValue('throwing an error');
    const result = await handler();

    expect(result).toStrictEqual({
      statusCode: 500,
      message: 'Internal error',
    });
  });
});
