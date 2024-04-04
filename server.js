const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'evepyeiadb'
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
    username: 'admin',
    password: '1234',
    email: 'admin@gmail.com',
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
        next();
    } else {
        res.redirect('/');
    }
}

function requireAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin === true) {
        next();
    } else {
        res.status(403).json({ message: 'Acesso não autorizado' });
    }
}


app.get('/admin', requireAdmin, (req, res) => {
    if (req.session.user.isAdmin) {
        res.sendFile(path.join(__dirname, 'public', 'admin.html'));
    } else {
        res.redirect('/');
    }
});


app.get('/', (req, res) => {
    if (req.session.user === adminUser) {
        res.sendFile(path.join(__dirname, 'public', 'admin.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    }
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
    const { username, password } = req.body;

    if (username === adminUser.username && password === adminUser.password) {
        req.session.user = username;
        console.log(`Login: ${username} (admin)`);
        res.status(200).json({ message: 'Login bem-sucedido' });
        return;
    }

    connection.query('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [username, password], (error, results) => {
        if (error) {
            console.error('Erro ao verificar as credenciais:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 1) {
            req.session.user = username;
            console.log(`Login: ${username}`);
            res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});


app.post('/signup', (req, res) => {
    const { username, password, email} = req.body;

    connection.query('SELECT * FROM usuarios WHERE nome = ?', [username], (error, results) => {
        if (error) {
            console.error('Erro ao verificar nome de usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ message: 'Nome de usuário já em uso' });
            return;
        }

        connection.query('INSERT INTO usuarios (nome, senha, email) VALUES (?, ?, ?)', [username, password, email], (error, results) => {
            if (error) {
                console.error('Erro ao criar conta:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
                return;
            }
            console.log(`Conta criada: ${username}`);
            res.status(200).json({ message: 'Conta criada com sucesso' });
        });
    });
});


app.get('/account-info', requireAuth, (req, res) => {
    const username = req.session.user;

    connection.query('SELECT * FROM usuarios WHERE nome = ?', [username], (error, results) => {
        if (error) {
            console.error('Erro ao obter informações da conta:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 1) {
            const userInfo = {
                username: results[0].nome,
                email: results[0].email,
                isAdmin: Boolean(results[0].isAdmin)
            };
            res.status(200).json(userInfo);
        } else {
            res.status(404).json({ message: 'Informações da conta não encontradas' });
        }
    });
});


app.get('/publicacoes', (req, res) => {
    const tipo = req.query.tipo;
    const localizacao = req.query.localizacao;
    const maxPrice = req.query.maxPrice;

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

    if (maxPrice) {
        query += ' AND preco <= ?';
        params.push(maxPrice);
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
    const { nome_empresa, tipo, localizacao, descricao, preco } = req.body;

    if (!nome_empresa || !tipo || !localizacao || !descricao || !preco) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        return;
    }

    connection.query(
        'INSERT INTO publicacoes (nome_empresa, tipo, localizacao, descricao, preco) VALUES (?, ?, ?, ?, ?)',
        [nome_empresa, tipo, localizacao, descricao, preco],
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


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
