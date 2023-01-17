import AWS from 'aws-sdk';
import { handler } from '../../functions/createProduct';

jest.mock('aws-sdk');

describe('createProduct', () => {
  const mockNewProduct = {
    title: 'New Tesla',
    description: 'This is a new car made by Tesla',
    price: 123456,
    count: 10,
  };
  const event = { body: JSON.stringify({ data: mockNewProduct }) };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create and return a product', async () => {
    AWS.DynamoDB.DocumentClient.prototype.batchWrite.mockImplementation(() => {
      return { promise: () => jest.fn() };
    });

    const result = await handler(event);
    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toMatchObject(mockNewProduct);
  });

  it('should not return a product if DynamoDB throws an error', async () => {
    AWS.DynamoDB.DocumentClient.prototype.batchWrite.mockImplementation(() => {
      throw new Error('failed');
    });

    const result = await handler(event);
    expect(result.statusCode).toEqual(500);
    expect(result?.body).toEqual(undefined);
    expect(result.message).toEqual('failed');
  });
});
