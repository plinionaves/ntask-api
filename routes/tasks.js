module.exports = app => {

    const Tasks = app.libs.db.models.Tasks;

    app.route('/tasks')

        .all(app.libs.auth.authenticate())

        .get((req, res) => {
            Tasks.findAll({where: {user_id: req.user.id}})
                .then(tasks => res.json(tasks))
                .catch(app.libs.util.catchError(res, 412))
        })

        .post((req, res) => {
            req.body.user_id = req.user.id;
            Tasks.create(req.body)
                .then(task => res.json(task))
                .catch(app.libs.util.catchError(res, 412));
        });

    app.route('/tasks/:id')

        .all(app.libs.auth.authenticate())        

        .get((req, res) => {
            Tasks.findOne({where: {
                id: req.params.id,
                user_id: req.user.id
            }})
                .then(task => {
                    if (task) {
                        res.json(task);
                    } else {
                        res.sendStatus(404);
                    }
                }).catch(app.libs.util.catchError(res, 412));
        })

        .put((req, res) => {
            Tasks.update(rq.body, {where: {
                id: req.params.id,
                user_id: req.user.id
            }})
                .then(result => res.sendStatus(204))
                .catch(app.libs.util.catchError(res, 412));
        })

        .delete((req, res) => {
            Tasks.delete({where: {
                id: req.params.id,
                user_id: req.user.id
            }})
                .then(result => {res.sendStatus(204)})
                .catch(app.libs.util.catchError(res, 412));
        });

};