const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = ({ name }) => {
    return fetch(`https://www.shoppingsmiles.com.br/smiles/super_busca.jsf?b=${name}&a=false`)
        .then(responde => responde.text())
            .then(body => {
                let $    = cheerio.load(body)
                let data = [];
                $('.item-portrait')
                    .each((key, element) => {
                        let nome = $(element).find('.item-name-box .item-name').text();
                        let pontos = $(element).find('.item-main-pricing').text();

                        data.push = ({
                            nome,
                            pontos
                        });
                    })
                return data;    
            });
}

const resposta = getPrice({ name: 'Bicicleta Aro 26 Caloi Andes 21 Marchas Suspensao Dianteira'});

resposta.then( x => { 
    console.log(x);
});