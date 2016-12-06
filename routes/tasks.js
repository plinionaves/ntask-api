module.exports = app => {

    app.get('/tasks', (req, res) => {
        res.json([
            {title: 'Aprender Node.js'},
            {title: 'Aprender Angular2'}
        ]);
    });

};