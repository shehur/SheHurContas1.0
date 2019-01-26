var nome = document.getElementById('nome');
var valor = document.getElementById('valor');
var linha = document.getElementById('linha');
var total = document.getElementById('total');
var totalR = document.getElementById('totalR');

var eid = document.getElementById('eid');
var enome = document.getElementById('enome');
var evalor = document.getElementById('evalor');

var obrigacao = document.getElementById('obrigacao');

function preparaCadastro() {
	nome.value = '';
	valor.value = '';
}

function cadastrar() {
	var Nome = nome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var Valor = valor.value.toString().trim();
	if(Valor.toString().trim().length <= 0) Valor = '0';
	Valor = Valor.replace(',', '.');

	var objJSON = [];
	var banco = localStorage.getItem("shehur-contas-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Valor: Valor};
	objJSON.push(objObrigacoes);
	localStorage.setItem('shehur-contas-entradas', JSON.stringify(objJSON));
	selecionar();
}

function selecionarUm(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	var Valor = document.getElementById('valor_'+index).innerText.replace('R$ ', '').toString().trim();
	eid.value = parseInt(index);
	enome.value = Nome;
	evalor.value = Valor;
}

function editar() {
	var Id = parseInt(eid.value);
	var Nome = enome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var Valor = evalor.value.toString().trim();
	if(Valor.toString().trim().length <= 0) Valor = '0';
	Valor = Valor.replace(',', '.');

	var objJSON = [];
	var banco = localStorage.getItem("shehur-contas-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Valor: Valor};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('shehur-contas-entradas', JSON.stringify(objJSON));
	selecionar();
}

function deletar() {
	localStorage.setItem('shehur-contas-entradas', "");
	selecionar();
}

function selecionarDel(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	did.value = parseInt(index);
	obrigacao.innerText = Nome;
}

function deletarUM() {
	var Id = parseInt(did.value);

	var objJSON = [];
	var banco = localStorage.getItem("shehur-contas-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objJSON.splice(Id, 1);
	localStorage.setItem('shehur-contas-entradas', JSON.stringify(objJSON));
	selecionar();	
}

selecionar();
function selecionar() {
	var soma = 0;
	var objJSON = [];
	var banco = localStorage.getItem("shehur-contas-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var linha = "";
	var i=0;
	objJSON.forEach((item) => {
		if(item.Valor.toString().trim().length <= 0)
			item.Valor = 0;

		soma += parseFloat(item.Valor);
		linha += 
		"<tr>" +
			"<td id='nome_" + i + "'>" + item.Nome + "</td>" +
			"<td id='valor_" + i + "'>R$ " + item.Valor + "</td>" +
			"<td align='right'><button type='button' class='btn btn-primary' onclick='selecionarUm(" + i + ")' data-toggle='modal' data-target='#modalEditar'>e</button>" +
			"<button type='button' class='btn btn-danger' data-toggle='modal' onclick='selecionarDel(" + i + ")' data-target='#modalDeletar'>x</button></td>" +
		"</tr>";
		i++;
	});
	linhas.innerHTML = linha;
	total.innerText = 'TOTAL: R$ ' + soma;

	var Restante = parseFloat(retornaObrigacoes())-parseFloat(soma);
	if(Restante <= 0)
		totalR.innerText = 'OBJETIVO CONCLUÍDO';
	else
		totalR.innerText = 'FALTAM: R$ ' + Math.abs(Restante);

	if(Restante < 0)
		totalR.innerText = 'OBJETIVO CONCLUÍDO - LUCRO: R$ ' + Math.abs(Restante);
}

function retornaObrigacoes() {
	var soma = 0;
	var objJSON = [];
	var banco = localStorage.getItem("shehur-contas-obrigacoes");
	if(banco) {
	  objJSON = JSON.parse(banco.toString());
	}

	objJSON.forEach((item) => {
	  if(item.Valor.toString().trim().length <= 0)
	    item.Valor = 0;
	  soma += parseFloat(item.Valor);
	});

	return soma;
}
