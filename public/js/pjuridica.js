document.getElementById('pjuridica-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var cnpj = document.getElementById('cnpj').value;
    var telefone = document.getElementById('tel').value;
    var senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/signuppjuridica', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, cnpj, telefone, senha}),
    })
    .then(response => {
        if (response.ok) {
            alert('Conta criada com sucesso');
            window.location.href = 'loginpjuridica.html';
        } else {
            alert('Erro ao criar conta');
        }
    })
    .catch(error => console.error('Erro ao enviar requisição:', error));
});