document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
    })
    .then(response => {
        if (response.ok) {
            alert('Conta criada com sucesso');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao criar conta');
        }
    })
    .catch(error => console.error('Erro ao enviar requisição:', error));
});

function voltarLogin() {
    window.location.href = 'login.html';
}