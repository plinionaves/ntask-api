import express from 'express';
const PORT = 3000;

const app = express();

app.set('json spaces', 4);

app.get('/', (req, res) => {
    res.json({status: 'NTask API'});
});

app.get('/tasks', (req, res) => {
    res.json([
        {title: 'Aprender Node.js'},
        {title: 'Aprender Angular2'}
    ]);
});

app.listen(PORT, () => {
    console.log(`NTask API rodando na porta ${PORT}...`);
});