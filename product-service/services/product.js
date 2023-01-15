import AWS from 'aws-sdk';

const { DB_REGION, PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME } = process.env;
AWS.config.update({ region: DB_REGION });
const dynamo = new AWS.DynamoDB.DocumentClient();

async function getTableData(tableName) {
  return dynamo.scan({ TableName: tableName }).promise();
}

async function getOneTableData(tableName, keyObj) {
  return dynamo.get({ TableName: tableName, Key: keyObj }).promise();
}

export async function getProducts() {
  const productsTableData = await getTableData(PRODUCTS_TABLE_NAME);
  const stocksTableData = await getTableData(STOCKS_TABLE_NAME);

  return productsTableData.Items.map((product) => ({
    ...product,
    count: stocksTableData.Items.find((stock) => stock.product_id === product.id).count,
  }));
}

export async function findProductById(id) {
  const productData = await getOneTableData(PRODUCTS_TABLE_NAME, { id: id });
  const stockData = await getOneTableData(STOCKS_TABLE_NAME, { product_id: id });

  if (!productData?.Item) {
    return;
  }

  return {
    ...productData.Item,
    count: stockData?.Item?.count,
  };
}
