const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = ({ nome }) => {
    return fetch(`http://www.pontoslivelo.com.br/browse?Ntt=${nome}`)
    .then(response => response.text())
    .then(body => {
        let $    = cheerio.load(body)
        let data = [];
        $('.productdiv')
            .each((key, element) => {
                let pontos = $(element).find('.prodprice').text()
                let nome = $(element).find('.proddesc').text()
                
                data.push({
                    nome,
                    pontos,
                })
            });

        return data[0];
    });
}

const resposta = getPrice({ nome: 'VINHO TINTO SAN MARZANO IL PUMO NEGROAMARO SALENTO 2016'});

resposta.then( x => {
    console.log(x);
});


