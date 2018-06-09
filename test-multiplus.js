const Multiplus = require('./Multiplus');

const csvProduct = { nome: 'iphone 8' };

const responseProduct = Multiplus.getPrice(csvProduct);

responseProduct.then(product => {
  console.log('Multiplos Response', { product });
});
