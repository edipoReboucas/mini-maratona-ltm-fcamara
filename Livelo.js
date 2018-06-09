const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = (csvProduct) => {
    return fetch(`http://www.pontoslivelo.com.br/browse?Ntt=${csvProduct['DESCRIÇÃO']}`)
    .then(response => response.text())
    .then(body => {
        let $    = cheerio.load(body)
        let data = [];
        $('.productdiv')
            .each((key, element) => {
                let pontos = $(element).find('.prodprice').text()
                let nome = $(element).find('.proddesc').text()
                let parceiro = $(element).find('.partner-name').text();

                data.push({
                    nome,
                    pontos,
                    parceiro
                })
            });

        return data[0];
    });
}

module.exports = {
    getPrice,
};

