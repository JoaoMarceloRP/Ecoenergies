const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    senha: '',
    database: 'ecoenergiesdb'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida');
});

const app = express();
const port = 3000;

const adminUser = {
    email: 'admin@email',
    senha: '1234',
    cep: '123456',
    telefone: '7111112222',
    isAdmin: true
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

function requireAuth(req, res, next) {
    if (req.session.user) {
        if (req.session.isAdmin) {
            req.session.userType = 'admin';
        } else if (req.session.isEmpresa) {
            req.session.userType = 'empresa';
        } else {
            req.session.userType = 'comum';
        }
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


app.get('/home.html', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    } else {
        res.redirect('/');
    }
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.post('/login', (req, res) => {
    console.log('Recebendo requisição de login:', req.body);
    const { email, senha } = req.body;

    if (email === adminUser.email && senha === adminUser.senha) {
        req.session.user = email;
        console.log(`Login: ${email} (admin)`);
        res.status(200).json({ message: 'Login bem-sucedido' });
        return;
    }

    connection.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (error, results) => {
        if (error) {
            console.error('Erro ao verificar as credenciais:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 1) {
            req.session.user = email;
            const userType = 'comum';
            res.status(200).json({ message: 'Login bem-sucedido', userType: 'comum' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});


app.get('/loginpjuridica', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'loginpjuridica.html'));
});


app.post('/loginpjuridica', (req, res) => {
    console.log('Recebendo requisição de login de pessoa jurídica:', req.body);
    const { cnpj, senha } = req.body;

    connection.query('SELECT * FROM empresas WHERE cnpj = ? AND senha = ?', [cnpj, senha], (error, results) => {
        if (error) {
            console.error('Erro ao verificar as credenciais:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 1) {
            req.session.user = cnpj;
            req.session.isEmpresa = true;
            console.log(`Login bem-sucedido como empresa: ${cnpj}`);
            res.status(200).json({ message: 'Login bem-sucedido', userType: 'empresa'});
        } else {
            console.log('Credenciais inválidas para login de pessoa jurídica:', req.body);
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});


app.post('/signup', (req, res) => {
    const { email, senha, cep, telefone} = req.body;

    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Erro ao verificar nome de usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ message: 'email de usuário já em uso' });
            return;
        }

        connection.query('INSERT INTO usuarios (email, senha, cep, telefone) VALUES (?, ?, ?, ?)', [email, senha, cep, telefone], (error, results) => {
            if (error) {
                console.error('Erro ao criar conta:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
                return;
            }
            console.log(`Conta criada: ${email}`);
            res.status(200).json({ message: 'Conta criada com sucesso' });
        });
    });
});


app.post('/signuppjuridica', (req, res) => {
    const { email, cnpj, telefone, senha} = req.body;

    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Erro ao verificar nome de usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ message: 'email de usuário já em uso' });
            return;
        }

        connection.query('INSERT INTO empresas (email, cnpj, telefone, senha) VALUES (?, ?, ?, ?)', [email, cnpj, telefone, senha], (error, results) => {
            if (error) {
                console.error('Erro ao criar conta:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
                return;
            }
            console.log(`Conta criada: ${email}`);
            res.status(200).json({ message: 'Conta criada com sucesso' });
        });
    });
});


app.get('/checkLogin', requireAuth, (req, res) => {
    if (req.session.user) {
        let userType = req.session.userType || 'comum';
        res.status(200).json({ loggedIn: true, userType: userType });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});


app.get('/publicacoes', (req, res) => {
    const tipo = req.query.tipo;
    const localizacao = req.query.localizacao;
    const maxPreco = req.query.maxPreco;

    let query = 'SELECT * FROM publicacoes WHERE 1=1';
    let params = [];

    if (tipo) {
        query += ' AND tipo = ?';
        params.push(tipo);
    }

    if (localizacao) {
        query += ' AND localizacao = ?';
        params.push(localizacao);
    }

    if (maxPreco) {
        query += ' AND preco <= ?';
        params.push(maxPreco);
    }

    connection.query(query, params, (error, results) => {
        if (error) {
            console.error('Erro ao obter publicações:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }
        res.status(200).json(results);
    });
});


app.post('/publicacoes', (req, res) => {
    const { nome_publi, tipo, localizacao, descricao, preco, link } = req.body;

    if (!nome_publi || !tipo || !localizacao || !descricao || !preco) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        return;
    }

    connection.query(
        'INSERT INTO publicacoes (nome_publi, tipo, localizacao, descricao, preco, link) VALUES (?, ?, ?, ?, ?, ?)',
        [nome_publi, tipo, localizacao, descricao, preco, link],
        (error, results) => {
            if (error) {
                console.error('Erro ao criar uma nova publicação:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
                return;
            }
            res.status(201).json({ message: 'Publicação criada com sucesso' });
        }
    );
});


app.get('/logout', (req, res) => {
    console.log('Logout:', req.session.user);
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
