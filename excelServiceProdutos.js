node_xj = require("xls-to-json");
  
node_xj({
    input: "Lista-de-Produtos-Desafio.xlsx",  // input xls
    output: "output.json", // output json
    sheet: "ESFERA"  // specific sheetname
  }, 
  
    function(err, result) {
        if(err) {
        console.error(err);
        } else {
        console.log('Saida da planilha: ',result[0].SKU);
        }

  });