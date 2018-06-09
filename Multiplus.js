const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = ({ nome }) =>
  fetch(`https://www.pontosmultiplus.com.br/troque/busca?Ntt=${nome}`)
  .then(toText)
  .then(tojQuery)
  .then(findProducts)
  .then(whenNotEmpty(getFirst))
  .then(getFirst)
  .then(toProduct);

const toText = response => response.text();

const tojQuery = body => cheerio.load(body);

const findProducts = $ => $('.cartela.produto');

const whenNotEmpty = fn => $products => $products.length  === 0 ? null : fn($products);

const getFirst = $elements => $elements.first();

const toProduct = $productElement => ({
  nome: $productElement.find('.descricao').text(),
  pontos: $productElement.find('.price-desktop .product-price strong').text()
});

module.exports = {
  getPrice,
};