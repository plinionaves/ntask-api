module.exports = app => {

    const Users = app.libs.db.models.Users;

    app.route('/user')

        .all(app.libs.auth.authenticate())
    
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes: ['id', 'name', 'email']
            }).then(user => {
                if (user) {
                    res.json(user)
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(app.libs.util.catchError(res, 412));
        })

        .delete((req, res) => {
            Users.destroy({where: {id: req.user.id}})
                .then(result => res.sendStatus(204))
                .catch(app.libs.util.catchError(res, 412));
        });

    app.post('/users', (req, res) => {
        Users.create(req.body)
            .then(user => res.json(user))
            .catch(app.libs.util.catchError(res, 412));
    });

};