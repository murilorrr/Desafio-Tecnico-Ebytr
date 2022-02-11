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

    afterEach(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    describe('quando é criado com sucesso', () => {
      it('retorna o código de status 201', () => {
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
      it('not implemented');
    });
  });
});
