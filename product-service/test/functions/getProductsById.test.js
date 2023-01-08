import { handler } from '../../functions/getProductsById';
import { mockProducts } from '../../mockData/products';
import { findProductById } from '../../services/product';

jest.mock('../../services/product');

describe('getProductsById', () => {
  const mockProduct = mockProducts[0];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a product by ID', async () => {
    findProductById.mockImplementation(() => mockProduct);
    const result = await handler({ pathParameters: mockProduct.id });

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify(mockProduct),
    });
  });

  it('should return 404 if no product is found', async () => {
    findProductById.mockImplementation(() => undefined);
    const result = await handler({ pathParameters: mockProduct.id });

    expect(result).toStrictEqual({
      statusCode: 404,
      message: 'Product not found',
    });
  });

  it('should return 500 if findProductById throws an error', async () => {
    findProductById.mockRejectedValue('internal error');
    const result = await handler({ pathParameters: mockProduct.id });

    expect(result).toStrictEqual({
      statusCode: 500,
      message: 'Internal error',
    });
  });
});
