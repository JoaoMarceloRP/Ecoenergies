function logout() {
    fetch('http://localhost:3000/logout', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    })
    .catch(error => console.error('Erro ao fazer logout:', error));
}

function loadContaInfo() {
    fetch('http://localhost:3000/contaInfo', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Usuário não autenticado');
        }
    })
    .then(data => {
        if (data.isAdmin) {
            document.getElementById('loginStatus').innerHTML = `
                <p>Nome de usuário: ${data.username} (admin)</p>
                <button class="red-button" onclick="logout()">Sair</button>
            `;
            document.getElementById('adminButton').style.display = 'block';
        } else if (data.username) {
            document.getElementById('loginStatus').innerHTML = `
                <p>Nome de usuário: ${data.username}</p>
                <button class="red-button" onclick="logout()">Sair</button>
            `;
        } else {
            document.getElementById('loginStatus').innerHTML = `
                <button class="red-button" onclick="window.location.href='/login.html'">Fazer Login</button>
            `;
        }
    })
    .catch(error => {
        console.error('Erro ao carregar informações da conta:', error);
        document.getElementById('loginStatus').innerHTML = `
            <button class="red-button" onclick="window.location.href='/login.html'">Fazer Login</button>
        `;
    });
}

function loadPublicacoes() {
    const tipo = document.getElementById('tipofiltro').value;
    const localizacao = document.getElementById('localizacaofiltro').value;
    const maxPreco = document.getElementById('precofiltro').value;

    let url = 'http://localhost:3000/publicacoes';
    
    let queryParams = [];
    if (tipo) queryParams.push(`tipo=${tipo}`);
    if (localizacao) queryParams.push(`localizacao=${localizacao}`);
    if (maxPreco) queryParams.push(`maxPreco=${maxPreco}`);
    if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
    }

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao obter publicações');
        }
    })
    .then(publicacoes => {
        const publicacoesContainer = document.getElementById('publicacoesContainer');
        publicacoesContainer.innerHTML = '';

        publicacoes.forEach(publicacao => {
            const publicacaoDiv = document.createElement('div');
            publicacaoDiv.innerHTML = `
                <h3>${publicacao.nome_empresa}</h3>
                <p>Tipo: ${publicacao.tipo}</p>
                <p>Localização: ${publicacao.localizacao}</p>
                <p>Descrição: ${publicacao.descricao}</p>
                <p>Preço: R$ ${publicacao.preco}</p>
            `;
            publicacoesContainer.appendChild(publicacaoDiv);
        });
    })
    .catch(error => console.error('Erro ao carregar publicações:', error));
}

function Filtro() {
const tipo = document.getElementById('tipofiltro').value;
const localizacao = document.getElementById('localizacaofiltro').value;
const maxPreco = document.getElementById('precofiltro').value;

let url = 'http://localhost:3000/publicacoes';

let queryParams = [];
if (tipo) queryParams.push(`tipo=${tipo}`);
if (localizacao) queryParams.push(`localizacao=${localizacao}`);
if (maxPreco) queryParams.push(`maxPreco=${maxPreco}`);
if (queryParams.length > 0) {
    url += '?' + queryParams.join('&');
}

fetch(url, {
    method: 'GET',
    credentials: 'include'
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Erro ao obter publicações');
    }
})
.then(publicacoes => {
    const publicacoesContainer = document.getElementById('publicacoesContainer');
    publicacoesContainer.innerHTML = '';

    publicacoes.forEach(publicacao => {
        const publicacaoDiv = document.createElement('div');
        publicacaoDiv.innerHTML = `
            <h3>${publicacao.nome_empresa}</h3>
            <p>Tipo: ${publicacao.tipo}</p>
            <p>Localização: ${publicacao.localizacao}</p>
            <p>Descrição: ${publicacao.descricao}</p>
            <p>Preço: R$ ${publicacao.preco}</p>
        `;
        publicacoesContainer.appendChild(publicacaoDiv);
    });
})
.catch(error => console.error('Erro ao carregar publicações:', error));
}

function limparFiltro() {
document.getElementById('tipofiltro').value = '';
document.getElementById('localizacaofiltro').value = '';
document.getElementById('precofiltro').value = '';
loadPublicacoes();
}

window.addEventListener('load', () => {
    loadContaInfo();
    loadPublicacoes();
});
