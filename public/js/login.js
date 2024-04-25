function login() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            checkLoginStatus();
            window.location.href = 'home.html';
        } else {
            alert('Credenciais inválidas');
        }
    })
    .catch(error => console.error('Erro ao enviar requisição:', error));
}

function checkLoginStatus() {
    fetch('http://localhost:3000/checkLogin', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao verificar o status de login');
        }
    })
    .then(data => {
    })
    .catch(error => console.error('Erro ao verificar o status de login:', error));
}