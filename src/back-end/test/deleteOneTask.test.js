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

describe('DELETE /task/:id', () => {
  describe('É esperado ao deletar uma tarefa:', () => {
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

    describe('Quando é deletado com sucesso', () => {
      let id;
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

        taskPost = await chai.request(server)
        .post('/task')
        .set(
          {
            'content-type': 'application/json',
            'authorization': token,
          })
        .send(task);
        
        id = taskPost.body.task._id;

        response = await chai.request(server)
        .delete(`/task/${id}`)
        .set(
          {
            'content-type': 'application/json',
            'authorization': token,
          });
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
        await db.collection('Task').deleteMany({});
      });

      it('Retorna o código de status 204 NOCONTENT ', () => {

        expect(response).to.have.status(204);
      });
    });

    describe('quando é deletado com falha', () => {
      let loginResponse;
      let id;

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

        const taskPost = await chai.request(server)
        .post('/task')
        .set(
          {
            'content-type': 'application/json',
            'authorization': token,
          })
        .send(task);

        id = taskPost.body.task._id;
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
        await db.collection('Task').deleteMany({});
      });

      describe('Quando há problema com o token:', () => {
        it('Verifica se o token é valido', (done) => {
          response = chai.request(server)
            .delete(`/task/${id}`)
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
            .delete(`/task/${id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.be.deep.equal({ code: 401, message: '"token" is required' });
              done();
            });
        });
      });

      describe('Quando o post não existe', () => {
        
        it('É retornado status 404 NOTFOUND', async () => {
          await chai.request(server)
          .delete(`/task/${id}`)
          .set(
            {
              'content-type': 'application/json',
              'authorization': token,
            });

          response = await chai.request(server)
            .delete(`/task/${id}`)
            .set(
              {
                'content-type': 'application/json',
                'authorization': token,
              });

          expect(response).to.have.status(404);
        });
      });
    });
  });
});
