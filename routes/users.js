module.exports = app => {

    const Users = app.libs.db.models.Users;

    app.get('/users/:id', (req, res) => {
        Users.findById(req.params.id, {
            attributes: ['id', 'name', 'email']
        }).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.sendStatus(404);
            }
        })
        .catch(app.libs.util.catchError(res, 412));
    });

    app.delete('/users/:id', (req, res) => {
        Users.destroy({where: {id: req.params.id}})
            .then(result => res.sendStatus(204))
            .catch(app.libs.util.catchError(res, 412));
    });

    app.post('/users', (req, res) => {
        Users.create(req.body)
            .then(user => res.json(user))
            .catch(app.libs.util.catchError(res, 412));
    });

};