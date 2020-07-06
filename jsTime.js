function mostrarDadosDoTime(time) {

    var identificador = time.id;
    var nome = time.nomeTime;
    var campeonato = time.campeonato;
    var ano = time.anoFundacao;
    var escudo = time.escudo;

    document.getElementById("salvar").disabled = false;
    h1.innerHTML = "Lista de Times";

    var table = document.getElementById("tabela");

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.innerHTML = identificador;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = nome;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = campeonato;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = ano;
    tr.appendChild(td);

    var imagem = escudo;
    td = document.createElement('td');
    var teste = '<img src="' + imagem + '" alt="imagem" width="100%" height="150px"></img>'
    td.innerHTML =
        teste
    tr.appendChild(td);

    var id = identificador;
    td = document.createElement('td');
    td.innerHTML =
        '<a href="#" onclick="editar(\'' + id + '\')">Editar</a> ' +
        '<a href="#" onclick="excluir(\'' + id + '\')">Excluir</a>';
    tr.appendChild(td);


    table.appendChild(tr);
}

function editar(id) {

    location.href = 'jogador.html';
    localStorage.setItem("id", id);

}


function excluir(id) {
    if (confirm("Deseja realmente apagar este time?")) {
        str1 = 'https://private-348189-jogador.apiary-mock.com/times/id';
        str = str1 + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', str, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert("O time " + id + " foi excluido com sucesso!")
                    location.reload();
                }
            }
        };
    }
}

function excluirJogador(id) {
    if (confirm("Deseja realmente demitir este jogador?")) {
        str1 = 'https://private-348189-jogador.apiary-mock.com/jogadores/delete/';
        str = str1 + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', str, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert("O jogador " + id + " foi demitido com sucesso!")
                    location.reload();
                }
            }
        };
    }
}

function editarJogador(id) {

    var h1 = document.getElementById("h1Jogador");
    buscarJogador(id);
    localStorage.setItem("idJogador", id);
    h1.innerHTML = "Editando dados do jogador " + localStorage.getItem("idJogador");
    document.getElementById("salvar").disabled = true;
    document.getElementById("editar").disabled = false;

}

function alterarJogador() {

    str = 'https://private-348189-jogador.apiary-mock.com/jogadores/update/' + localStorage.getItem("idJogador");
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', str, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    var novoJogador = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        salário: document.getElementById('salario').value,
        contrato: document.getElementById('contrato').value,
        imagem: document.getElementById('imagem').value
    };
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4) {
            if (this.status == 201) {
                //sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var nome = retorno.nome;
                alert("O jogador " + nome + " foi editado com sucesso! Obs: Sempre puxa o Neymar pois estou usando o get{id} para preencher o form.");
                location.reload();
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }

    }
    if (verificarJogador(novoJogador) == true) {
        var formatoJson = JSON.stringify(novoJogador);
        xhttp.send(formatoJson);
    }

}

function buscarJogador(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var objeto = retorno;
                document.getElementById('nome').value = objeto.nome;
                document.getElementById('idade').value = objeto.idade;
                document.getElementById('salario').value = objeto.salário;
                document.getElementById('contrato').value = objeto.contrato;
                document.getElementById('imagem').value = objeto.imagem;

            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    };
    str1 = 'https://private-348189-jogador.apiary-mock.com/jogadores/jogador/';
    str = str1 + id;
    xhttp.open('GET', str, true);
    xhttp.send();
}

function testar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var times = retorno.data;
                for (var i = 0; i < times.length; i++) {
                    var time = times[i];
                    mostrarDadosDoTime(time);
                }
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    };
    xhttp.open('GET', 'https://private-348189-jogador.apiary-mock.com/times', true);
    xhttp.send();
}

function loadJogador() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var jogadores = retorno.data;
                for (var i = 0; i < jogadores.length; i++) {
                    var jogador = jogadores[i];
                    mostrarDadosDoJogador(jogador);
                }
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    };
    xhttp.open('GET', 'https://private-348189-jogador.apiary-mock.com/jogadores/id', true);
    xhttp.send();
}

function mostrarDadosDoJogador(jogador) {

    document.getElementById("editar").disabled = true;
    document.getElementById("h1Jogador").innerHTML = "Listando jogadores do time " + localStorage.getItem("id");
    var identificador = jogador.id;
    var nome = jogador.nome;
    var idade = jogador.idade;
    var salário = jogador.salário;
    var contrato = jogador.contrato;
    var imagem = jogador.imagem;


    var table = document.getElementById("tabelaJogador");

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.innerHTML = identificador;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = nome;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = idade;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = salário;
    tr.appendChild(td);


    td = document.createElement('td');
    td.innerHTML = contrato;
    tr.appendChild(td);

    td = document.createElement('td');
    var teste = '<img src="' + imagem + '" alt="imagem" width="100%" height="150px"></img>'
    td.innerHTML =
        teste
    tr.appendChild(td);

    var id = identificador;
    td = document.createElement('td');
    td.innerHTML =
        '<a href="#" onclick="editarJogador(\'' + id + '\')">Editar</a> ' +
        '<a href="#" onclick="excluirJogador(\'' + id + '\')">Excluir</a>';
    tr.appendChild(td);

    table.appendChild(tr);
}


function enviar() {

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://private-348189-jogador.apiary-mock.com/times/create', true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    var novoTime = {
        nomeTime: document.getElementById('name').value,
        campeonato: document.getElementById('local').value,
        anoFundacao: document.getElementById('ano').value,
        escudo: document.getElementById('avatar').value
    };
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4) {
            if (this.status == 201) {
                //sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var nome = retorno.nomeTime;
                alert("O time " + nome + " foi cadastrado com sucesso!");
                location.reload();

            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    }
    if (verificarTime(novoTime) == true) {
        var formatoJson = JSON.stringify(novoTime);
        xhttp.send(formatoJson);
    }

}



function enviarJogador() {

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://private-348189-jogador.apiary-mock.com/jogadores/create', true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    var novoJogador = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        salário: document.getElementById('salario').value,
        contrato: document.getElementById('contrato').value,
        imagem: document.getElementById('imagem').value
    };

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4) {
            if (this.status == 201) {
                //sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var nome = retorno.nome;
                alert("O jogador " + nome + " foi contratado com sucesso!");
                location.reload();

            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    }
    if (verificarJogador(novoJogador) == true) {
        var formatoJson = JSON.stringify(novoJogador);
        xhttp.send(formatoJson);
    }
}

function verificarTime(novoTime) {
    if (novoTime.nomeTime == "" | novoTime.campeonato == "" | novoTime.anoFundacao == "" | novoTime.escudo == "") {
        alert("Preencha todos os campos antes de submeter!")
        return false;
    } else {
        return true;
    }
}

function verificarJogador(novoJogador) {
    if (novoJogador.nome == "" | novoJogador.idade == "" | novoJogador.salário == "" | novoJogador.contrato == "" | novoJogador.imagem == "") {
        alert("Preencha todos os campos antes de submeter!")
        return false;
    } else {
        return true;
    }
}

function confirm_reset() {
    return confirm("Deseja mesmo limpar o formulário?");
}

function confirma_sair() {
    if (confirm("Deseja sair da edição do time?")) {
        location.href = 'inicial.html';
    }
}