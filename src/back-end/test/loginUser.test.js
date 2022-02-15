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

describe('POST /login', () => {
  describe('É esperado ao fazer login de um usuário:', () => {
    let response;
    let connection;
    let db;

    before( async () => {
      connection = await connectionMock();

        sinon.stub(MongoClient, 'connect')
          .resolves(connection);
        
        db = connection.db('ToDo-Ebytr');
    });
    
    after( async () => {
      MongoClient.connect.restore();
    });

    describe('Quando é criado com sucesso', () => {
      beforeEach(async () => {
        await chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send(user);

        response = await chai.request(server)
          .post('/login')
          .set('content-type', 'application/json')
          .send(loginUser);
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
      });

      it.only('retorna um objeto com a propriedade "token" e o código de status 200 OK', () => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('token').to.be.a('string');
        expect(response.body).to.have.property('token').have.length.greaterThanOrEqual(1);
      });
    });

    describe('Quando é logado com falha', () => {
      beforeEach(async () => {
        await chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send(user);
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
      });

      it('Será validado que o campo "email" é obrigatório', (done) => {
        response = chai.request(server)
          .post('/login')
          .set('content-type', 'application/json')
          .send({
            password: '123451',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.be.deep.equal({ code: 401, message: '"email" is required' });
            done();
          });
      });

      it('Será validado que o campo "password" é obrigatório', (done) => {
        response = chai.request(server)
          .post('/login')
          .set('content-type', 'application/json')
          .send({
            email: 'rogerinho@gmail.com',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.be.deep.equal({ code: 401, message: '"password" is required' });
            done();
          });
      });

      it('Será validado que não é possível fazer login com um email inválido', (done) => {
        response = chai.request(server)
          .post('/login')
          .set('content-type', 'application/json')
          .send({
            email: 'rogerinho@.com',
            password: '123451',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.be.deep.equal({ code: 401, message: '"email" must be a valid email' });
            done();
          });
      });

      it('Será validado que não é possível fazer login com uma senha inválida', (done) => {
        response = chai.request(server)
          .post('/login')
          .set('content-type', 'application/json')
          .send({
            email: 'rogerinho123@gmail.com',
            password: 'fd2134sa',
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.be.deep.equal({ code: 401, message: 'Incorrect username or password' });
            done();
          });
      });
    });
  });
});
