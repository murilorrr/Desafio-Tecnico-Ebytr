const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;

// simulando requests http

chai.use(chaiHttp);

// mock de banco de dados em memoria

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

//

const server = require('../server/app');

const user = {
  name: 'Rogerinho',
  email: 'rogerinho@gmail.com',
  password: '123451',
};

describe('POST /user', () => {
  describe('É esperado ao se cadastrar um usuário:', () => {
    let DBServer;
    let response;

    afterEach(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    describe('quando é criado com sucesso', () => {
      beforeEach(async () => {
        DBServer = new MongoMemoryServer();
        const URLMock = await DBServer.getUri();
        const connectionMock = MongoClient.connect(
          URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true },
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);

        response = await chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send(user);
      });

      it('retorna o código de status 201 CREATED', () => {
        expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "user"', () => {
        expect(response.body).to.have.property('user');
      });

      it('a propriedade "user" possui o objeto de usuário', () => {
        const expectedUser = user;

        expect(response.body.user.email).to.be.equal(expectedUser.email);
        expect(response.body.user.name).to.be.equal(expectedUser.name);
      });

      it('tem a propriedade _id do mongoDB', () => {
        expect(response.body.user).have.a.property('_id');
      });
    });

    describe('quando é criado com falha', () => {
      beforeEach(async () => {
        DBServer = new MongoMemoryServer();
        const URLMock = await DBServer.getUri();
        const connectionMock = MongoClient.connect(
          URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true },
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
      });

      it('É retornado status 400 Bad Request', async () => {
        response = await chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send({
            email: 'rogerinho@gmail.com',
            password: '123451',
          });

        expect(response).to.have.status(400);
      });

      it('É necessario um objeto com atributo name', (done) => {
        response = chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send({
            email: 'rogerinho@gmail.com',
            password: '123451',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.be.deep.equal({ code: 400, message: '"name" is required' });
            done();
          });
      });

      it('É necessario um objeto com atributo email', (done) => {
        response = chai.request(server)
          .post('/user')
          .set('Content-type', 'application/json')
          .send({
            name: 'Rogerinho',
            password: '123451',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.be.equal(400);
            expect(res.body).be.a('object');
            expect(res.body).to.be.deep.equal({ code: 400, message: '"email" is required' });
            done();
          });
      });

      it('É necessario um objeto com atributo password', (done) => {
        response = chai.request(server)
          .post('/user')
          .set('Content-type', 'application/json')
          .send({
            name: 'Rogerinho',
            email: 'rogerinho@gmail.com',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.be.equal(400);
            expect(res.body).be.a('object');
            expect(res.body).to.be.deep.equal({ code: 400, message: '"password" is required' });
            done();
          });
      });
    });
  });
});
