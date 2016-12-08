module.exports = app => {

    const Users = app.libs.db.models.Users;

    app.route('/user')

        .all(app.libs.auth.authenticate())
    
        /**
        * @api {get} /user Exibe usuario autenticado
        * @apiGroup Usuario
        * @apiHeader {String} Authorization Token de usuario
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}       
        * @apiSuccess {Number} id Id de registro
        * @apiSuccess {String} name Nome
        * @apiSuccess {String} email Email
        * @apiSuccessExample {json} Sucesso
        *   HTTP/1.1 200 OK
        *   {
        *       "id": 1,
        *       "name": "John Connor",
        *       "email": "john@connor.net"
        *   }
        * @apiErrorExample {json} Erro de consulta
        *   HTTP/1.1 412 Precondition Failed
        */
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

        /**
        * @api {delete} /user Exclui usuario autenticado
        * @apiGroup Usuario
        * @apiHeader {String} Authorization Token de usuario
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT xyz.abc.123.hgf"}
        * @apiSuccessExample {json} Sucesso
        *   HTTP/1.1 204 No Content
        * @apiErrorExample {json} Erro na exclusão
        *   HTTP/1.1 412 Precondition Failed
        */
        .delete((req, res) => {
            Users.destroy({where: {id: req.user.id}})
                .then(result => res.sendStatus(204))
                .catch(app.libs.util.catchError(res, 412));
        });

    /**
    * @api {post} /users Cadastra novo usuario
    * @apiGroup Usuario
    * @apiParam {String} name Nome
    * @apiParam {String} email Email
    * @apiParam {String} password Senha
    * @apiParamExample {json} Entrada
    *   {
    *       "name": "John Connor",
    *       "email": "john@connor.net",
    *       "password": "123456"
    *   }       
    * @apiSuccess {Number} id Id de registro
    * @apiSuccess {String} name Nome
    * @apiSuccess {String} email Email
    * @apiSuccess {String} password Senha criptografada
    * @apiSuccess {Date} updated_at Data de atualização
    * @apiSuccess {Date} created_at Data de cadastro
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 200 OK
    *   {
    *       "id": 1,
    *       "name": "John Connor",
    *       "email": "john@connor.net",
    *       "password": "$2a$10$SK1B1",
    *       "updated_at": "2015-09-24T15:46:51.778Z",
    *       "created_at": "2015-09-24T15:46:51.778Z"
    *   }
    * @apiErrorExample {json} Erro no cadastro
    *   HTTP/1.1 412 Precondition Failed
    */
    app.post('/users', (req, res) => {
        Users.create(req.body)
            .then(user => res.json(user))
            .catch(app.libs.util.catchError(res, 412));
    });

};