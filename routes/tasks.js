module.exports = app => {

    const Tasks = app.libs.db.models.Tasks;

    app.route('/tasks')

        .all((req, res, next) => {
            if (req.body) delete req.body.id;
            next();
        })

        .get((req, res) => {
            Tasks.findAll({})
                .then(tasks => res.json(tasks))
                .catch(error => {
                    res.status(412).json({
                        message: error.message || error
                    });
                })
        })

        .post((req, res) => {
            Tasks.create(req.body)
                .then(task => res.json(task))
                .catch(error => {
                    res.status(412).json({
                        message: error.message || error
                    })
                });
        });

    app.route('/tasks/:id')

        .all((req, res, next) => {
            if (req.body) delete req.body.id;
            next();
        })

        .get((req, res) => {
            Tasks.findOne({where: req.params})
                .then(task => {
                    if (task) {
                        res.json(task);
                    } else {
                        res.sendStatus(404);
                    }
                }).catch(error => {
                    res.json({
                        message: error.message || error
                    })
                });
        })

        .put((req, res) => {
            Tasks.update(rq.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({
                        message: error.message || error
                    });
                });
        })

        .delete((req, res) => {
            Tasks.delete({where: req.params})
                .then(result => {res.sendStatus(204)})
                .catch(error => {
                    res.status(412).json({
                        message: error.message || message
                    });
                });
        });

};