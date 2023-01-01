const { mockProducts } = require('../mockData/products');

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      products: mockProducts,
    }),
  };
};
