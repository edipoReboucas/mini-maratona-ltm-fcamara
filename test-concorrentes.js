const Multiplus = require('./Multiplus');
const Livelo = require('./Livelo');
const Smiles = require('./Smiles');

const csvProduct = { ['DESCRIÇÃO']: 'iphone 8' };

let responseProduct = Multiplus.getPrice(csvProduct);
responseProduct.then(product => {
  console.log('Multiplos Response', { product });
});


responseProduct = Livelo.getPrice(csvProduct);
responseProduct.then(product => {
  console.log('Livelo Response', { product });
});

responseProduct = Smiles.getPrice(csvProduct);
responseProduct.then(product => {
  console.log('Smiles Response', { product });
});