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

function checkLoginStatus() {
    fetch('http://localhost:3000/checkLogin', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao verificar o status de login');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos do servidor:', data);
        console.log('Tipo de usuário recebido:', data.userType);
        if (data.loggedIn) {
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'block';
            document.getElementById('loginButtonn').style.display = 'none';
            document.getElementById('loginButtonnn').style.display = 'none';
    
            if (data.userType === 'empresa') {
                console.log('Usuário é uma empresa, exibindo botão de serviço.');
                document.getElementById('servButton').style.display = 'block';
            } else {
                console.log('Usuário é comum, ocultando botão de serviço.');
                document.getElementById('servButton').style.display = 'none';
            }
        } else {
            console.log('Usuário não está logado, ocultando botão de serviço.');
            document.getElementById('loginButton').style.display = 'block';
            document.getElementById('logoutButton').style.display = 'none';
            document.getElementById('servButton').style.display = 'none';
            document.getElementById('loginButtonn').style.display = 'block';
            document.getElementById('loginButtonnn').style.display = 'block';
        }
    })
    .catch(error => console.error('Erro ao verificar o status de login:', error));
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
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.4) + 'px';
                    break;
                case 'h1':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.3) + 'px';
                    break;
                case 'h2':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.2) + 'px';
                    break;
                case 'p':
                    element.style.fontSize = (parseFloat(computedStyles.fontSize) * 1.1) + 'px';
                    break;
                case 'summary':
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
                    element.style.fontSize = '22px';
                    break;
                case 'h1':
                    element.style.fontSize = '50px';
                    break;
                case 'h2':
                    element.style.fontSize = '37.5px';
                    break;
                case 'p':
                    element.style.fontSize = '19.2px';
                    break;
                case 'summary':
                    element.style.fontSize = '22px';
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

window.onload = function() {
    console.log('Página carregada. Verificando status de login.');
    checkLoginStatus();
};
