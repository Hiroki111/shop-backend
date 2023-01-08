# Product service:

## Endpoints:

- products list: https://k22kplkry2.execute-api.eu-central-1.amazonaws.com/products
- product by id: https://k22kplkry2.execute-api.eu-central-1.amazonaws.com/products/{productId}

## Deploy

```
npm run deploy
```

## Testing

```
npm run test
```

Project included:

- async/await in lambda functions
- ES6 modules
- webpack and babel
- Lambda handlers are covered by basic UNIT test
- Lambda handlers code written in separate modules
- use status codes 404 for product not found and 500 for internal server error
- API gateway [OpenAPI swagger documentation](swagger.yml)

Links:
[Frontend for check](https://d13d353k8sdke7.cloudfront.net/)
