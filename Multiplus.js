const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = (csvProduct) =>
  fetch(`https://www.pontosmultiplus.com.br/troque/busca?Ntt=${csvProduct['DESCRIÇÃO']}`)
  .then(toText)
  .then(tojQuery)
  .then(findProducts)
  .then(whenNotEmpty(
    $products => toProduct(getFirst($products))
  ));

const toText = response => response.text();

const tojQuery = body => cheerio.load(body);

const findProducts = $ => $('.cartela.produto');

const whenNotEmpty = fn => $products => $products.length  === 0 ? null : fn($products);

const getFirst = $elements => $elements.first();

const toProduct = $productElement => ({
  nome: $productElement.find('.descricao').text(),
  pontos: $productElement.find('.price-desktop .product-price strong').text(),
  parceiro: $productElement.find('.logo-parceiro').attr('alt')
});

module.exports = {
  getPrice,
};
