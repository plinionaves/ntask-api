module.exports = app => {

    const Tasks = app.libs.db.models.Tasks;

    app.route('/tasks')

        .get((req, res) => {
            Tasks.findAll({})
                .then(tasks => res.json(tasks))
                .catch(app.libs.util.catchError(res, 412))
        })

        .post((req, res) => {
            Tasks.create(req.body)
                .then(task => res.json(task))
                .catch(app.libs.util.catchError(res, 412));
        });

    app.route('/tasks/:id')

        .get((req, res) => {
            Tasks.findOne({where: req.params})
                .then(task => {
                    if (task) {
                        res.json(task);
                    } else {
                        res.sendStatus(404);
                    }
                }).catch(app.libs.util.catchError(res, 412));
        })

        .put((req, res) => {
            Tasks.update(rq.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(app.libs.util.catchError(res, 412));
        })

        .delete((req, res) => {
            Tasks.delete({where: req.params})
                .then(result => {res.sendStatus(204)})
                .catch(app.libs.util.catchError(res, 412));
        });

};