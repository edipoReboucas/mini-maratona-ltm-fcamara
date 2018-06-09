const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = (csvProduct) => {
    return fetch(encodeURI(`https://www.shoppingsmiles.com.br/smiles/super_busca.jsf?b=${csvProduct['DESCRIÇÃO']}&a=false&f=${csvProduct['BANDEIRA']}`))
        .then(responde => responde.text())
            .then(body => {
                let $    = cheerio.load(body)
                let data = [];
                $('.item-portrait')
                    .each((key, element) => {
                        let nome = $(element).find('.item-name-box .item-name').text();
                        let pontos = $(element).find('.item-main-pricing').text();
                        let parceiro = $(element).find('.fornecedor-item-box img').attr('src');
                        parceiro = parceiro.substring(parceiro.indexOf('0') + 1, parceiro.indexOf('.g'));
                        data.push({
                            nome, 
                            pontos,
                            parceiro
                        });
                    });
                return data.length === 0 ? null : data[0];    
            });
}


module.exports = {
    getPrice,
};