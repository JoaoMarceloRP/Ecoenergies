var modal = document.getElementById("modal");
var adminButton = document.getElementById("adminButton");
var closeModalBtn = document.getElementsByClassName("close")[0];

function abrirModal() {
    modal.style.display = "block";
}

function fecharModal() {
    modal.style.display = "none";
}

adminButton.onclick = function() {
    abrirModal();
}

closeModalBtn.onclick = function() {
    fecharModal();
}

window.onclick = function(event) {
    if (event.target == modal) {
        fecharModal();
    }
}

document.getElementById('publicacaoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nome_empresa = document.getElementById('nomeEmpresa').value;
    var tipo = document.getElementById('tipo').value;
    var localizacao = document.getElementById('localizacao').value;
    var descricao = document.getElementById('descricao').value;
    var preco = document.getElementById('preco').value;

    var data = {
        nome_empresa: nome_empresa,
        tipo: tipo,
        localizacao: localizacao,
        descricao: descricao,
        preco: preco
    };

    fetch('http://localhost:3000/publicacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            alert('Publicação adicionada com sucesso');
            document.getElementById('nomeEmpresa').value = '';
            document.getElementById('tipo').value = '';
            document.getElementById('localizacao').value = '';
            document.getElementById('descricao').value = '';
            document.getElementById('preco').value = '';
            window.location.href = 'home.html';
        } else {
            return response.json();
        }
    })
    .then(errorData => {
        if (errorData) {
            alert('Erro ao adicionar publicação: ' + errorData.message);
        }
    })
    .catch(error => console.error('Erro ao enviar requisição:', error));
});

function voltarHome() {
    window.location.href = 'home.html';
}