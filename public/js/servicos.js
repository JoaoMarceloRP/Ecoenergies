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
            publicacaoDiv.classList.add('publicacao');
            publicacaoDiv.innerHTML = `
            <img src="img/${publicacao.id}.png" height="200px" width="200px">
            <h3>${publicacao.nome_publi}</h3>
            <p>Tipo: ${publicacao.tipo}</p>
            <p>Localização: ${publicacao.localizacao}</p>
            <p>Descrição: ${publicacao.descricao}</p>
            <p>Preço: R$ ${publicacao.preco}</p>
            <a href="${publicacao.link}">Contato</a>
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
        publicacaoDiv.classList.add('publicacao');
        publicacaoDiv.innerHTML = `
            <img src="img/${publicacao.id}.png" height="200px" width="200px">
            <h3>${publicacao.nome_publi}</h3>
            <p>Tipo: ${publicacao.tipo}</p>
            <p>Localização: ${publicacao.localizacao}</p>
            <p>Descrição: ${publicacao.descricao}</p>
            <p>Preço: R$ ${publicacao.preco}</p>
            <a href="${publicacao.link}">Contato</a>
        `;
        publicacoesContainer.appendChild(publicacaoDiv);
    });
})
.catch(error => console.error('Erro ao carregar publicações:', error));
}

var isIncreased = false; 

document.getElementById('aumentar-fonte-btn').addEventListener('click', function() {
    var elementsToIncrease = document.querySelectorAll('.aumentar-fonteA');

    elementsToIncrease.forEach(function(element) {
        var computedStyles = window.getComputedStyle(element);
        var tagName = element.tagName.toLowerCase();

        if (!isIncreased) {
            switch(tagName) {
                case 'a':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                case 'select':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                case 'h2':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.3) + 'px';
                    break;
                case 'p':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.1) + 'px';
                    break;
                case 'button':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                case 'details':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                default:
                    break;
            }
        } else {
            switch(tagName) {
                case 'a':
                    element.style.fontSize = '18px';
                    break;
                case 'select':
                    element.style.fontSize = '20px';
                    break;
                case 'h2':
                    element.style.fontSize = '24px';
                    break;
                case 'p':
                    element.style.fontSize = '19.2px';
                    break;
                case 'button':
                    element.style.fontSize = '20px';
                    break;
                case 'details':
                    element.style.fontSize = '22px';
                    break;       
                default:
                    break;
            }
        }
    });

    isIncreased = !isIncreased;
});


function limparFiltro() {
document.getElementById('tipofiltro').value = '';
document.getElementById('localizacaofiltro').value = '';
document.getElementById('precofiltro').value = '';
loadPublicacoes();
}

window.addEventListener('load', () => {
    loadPublicacoes();
});