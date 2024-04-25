function login() {
  var cnpj = document.getElementById('cnpj').value;
  var senha = document.getElementById('senha').value;

  fetch('http://localhost:3000/loginpjuridica', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cnpj, senha }),
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
        }
    })
    .catch(error => console.error('Erro ao verificar o status de login:', error));
}