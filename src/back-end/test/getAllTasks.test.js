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

describe('GET /task', () => {
  describe('É esperado ao buscar a lista de tarefa:', () => {
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

    describe('Quando é buscado com sucesso', () => {
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

        await chai.request(server)
        .post('/task')
        .set(
          {
            'content-type': 'application/json',
            'authorization': token,
          })
        .send(task);

        response = await chai.request(server)
        .get('/task')
        .set(
          {
            'authorization': token,
          }
        );
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
        await db.collection('Task').deleteMany({});
      });

      it('Retorna o código de status 200 OK com uma lista de Tarefas', () => {
        expect(response).to.have.status(200);

        expect(response.body).to.have.property('tasks');
        
        expect(response.body.tasks).to.be.a('array');
        expect(response.body.tasks[0].title).to.be.equal('Fake Task');
        expect(response.body.tasks[0].body).to.be.equal('Fake Body');
        expect(response.body.tasks[0].status).to.be.equal('pendente');
      });

      it('tem a propriedade _id do mongoDB', () => {
        expect(response.body.tasks[0]).have.a.property('_id');
        expect(response.body.tasks[0]).have.a.property('_id').have.length.greaterThanOrEqual(1);
      });
    });

    describe('quando é buscado com falha', () => {
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

        await chai.request(server)
        .post('/task')
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

      describe('Quando há problema com o token:', () => {
        it('Verifica se o token é valido', (done) => {
          response = chai.request(server)
            .get('/task')
            .set(
              {
                'authorization': 'token',
              }
            )
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 401, message: '"token" is not valid' });
              done();
            });
        });
        it('Verifica se o token existe', (done) => {
          response = chai.request(server)
            .get('/task')
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 401, message: '"token" is required' });
              done();
            });
        });
      });
    });
  });
});
