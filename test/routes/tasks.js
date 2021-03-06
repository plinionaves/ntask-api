import jwt from 'jwt-simple';

describe('Routes: Tasks', () => {

    const Users = app.libs.db.models.Users;
    const Tasks = app.libs.db.models.Tasks;
    const jwtSecret = app.libs.config.jwtSecret;
    let token;
    let fakeTask;

    beforeEach(done => {
        Users
            .destroy({where: {}})
            .then(() => Users.create({
                name: 'John',
                email: 'john@mail.net',
                password: '12345'
            }))
            .then(user => {
                Tasks
                    .destroy({where: {}})
                    .then(() => Tasks.bulkCreate([{
                        id: 1,
                        title: 'Node.js',
                        user_id: user.id
                    }, {
                        id: 2,
                        title: 'Angular2',
                        user_id: user.id
                    }]))
                    .then(tasks => {
                        fakeTask = tasks[0];
                        token = jwt.encode({id: user.id}, jwtSecret);
                        done();
                    });
            });
    });

    describe('GET /tasks', () => {
        describe('status 200', () => {
            it('returns a list of tasks', done => {
                request.get('/tasks')
                    .set('Authorization', `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].title).to.eql('Node.js');
                        expect(res.body[1].title).to.eql('Angular2');
                        done(err);
                    });
            });
        });
    });

    describe('POST /tasks/', () => {
        describe('status 200', () => {
            it('creates a new task', done => {
                request.post('/tasks')
                    .set('Authorization', `JWT ${token}`)
                    .send({title: 'Express'})
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql('Express');
                        expect(res.body.done).to.be.false;
                        done(err);
                    });
            });
        });
    });

    describe('GET /tasks/:id', () => {

        describe('status 200', () => {
            it('returns one task', done => {
                request.get(`/tasks/${fakeTask.id}`)
                    .set('Authorization', `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql('Node.js');
                        done(err);
                    });
            });
        });

        describe('status 404', () => {
            it('throws error when task not exist', done => {
                request.get('/tasks/0')
                    .set('Authorization', `JWT ${token}`)
                    .expect(404)
                    .end((err, res) => done(err));
            });
        });

    });

    describe('PUT /tasks/:id', () => {
        describe('status 200', () => {
            it('updates a task', done => {
                request.put(`/tasks/${fakeTask.id}`)
                    .set('Authorization', `JWT ${token}`)
                    .send({
                        title: 'Node.js, the best of the world',
                        done: true
                    })
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });

    describe('DELETE /tasks/:id', () => {
        describe('status 200', () => {
            it('removes a task', done => {
                request.delete(`/tasks/${fakeTask.id}`)
                    .set('Authorization', `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });

});