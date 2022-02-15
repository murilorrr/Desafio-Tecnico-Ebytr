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

describe('POST /user', () => {
  describe('É esperado ao se cadastrar um usuário:', () => {
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

    describe('quando é criado com sucesso', () => {
      beforeEach(async () => {
        response = await chai.request(server)
          .post('/user')
          .set('content-type', 'application/json')
          .send(user);
      });

      afterEach(async () => {
        await db.collection('User').deleteMany({});
      });

      it('retorna o código de status 201 CREATED com um objeto User', () => {
        expect(response).to.have.status(201);

        expect(response.body).to.be.a('object');

        expect(response.body).to.have.property('user');
        expect(response.body.user.email).to.be.equal('rogerinho@gmail.com');
        expect(response.body.user.name).to.be.equal('Rogerinho');
      });

      it('tem a propriedade _id do mongoDB', () => {
        expect(response.body.user).have.a.property('_id');
        expect(response.body.user).have.a.property('_id').have.length.greaterThanOrEqual(1);
      });
    });

    describe('quando é criado com falha', () => {

      afterEach(async () => {
        await db.collection('User').deleteMany({});
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
            expect(res.body).to.be.deep.equal({ code: 400, message: '"password" is required' });
            done();
          });
      });
    });
  });
});
