var node_xj = require("xls-to-json");
var json2xls = require('json2xls');
var fs = require('fs');
  
node_xj({
    input: "Lista-de-Produtos-Desafio.xlsx",  // input xls
    output: "output.json", // output json
    sheet: "ESFERA"  // specific sheetname
  }, 
  
    function(err, result) {
        if(err) {
        console.error(err);
        } else {
          console.log('Saida da planilha: ',result[0]);

          console.log('Saida da planilha: ',result[0].SKU);
        }
        // Converter de volta para XlS
        var json = result;

        var xls = json2xls(json);

        //console.log(xls);
      
        fs.writeFileSync('data.xlsx', xls, 'binary');
  });

  

