const productsList = require('../assets/products.json');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-central-1' });
const dynamo = new AWS.DynamoDB.DocumentClient();

const PRODUCTS_TABLE_NAME = 'products';
const STOCKS_TABLE_NAME = 'stocks';

async function putItems(tableName, item) {
  return dynamo
    .put({
      TableName: tableName,
      Item: item,
    })
    .promise();
}

async function run() {
  console.log('--- running populate-products.js ---');

  const productPopulationPromises = productsList.map(async (product) => {
    const { count, description, id, price, title } = product;
    await putItems(PRODUCTS_TABLE_NAME, {
      id,
      title,
      description,
      price,
    });
    await putItems(STOCKS_TABLE_NAME, {
      product_id: id,
      count,
    });
  });

  try {
    await Promise.all(productPopulationPromises);
  } catch (error) {
    console.log('Failed to populate tables with products');
  }

  console.log('--- populate-products.js done ---');
}

run();
