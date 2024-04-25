document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('cep').value;
    var telefone = document.getElementById('tel').value;

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha, cep, telefone}),
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
