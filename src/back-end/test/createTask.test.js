const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const connectionMock = require('./connectionMock');

const { expect } = chai;

// simulando requests http

chai.use(chaiHttp);

// mock de banco de dados em memoria

const { MongoClient } = require('mongodb');

//

const server = require('../server/app');
const { token } = require('../routes');

const user = {
  name: 'Rogerinho',
  email: 'rogerinho@gmail.com',
  password: '123451',
};

const loginUser = {
  email: 'rogerinho@gmail.com',
  password: '123451',
};

const task = {
  title: 'Fake Task',
  body: 'Fake Body',
  status: 'pendente',
}

describe('POST /tasks', () => {
  describe('É esperado ao se cadastrar uma tarefa:', () => {
    let response;
    let connection;
    let db;
    let token;

    before( async () => {
      connection = await connectionMock();

        sinon.stub(MongoClient, 'connect')
          .resolves(connection);
        
        db = connection.db('ToDo-Ebytr');
    });

    after( async () => {
      MongoClient.connect.restore();
    });

    describe('quando é criado com sucesso', () => {
      beforeEach(async () => {
        await chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send(user);

        const loginResponse = await chai.request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send(loginUser);

        token = loginResponse.body.token;

        response = await chai.request(server)
        .post('/tasks')
        .set(
          {
            'content-type': 'application/json',
            'authorization': token,
          })
        .send(task);
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
        await db.collection('Task').deleteMany({});
      });

      it('retorna o código de status 201 CREATED com um objeto Task', () => {
        expect(response).to.have.status(201);

        expect(response.body).to.be.a('object');

        expect(response.body).to.have.property('task');
        expect(response.body.task.title).to.be.equal('Fake Task');
        expect(response.body.task.body).to.be.equal('Fake Body');
        expect(response.body.task.status).to.be.equal('pendente');
      });

      it('tem a propriedade _id do mongoDB', () => {
        expect(response.body.task).have.a.property('_id');
        expect(response.body.task).have.a.property('_id').have.length.greaterThanOrEqual(1);
      });
    });

    describe('quando é criado com falha', () => {
      let loginResponse;

      beforeEach(async () => {
        await chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send(user);

        loginResponse = await chai.request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send(loginUser);

        token = loginResponse.body.token;
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
        await db.collection('Task').deleteMany({});
      });

      describe('Quando há problema com o token:', () => {
        it('Verifica se o token é valido', (done) => {
          response = chai.request(server)
            .post('/tasks')
            .set(
              {
                'content-type': 'application/json',
                'authorization': 'token',
              })
            .send({
              title: 'Fake title',
              body: 'Fake Body',
              status: 'pendente',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 401, message: '"token" is not valid' });
              done();
            });
        });
        it('Verifica se o token existe', (done) => {
          response = chai.request(server)
            .post('/tasks')
            .set(
              {
                'content-type': 'application/json',
              })
            .send({
              title: 'Fake title',
              body: 'Fake Body',
              status: 'pendente',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 401, message: '"token" is required' });
              done();
            });
        });
      });

      describe('Quando a tarefa é passada incorretamente', () => {
        
        it('É retornado status 400 Bad Request', async () => {
          response = await chai.request(server)
            .post('/tasks')
            .set(
              {
                'content-type': 'application/json',
                'authorization': token,
              })
            .send({
              body: 'Fake Body',
              status: 'pendente',
            });

          expect(response).to.have.status(400);
        });

        it('É necessario um objeto com atributo title', (done) => {
          response = chai.request(server)
            .post('/tasks')
            .set(
              {
                'content-type': 'application/json',
                'authorization': token,
              })
            .send({
              body: 'Fake Body',
              status: 'pendente',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 400, message: '"title" is required' });
              done();
            });
        });

        it('É necessario um objeto com atributo body', (done) => {
          response = chai.request(server)
            .post('/tasks')
            .set(
              {
                'content-type': 'application/json',
                'authorization': token,
              })
            .send({
              title: 'Fake title',
              status: 'pendente',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 400, message: '"body" is required' });
              done();
            });
        });

        it('É necessario um objeto com atributo status', (done) => {
          response = chai.request(server)
            .post('/tasks')
            .set(
              {
                'content-type': 'application/json',
                'authorization': token,
              })
            .send({
              title: 'Fake title',
              body: 'Fake Body',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 400, message: '"status" is required' });
              done();
            });
        });
      });
    });
  });
});
