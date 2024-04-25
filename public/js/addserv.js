document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('submitBtn').addEventListener('click', function() {
        const nome_publi = document.getElementById('nome_publi').value;
        const tipo = document.getElementById('tipo').value;
        const localizacao = document.getElementById('localizacao').value;
        const descricao = document.getElementById('descricao').value;
        const preco = document.getElementById('preco').value;
        const link = document.getElementById('link').value;

        fetch('/publicacoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome_publi: nome_publi,
                tipo: tipo,
                localizacao: localizacao,
                descricao: descricao,
                preco: preco,
                link: link
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar publicação');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            window.location.href = '/home.html';
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});


function voltarHome() {
    window.location.href = 'home.html';
}