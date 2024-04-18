function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'home.html';
        } else {
            alert('Credenciais inválidas');
        }
    })
    .catch(error => console.error('Erro ao enviar requisição:', error));
}

function voltarHome() {
    window.location.href = 'home.html';
}