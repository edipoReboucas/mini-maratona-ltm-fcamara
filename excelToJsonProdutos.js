var node_xj = require("xls-to-json");
var json2xls = require('json2xls');
var fs = require('fs');

  
module.exports.dadosPlan = function(callback){

node_xj({
    input: "Lista-de-Produtos-Desafio.xlsx",  // input xls
    output: "output.json", // output json
    sheet: "ESFERA"  // specific sheetname
  }, function(err, result) {
        if(err) {
        console.error(err);
        } else {
          const csvProduct = result;
          callback(csvProduct);
          // console.log('Saida da planilha só Descrição: ', csvProduct);
          // console.log('-----------------------------------');
        }   
  });
 
};



  

