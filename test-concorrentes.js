const Multiplus = require('./Multiplus');
const Livelo = require('./Livelo');
const Smiles = require('./Smiles');
const planilhaDados = require('./excelToJsonProdutos');
var json2xls = require('json2xls');
var fs = require('fs');


planilhaDados.dadosPlan(async function(csvProductArray){
  // console.log('entrei na função',csvProduct);
  let data = [];

  const newCsvProductPromiseArray = csvProductArray.map(async csvProduct => {
    let responseProductMult = await Multiplus.getPrice(csvProduct);

    console.log('Multiplos Response', { responseProductMult });
  
    let responseProductLivelo = await Livelo.getPrice(csvProduct);
  
    console.log('Livelo Response', { responseProductLivelo });
    
    let responseProductSmile = await Smiles.getPrice(csvProduct);
    
    console.log('Smiles Response', { responseProductSmile });

    const newCsvProduct = {
      ...csvProduct,
      ['PONTOS MULTIPLUS'] :  responseProductMult && responseProductMult.pontos,
      ['PONTOS LIVELO']    :  responseProductLivelo && responseProductLivelo.pontos,
      ['PONTOS SMILES']    :  responseProductSmile && responseProductSmile.pontos,
    };

    return newCsvProduct;
  });


  for(i = 0; i < newCsvProductPromiseArray.length ; i++) {
    console.log('teste 123');
    const newCsvProduct = await newCsvProductPromiseArray[i];
    data.push(newCsvProduct);
  }
 
  var json = data;
  var xls = json2xls(json);

  fs.writeFileSync('data.xlsx', xls, 'binary');

});

