const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getPrice = (csvProduct) =>
  fetch(getPriceUrl(csvProduct))
  .then(acceptOnly200)
  .then(toText)
  .then(tojQuery)
  .then(findProducts)
  .then(whenNotEmpty(
    $products => toProduct(getFirst($products))
  ));

const getPriceUrl = csvProduct =>
  'https://www.pontosmultiplus.com.br/troque/'
  + createPartnerSlug(csvProduct)
  + '/busca'
  + encodeURIComponent(`?Ntt=${csvProduct['DESCRIÇÃO']}`);

const createPartnerSlug = csvProduct => csvProduct['BANDEIRA']
  .trim()
  .toLowerCase()
  .replace(/\s+/, '');

const acceptOnly200 = response => {
  if (response.status === 200) {
    return response;
  }
  throw new Error('Response is not 200');
}

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
