import fs from "fs";
var obj = {
  dados: [],
};
var id = 1;

export function salvandoDados(entrada, saida, volume) {
  const date = new Date().toLocaleDateString("pt-BR");
  const hora = new Date().toLocaleTimeString("pt-BR");
  obj.dados.push({ id: id, entrada: entrada, saida: saida, volume: volume, data: date, horario:hora });
  var json = JSON.stringify(obj);
  fs.writeFile("dados-monitoramento.json", JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log("complete");
  });
  id++;
}

export function lerDados() {
  fs.readFile("dados-monitoramento.json", "utf8", function (err, data) {
    var obj = JSON.parse(data);
    obj.push(mynotes);
    var strNotes = JSON.stringify(obj);
    // fs.writeFile("db.json", strNotes, function (err) {
    //   if (err) return console.log(err);
    //   console.log("Note added");
    // });
    console.log(strNotes);
  });
}
