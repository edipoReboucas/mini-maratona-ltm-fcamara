const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = (csvProduct) => {
    let listParceiros = {
        CasasBahia: "2042780991",
        FastShop: "2772514182",
        Extra: "363586019",
        PontoFrio: "3958921117"
    }

    let parceiroFilter = csvProduct['BANDEIRA'].trim();
    
    return fetch(`http://www.pontoslivelo.com.br/browse?N=${listParceiros[parceiroFilter]}&Ntt=${csvProduct['DESCRIÇÃO']}`)
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

