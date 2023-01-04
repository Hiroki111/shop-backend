import { mockProducts } from '../mockData/products';

export function getProducts() {
  return new Promise((res) => {
    setTimeout(() => res(mockProducts), 100);
  });
}

export function findProductById(id) {
  return new Promise((res) => {
    setTimeout(() => {
      const product = mockProducts.find((product) => product.id === String(id));
      res(product);
    }, 100);
  });
}
