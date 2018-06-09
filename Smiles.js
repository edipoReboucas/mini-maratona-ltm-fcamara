const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = (csvProduct) => {
    return fetch(`https://www.shoppingsmiles.com.br/smiles/super_busca.jsf?b=${csvProduct['DESCRIÇÃO']}&a=false`, {
        timeout: 3000
    })
        .then(responde => responde.text())
            .then(body => {
                let $    = cheerio.load(body)
                let data = [];
                $('.item-portrait')
                    .each((key, element) => {
                        let nome = $(element).find('.item-name-box .item-name').text();
                        let pontos = $(element).find('.item-main-pricing').text();

                        data.push({
                            nome,
                            pontos
                        });
                    });
                return data.length === 0 ? null : data[0];    
            });
}

module.exports = {
    getPrice,
};