function makeTable(credito, arr, target) {
    target.innerHTML = '';
	var data = arr.filter(imo => imo.credito == credito)[0];
	if (!data) return;
	Object.keys(data).filter(k => k.match(/\d+\s\parcelas/)).forEach(k => {
		var tr = document.createElement('tr');
		[k, '<span>Mais info...</span>', data[k]].forEach(content => {
				var td = document.createElement('td');
				td.innerHTML = content;
				tr.appendChild(td);
		});
		target.appendChild(tr);
	});
}

makeTable('R$200.000,00', json.planos, document.querySelector('table'));